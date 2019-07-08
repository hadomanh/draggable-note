import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebaseConnect from './../firebaseConnect';

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.noteData.title,
            content: nextProps.noteData.content
        });
    }

    noteInfo = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    sendData = ()=>{
        firebaseConnect.child(this.props.noteData.id).set(this.state);
        var newBook = [...this.props.notebook];
        newBook.forEach((value, key) =>{
            if(value.id === this.props.noteData.id) {
                value.title = this.state.title;
                value.content = this.state.content
            }
        });
        this.props.noteInit(newBook);
        this.props.showAlert("Sửa thành công!", "warning");
        this.props.closeForm();
    }

    formRender = ()=>{
        if(this.props.trangthai === true)
        return(
            <div className="card">
                <div className="btn btn-block btn-outline-danger" onClick={()=>this.props.closeForm()}>Đóng</div>
                <div className="card-header">Sửa ghi chú</div>
                <div className="card-body">
                    <form>
                        <div className="form-group d-flex align-items-start flex-column">
                        <label htmlFor="exampleFormControlInput1">Tiêu đề:</label>
                        <input defaultValue={this.props.noteData.title} name="title" onChange={(event)=>this.noteInfo(event)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Note title..." />
                        </div>
                        
                        <div className="form-group d-flex align-items-start flex-column">
                        <label htmlFor="exampleFormControlTextarea1">Nội dung:</label>
                        <textarea defaultValue={this.props.noteData.content} name="content" onChange={(event)=>this.noteInfo(event)} className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={"What are you going to do..."} />
                        </div>
                    </form>
                    <div className="btn btn-block btn-warning" onClick={()=>this.sendData()}>Sửa</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.formRender()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trangthai: state.editBtn,
        noteData: state.myNote,
        notebook: state.notebook
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeForm: () => {
            dispatch({type:"editClicked"})
        },
        clearAll: ()=>{
            dispatch({type:"closeAddForm"});
        },
        noteInit: (item) => {
            dispatch({type: "init", notebook: [...item]})
        },
        showAlert: (x, y)=>{
            dispatch({type: "alertOn", title: x, content: y})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)