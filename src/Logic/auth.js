import firebase from "./firebase";

export const signInHandler = (email, password,setDrop) => (event) => {};

export const signUpHandler = (email, password,setDrop) => (event) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user.uid);
    })
    .catch((err) => {
        console.log(err)
    });
    
};
