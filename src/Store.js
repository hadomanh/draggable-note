import noteReducer from './noteReducer';
import addBtnReducer from './addBtnReducer';
import editBtnReducer from './editBtnReducer';
import notebookReducer from './notebookReducer';
import alertReducer from './alertReducer';

var myRedux = require('redux');

const myReducer = myRedux.combineReducers({
    myNote: noteReducer,
    addBtn: addBtnReducer,
    editBtn: editBtnReducer,
    notebook: notebookReducer,
    alert: alertReducer
});

var myStore = myRedux.createStore(myReducer);

myStore.subscribe(()=> {
    console.log((myStore.getState()));
});

export default myStore;