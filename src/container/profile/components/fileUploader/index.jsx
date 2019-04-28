import React, { PureComponent } from 'react';

// Components
import { FilePond } from 'react-filepond';
import { Line } from 'rc-progress';

// Firebase
import { storage } from '../../../../config/fbConfig';

// Styles
import styles from './fileUploader.module.css';
import 'filepond/dist/filepond.min.css';

class FileUploader extends PureComponent {
  state = {
    percentage: 0,
    files: null,
    url: []
  }

  imageUploadHandler(uid) {
    const { files } = this.state

    files.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const uploadTask = storage.ref(`files/${uid}/images/${file.name}`).put(file)
  
        uploadTask.on('state_changed',
        (snapshot) => {
          this.setState({
            percentage: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          })
        },
        (error) => {
          console.log('ERROR ON PICTURES UPLOAD', error)
        },
        () => {
          storage.ref(`files/${uid}/images/`).child(file.name).getDownloadURL().then(url => {
            console.log('THE URL:', url)
            this.setState({
              url: [...this.state.url, url]
            })
          })
        })
      } else if (file.type === 'video/mp4') {
        const uploadTask = storage.ref(`files/${uid}/videos/${file.name}`).put(file)
        uploadTask.on('state_changed',
        (snapshot) => {
          this.setState({
            percentage: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          })
        },
        (error) => {
          console.log('ERROR ON VIDEO UPLOAD', error)
        },
        () => {
          storage.ref(`files/${uid}/videos`).child(file.name).getDownloadURL().then(url => {
            this.setState({
              url: [...this.state.url, url]
            })
          })
        }
        )
      }
    })
  }

  render() {
    const { auth, updateFilesArray } = this.props
    let progressBar = null

    if (this.state.url.length !== 0) {
      updateFilesArray(this.state.url, this.state.files.length)
    }

    if (this.state.files) {
      progressBar = (
        <Line
          percent={ this.state.percentage }
          strokeWidth="2"
          trailWidth="2"
          strokeColor="#198DCD"
        />
      )
    }
    
    return (
      <div className={ styles.uploadContainer }>
        <div className={ this.state.percentage === 100 ? styles.paintGreen : null }>
          <FilePond 
            allowMultiple={true}
            maxFiles={6}
            onupdatefiles={(fileItems) => {
              this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
              });
          }}>
          </FilePond>
        </div>
        <div className={ styles.progressBar }>
          { progressBar }
        </div>
        <div
          className={ styles.uploadButton }
        >
          <button
            onClick={ () => this.imageUploadHandler(auth.uid) }
            >Subir
          </button>
        </div>
      </div>
    )
  }
}

export default FileUploader;