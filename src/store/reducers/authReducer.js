const initialSate = {
  authError: null
}

const authReducer = (state = initialSate, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('LOGIN ERROR:', state)
      return {
        ...state,
        authError: 'Login failed'
      };
    case 'LOGIN_SUCCESS':
      console.log('LOGIN SUCCESS', state)
      return {
        ...state,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      console.log('Successfully signed out')
      return state;
    case 'SIGNUP_ERROR':
      console.log('SIGNUP ERROR')
      return {
        ...state,
        authError: action.err.message
      };
    case 'SIGNUP_SUCCESS':
      console.log('Successfully signup')
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
}

export default authReducer;