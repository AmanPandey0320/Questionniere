import firebase from '../../Logic/firebase';
import { uiActions } from '../reducers/uiSlice';
import { formActions } from '../reducers/formSlice';
import store from '../rootReducer'

export const initForm = (history) => {
    return (dispatch) => {
        dispatch(uiActions.toggleDrop());
        const db = firebase.firestore();
        db.collection("forms").get().then(querySnapshot => {
            let len = 0;
            querySnapshot.forEach(doc => len++);
            const id = len;
            const code = `QNR_${id}`;
            dispatch(formActions.editFormData({id,code}));
            dispatch(formActions.addNewSection());
            const form = store.getState().form;
            console.log(form)
            db.collection("forms").add(form).then(res => {
                dispatch(uiActions.toggleDrop());
                history.push(`/form/${code}`);
            }).catch(err => {
                dispatch(uiActions.toggleDrop());
                dispatch(uiActions.sendNotification({
                    severity:'error',
                    text:'Unable to initialize form!!!',
                    show:true
                }));
            })

        }).catch(err => {
            dispatch(uiActions.toggleDrop());
            dispatch(uiActions.sendNotification({
                severity:'error',
                text:'Unable to initialize form!!!',
                show:true
            }));
        })
    }
}