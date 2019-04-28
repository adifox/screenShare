import React, { Component } from 'react';
import Slider from 'react-slick';

// Styles
import './carousel.css';
import styles from './carousel.module.css';

class Carousel extends Component {

  render() {
    const { sliderSettings } = this.props
    const RightArrow = (props) => {
      const { onClick } = props;
      return (
        <div
          className={ onClick ? styles.nextArrow : styles.arrowNoShow }
          onClick={ onClick }
        >
        <i className="material-icons">navigate_next</i>
        </div>
      );
    }
  
    const LeftArrow = (props) => {
      const { onClick } = props;
      return (
        <div
          className={ onClick ? styles.prevArrow : styles.arrowNoShow }
          onClick={onClick}
        >
        <i className="material-icons">navigate_before</i>
        </div>
      );
    }

    const { children } = this.props;
    const settings = {
      className: styles.carouselSlider,
      dots: false,
      infinite: sliderSettings.infiniteDesktop,
      speed: 500,
      lazyLoad: sliderSettings.lazyLoad,
      slidesToShow: sliderSettings.slidesToShowDesktop,
      slidesToScroll: sliderSettings.slidesToScrollDesktop,
      nextArrow: <RightArrow />,
      prevArrow: <LeftArrow />,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: sliderSettings.slidesToShowSmallDesktop,
            slidesToScroll: sliderSettings.slidesToScrollSmallDesktop,
            infinite: sliderSettings.infiniteSmallDesktop,
            arrows: sliderSettings.arrowsSmallDesktop
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: sliderSettings.slidesToShowTablet,
            slidesToScroll: sliderSettings.slidesToScrollTablet,
            infinite: sliderSettings.infiniteTablet,
            arrows: sliderSettings.arrowsTablet
          }
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: sliderSettings.slidesToShowMobile,
            slidesToScroll: sliderSettings.slidesToScrollMobile,
            infinite: sliderSettings.infiniteMobile,
            arrows: sliderSettings.arrowsMobile
          }
        }
      ]
    };

    return (
        <Slider
         {...settings}
        >
          { children }
        </Slider>
    )
  }

}

export default Carousel;