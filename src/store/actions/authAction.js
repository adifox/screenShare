export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((response) => {
      console.log('RESPONSE AT DISPATCH:', response)
      dispatch({
        type: 'LOGIN_SUCCESS'
      })
    }).catch((err) => {
      dispatch({
        type: 'LOGIN_ERROR',
        error: err
      })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SIGN_OUT_ERROR', error: err })
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      console.log('RESPONSE FORM USER CREATED:', response.user.uid)
      return firestore.collection('users').doc(response.user.uid).set({
        username: newUser.username,
        acceptedTerms: newUser.acceptedTerms
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}