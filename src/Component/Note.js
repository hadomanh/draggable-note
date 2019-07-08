import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebaseConnect from './../firebaseConnect';

class Note extends Component {
    sendData = ()=>{
        this.props.editClicked();
        this.props.getNoteData(this.props.noteValue);
    }

    removeNote = ()=>{
        firebaseConnect.child(this.props.noteValue.id).remove();
        var newBook = this.props.notebook.filter(item => item.id !== this.props.noteValue.id);
        this.props.noteInit(newBook);
        this.props.showAlert("Xóa thành công!", "danger");
    }

    editBtnRender = () =>{
        if(this.props.trangthai === false)
        return(
            <div className="btn btn-group float-right">
                <div className="btn btn-warning" onClick={()=>this.sendData()}>Sửa</div>
                <div className="btn btn-danger" onClick={()=>this.removeNote()}>Xóa</div>
            </div>
        )
    }

    render() {
        return (
            <div className="card">
                <div className="card-header" id={"heading"+this.props.id}>
                    <h1 className="mb-0">
                    <button className="btn btn-link collapsed float-left" type="button" data-toggle="collapse" data-target={"#collapse"+this.props.id} aria-expanded={this.props.status} aria-controls={"collapse"+this.props.id}>
                        {this.props.noteValue.title}
                    </button>
                    
                    {this.editBtnRender()}
                        
                    </h1>
                </div>
                
                <div id={"collapse"+this.props.id} className={"collapse"+this.props.type} aria-labelledby={"heading"+this.props.id} data-parent="#accordionExample">
                    <div className="card-body ml-3 text-left">
                        {this.props.noteValue.content}  
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trangthai: state.editBtn,
        notebook: state.notebook
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editClicked: () => {
            dispatch({type: "editClicked"});
            dispatch({type: "closeAddForm"})
        },
        getNoteData: (x) => {
            dispatch({type: "seeNote", note: x });
        },
        noteInit: (item) => {
            dispatch({type: "init", notebook: [...item]})
        },
        showAlert: (x, y)=>{
            dispatch({type: "alertOn", title: x, content: y})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)