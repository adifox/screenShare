// import mockedUser from '../../mocks/user.json';
// const initState = mockedUser
const initState = {}

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      console.log('created user', action.user)
      return state;
    case 'CREATE_USER_ERROR':
      console.log('CREATE USER ERROR:', action.error)
      return state;
    default:
      return state;
  }
}

export default itemReducer;