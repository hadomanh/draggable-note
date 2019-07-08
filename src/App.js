import './App.css';
import React, { Component } from 'react';
// import firebaseConnect from './firebaseConnect';
import AddNote from './Component/AddNote';
import NoteTable from './Component/NoteTable';
import Nav from './Component/Nav';
import EditNote from './Component/EditNote';
import Alert from './Component/Alert';
import {connect} from 'react-redux';

class App extends Component {
  // makeNote = (id, title, content) => {
  //   var note = {
  //     id: id,
  //     title: title,
  //     content: content 
  //   };
  //   firebaseConnect.push(note);
  // }

  // editNote = (id, content) => {
  //   firebaseConnect.once('value', function(snapshot) {
  //     snapshot.forEach(function(childSnapshot){
  //         var item = childSnapshot.val();
  //         if(item.id === id) {
  //             firebaseConnect.child(childSnapshot.key).set({...item, content: content});
  //         }
  //     });
  // });
  // }

  // deleteNoteByID = (id) => {
  //   firebaseConnect.once('value', function(snapshot) {
  //     snapshot.forEach(function(childSnapshot){
  //         if(childSnapshot.val().id === id) {
  //             firebaseConnect.child(childSnapshot.key).remove();
  //         }
  //     });
  // });
  // }

  showAlert = () =>{
    if(this.props.hasAlert.status === false) return null;
    setTimeout(() => this.props.hideAlert(), 3000);
    return <Alert/>
  }

  render() {
    return (
      <div className="App">
      <Nav/>
      {this.showAlert()}
      <div className="container mt-3">
        <div className="row">
          <NoteTable/>
          <AddNote/>
          <EditNote/>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hasAlert: state.alert
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideAlert: () => {
      dispatch({
        type: "alertOff"
      })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)