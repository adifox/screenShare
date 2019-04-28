import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from '../../store/actions/authAction';

import styles from './login.module.css';
import logo from '../../assets/images/twitter-logo.png';

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    })
  }

  submitHandler(e) {
    e.preventDefault()
    console.log('SIGNING IN WITH:', this.state)
    this.props.signIn(this.state)
  } 

  render() {
    if (this.props.auth.uid) { return <Redirect to='/profile'/> }
    return (
      <div>
        <div className={ styles.rightContainer }>
          <div className={ styles.welcomeLogo }>
            <img src={ logo } className={ styles.appLogo } alt="adifox-logo" />
          </div>
        </div>
        <div className={ styles.leftContainer }>
          <div className={ styles.registerForm }>
            <form onSubmit={ (e) => this.submitHandler(e) } autoComplete="on">
              <a href="/">
                <img src={ logo } className={ styles.registerLogo } alt="adifox-logo"/>
                <h2>Welcome back</h2>
              </a>
              <input className={ styles.inputField } onChange={ (e) => this.changeHandler(e) } type="email" name="email" placeholder="Email" required/>
              <input className={ styles.inputField } onChange={ (e) => this.changeHandler(e) } type="password" minLength="6" name="password" placeholder="Contraseña" required/>
              <input className={ styles.formButton } type="submit" name="submit" value="Entrar"/>
            </form>
            <div className={ styles.alreadyUser }>
              <p><a href="/register">¿Todavía no tienes cuenta?</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('THE STATE AT LOGIN:', state)
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);