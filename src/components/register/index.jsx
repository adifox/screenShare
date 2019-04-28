import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signUp } from '../../store/actions/authAction';

import styles from './register.module.css';
import logo from '../../assets/images/twitter-logo.png';

class Register extends Component {

  state = {
    email: '',
    password: '',
    username: '',
    acceptedTerms: ''
  }

  changeHandler(e) {
    const value = e.target.type === 'checked' ? e.target.checked : e.target.value
    const name = e.target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Submitting:', this.state)
    this.props.signUp(this.state)
  }

  render() {
    if (this.props.authError) {
      console.log('ERROR in SIGNUP componente:', this.props.authError)
    }
    if (this.props.auth.uid) { return <Redirect to='/profile'/> }
    return (
      <div>
        <div className={ styles.leftContainer }>
          <div className={ styles.registerForm }>
            <form onSubmit={ (e) => this.handleSubmit(e) } autoComplete="on">
              <a href="/">
                <img src={ logo } className={ styles.registerLogo } alt="adifox-logo"/>
                <h2>Welcome to Adifox</h2>
              </a>
              <input className={ styles.inputField } value={ this.state.mailValue } onChange={ (e) => this.changeHandler(e) } type="email" name="email" placeholder="Email" required/>
              <input className={ styles.inputField } value={ this.state.username } onChange={ (e) => this.changeHandler(e) } type="text" name="username" placeholder="Nombre de Usuario" required/>
              <input className={ styles.inputField } value={ this.state.password } onChange={ (e) => this.changeHandler(e) } type="password" minLength="6" name="password" placeholder="Contraseña" required/>
              <div className={ styles.containerCheckbox }>
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  id="policy"
                  checked={ this.state.acceptedTerms }
                  onChange={ (e) => this.changeHandler(e) }
                  />
                He leído y acepto las<a href="/terms"> condiciones de uso</a> y
                <a href="/privacy"> política de privacidad</a> de Adifox
              </div>
              <button className={ styles.formButton } type="submit">
              Regístrarme
              </button>
            </form>
            <div className={ styles.alreadyUser }>
              <p><a href="/login">¿Ya tienes una cuenta?</a></p>
            </div>
          </div>
        </div>
        <div className={ styles.rightContainer }>
          <div className={ styles.welcomeLogo }>
            <img src={ logo } className={ styles.appLogo } alt="adifox-logo" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);