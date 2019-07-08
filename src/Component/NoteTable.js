import React, { Component } from 'react';
import Note from './Note';
import firebaseConnect from './../firebaseConnect';
import {connect} from 'react-redux'

class NoteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteData: []
    }
  }

  addBtnRender = () =>{
    if(this.props.trangthai === false) {
      return(
        <div className="btn btn-outline-success mb-3" onClick = {()=>this.props.addClicked()}>+ Tạo ghi chú</div>
      )
    }
  }
  
  componentWillMount() {
    if(this.state.noteData.length === 0) {
      firebaseConnect.on('value', (snapshot)=>{
        snapshot.forEach((item)=>{
          this.setState({
            noteData: [{...item.val(), id: item.key}, ...this.state.noteData]
          });
        })
        this.props.noteInit(this.state.noteData);
      })
    }
  }
  
  render() {    
    return (
      <div className="col">
        {this.addBtnRender()}
        <div className="accordion" id="accordionExample">
          {this.props.notebook.map((value, key)=>{
          return (key === 0) ? 
          <Note key={key} noteValue = {value} id={key+1} status="true" type=" show"/>
          :<Note key={key} noteValue = {value} id={key+1} status="false" type=""/>
        })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trangthai: state.addBtn,
    notebook: state.notebook
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addClicked: () => {
      dispatch({type: "addClicked"})
    },
    noteInit: (item) => {
      dispatch({type: "init", notebook: [...item]})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTable)