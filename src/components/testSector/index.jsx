import React, { Component } from 'react';
import { Player } from 'video-react';

import Carousel from '../carousel';
import wolfPics from '../../mocks/wolfes.json';
import styles from './tSector.module.css';
import './video-react.css';

class tSector extends Component {

  createContent(content) {
    return (
      content.map((picture, index) => {
        return <div className={ styles.sliderPics }
          key={ index + new Date().getTime()}
        >
          {/* <img src={ picture } alt="wolves"/> */}
          <Player
          playsInline
          poster={ picture }
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
        </div>
      })
    )
  }

  render() {
    return ([
      <div>
        <Carousel>
          { this.createContent(wolfPics.wolfes) }
        </Carousel>
      </div>,
      <div className={ styles.vidTest }>
        <h2>Vid Test</h2>
        <hr/>
        <Player
          playsInline
          // poster="/assets/images/adifox_logo.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
      </div>
    ])
  }
}

export default tSector;