import React from 'react';

import classes from './image.css';
import picture from '../../assets/images/fuerte_conil.jpg';

const Image = () => (
  <div className={ classes.PictureContainer }>
    <img src={ picture } alt="What ever"/>
  </div>
)

export default Image;