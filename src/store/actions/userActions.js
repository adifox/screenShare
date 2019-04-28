const createUser = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make some async call
    const firestore = getFirestore()
    firestore.collection('users').add({
      ...user,
      createdAt: new Date()
    }).then(() => {
      dispatch({
        type: 'CREATE_USER',
        user: user
      })
    }).catch((err) => {
      dispatch({
        type: 'CREATED_USER_ERROR',
        error: err
      })
    })
  }
};

// const uploadFiles = (files) => {
//   return (dispatch, getState, { getFireBase, getFirestore }) => {
//     const firestore = getFirestore()
//     firestore.collection('images').add({

//     })
//   }
// }

export default createUser;