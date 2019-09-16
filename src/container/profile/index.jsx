import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Player } from 'video-react';
import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';

// Actions
import { signOut } from '../../store/actions/authAction';

// Components
import Carousel from '../../components/carousel';
import FileUploader from './components/fileUploader';

// Slider Settings
import SLIDER from './sliderSettings.json';

// Styles
import styles from './profile.module.css';
import './video-react.css';

// Images
import logo from '../../assets/images/twitter-logo.png';
import waitingGif from '../../assets/images/empty_slot.gif';
import placeHolder from '../../assets/images/placeholder-image.png';

class Profile extends Component {

  state = {
    showUploadBox: false,
    files: null,
    pictureUrl: null,
    videoUrl: null,
    percentage: 0,
    filesArray: null
  }

  createImageContent(content) {
    console.log('CREATE IMAGE CONTENT:',content)
    return content.map((file, index) => {
      return (
          <div
          key={ index }
          className={ styles.sliderPics }
        >
          <img
            src={ file }
            alt="animal-pics"
          />
        </div>
      )
    })
  }

  createVideoContent(content) {
    if (content !== null) {
      return (
        <div
          className={ styles.sliderVideoElements }
        >
          <Player
            playsInline
            aspectRatio={ 'auto' }
            fluid={ false }
            height={ 190 }
            src={ content }
          />
        </div>
    )} else {
      return (
        <div
          className={ styles.sliderVideoElements }
        >
          <Player
            playsInline
            poster={ placeHolder }
            aspectRatio={ 'auto' }
            fluid={ false }
            height={ 190 }
            src={ placeHolder }
          />
        </div>
      )
    }
  }

  showUploadBox() {
    this.setState({
      showUploadBox: true
    })
  }

  updateFilesArray = (files, amount) => {
    if (files.length === amount)
    console.log('SETTING FILES:', files)
    this.setState({
      filesArray: files
    })
  }

  signoutHandler() {
    this.props.signOut()
  }

  render () {
    const { auth, profile } = this.props
    const { showUploadBox, filesArray, files } = this.state
    let picturesCarouselArray = null

    if (!auth.uid) { return  <Redirect to='/' /> }

    if (filesArray !== null) {
      // console.log('THE FILES ARRAY AT CREATING')
      picturesCarouselArray = this.createImageContent(filesArray)
      setTimeout(
        function() {
          this.setState({ showUploadBox: false })
        }.bind(this), 3000
      )
    }

    const uploadContent = showUploadBox ? (
      <FileUploader
        auth={ auth }
        files={ files }
        updateFilesArray={ this.updateFilesArray }
      />
    ) : null


    return(
      <Fragment>
        <div className={ styles.navigation }>
          <div className={ styles.logoWrapper }>
            <img src={ logo } className={ styles.appLogo } alt="logo" />
          </div>
          <div className={ styles.buttonContent }>
          <h2 className={ styles.welcomeTitle }>
            ¿Que quieres hacer?
          </h2>
          <ul>
            <li>
              <div
                className={ styles.buttonDiv }
                onClick={ () => this.showUploadBox() }
              >
                <i className="material-icons">cloud_upload</i>
                <p className={ styles.listButtons }>Sube contenido</p>
              </div>
            </li>
            <li>
              <div
                  className={ styles.buttonDiv }
                  onClick={ () => this.createChannelHandler() }
              >
                <i className="material-icons">movie_filter</i>
                <p className={ styles.listButtons }>Crea un Canal</p>
              </div>
            </li>
            <li>
              <div
                  className={ styles.buttonDiv }
                  onClick={ () => this.signoutHandler() }
              >
                <i className="material-icons">settings_power</i>
                <p className={ styles.listButtons }>Cerrar sessión</p>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div className={ styles.mainPart }>
          {/* <div className={ styles.dashboardHeader }>
            <div className={ styles.searchBox }>
              <input className={ styles.searchInput } type="text" placeholder="Buscar"/>
              <button
                className={ styles.searchButton }
              >
                busca
              </button>
            </div>
          </div> */}
          <div className={ styles.imageContainer }>
            <h3 className={ styles.userName }>
              Hola, { profile ? profile.username : null }
            </h3>
            {/* <img className={ styles.coverImage } src={ image } alt="Fuerte-Hoteles"/> */}
          </div>
          <div className={ styles.mainPartContent }>
            <div className={ styles.contentUploader }>
              { uploadContent }
            </div>
            <h3>Mis videos</h3>
            <div className={ styles.videoCarousel }>
              <Carousel
                sliderSettings={ SLIDER.settings.profile }
              >
                {/* { this.createVideoContent(this.state.videoUrl) } */}
              </Carousel>
            </div>
            <h3>Mis imagenes</h3>
            <div className={ styles.imageCarousel }>
              <Carousel
                sliderSettings={ SLIDER.settings.profile }
              >
                { picturesCarouselArray }
              </Carousel>
            </div>
            <h3>Mis canales</h3>
            <div className={ styles.myChannels }>
            <img src={ waitingGif } alt="...empty"/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   firestoreConnect([
//     {
//       collection: 'users'
//     }
//   ])
// )(Profile);