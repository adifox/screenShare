import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './header.module.css';
import logo from '../../assets/images/twitter-logo.png';

class Header extends Component {

  render() {
    return(
      <div className={ styles.header }>
        <div className={ styles.headerOverlay }>
          <header className={ styles.appHeader }>
            <img src={ logo } className={ styles.appLogo } alt="logo" />
            <a href="/" className={ styles.appTitle }>Adifox</a>
            <div className={ styles.loginArea }>
              <a href="/login" className={ styles.login }>Entra</a>
              <a href="/register" className={ styles.signup }>Registrate</a>
            </div>
          </header>
          <div className={ styles.appIntro }>
            <h1>
              Adifox te permite llevar tu contenido digital a cualquier pantalla
            </h1>
            <p className={ styles.appIntroText }>
              Crea canales y distribución según tu necesidad. Controla todo desde tu perfil personalizado en Adifox. 
            </p>
            <a href="/register" className={ styles.signup }>Pruébalo gratis aquí</a>
            {/* <p className={ styles.alreadyUser }>
              ¿Ya tienes una cuenta de Adifox? <a href="/login" className={ styles.enter }>Entra aquí</a></p> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN HEADER:', state)
  return {

  }
}

export default connect(mapStateToProps)(Header);