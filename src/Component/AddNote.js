import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebaseConnect from './../firebaseConnect';

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    sendData = ()=>{
        var noteKey = firebaseConnect.push(this.state);
        var newBook = [{...this.state, id: noteKey.key}, ...this.props.notebook];
        this.props.noteInit(newBook);
        this.props.showAlert("Thêm thành công!", "success");
        this.props.closeForm();
    }

    formRender = () =>{
        if(this.props.trangthaiAdd === true)
        return(
                <div className="card">
                    {this.props.clearAll()}
                    <div className="btn btn-block btn-outline-danger" onClick={()=> this.props.closeForm()}>Đóng</div>
                    <div className="card-header">Tạo ghi chú</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group d-flex align-items-start flex-column">
                            <label htmlFor="exampleFormControlInput1">Tiêu đề:</label>
                            <input name="title" onChange={(event)=>this.noteInfo(event)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tiêu đề cho ghi chú này..." />
                            </div>
                            
                            <div className="form-group d-flex align-items-start flex-column">
                            <label htmlFor="exampleFormControlTextarea1">Nội dung:</label>
                            <textarea name="content" onChange={(event)=>this.noteInfo(event)} className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={"Nội dung công việc..."} />
                            </div>
                        </form>
                    <div className="btn btn-block btn-success" onClick={()=> this.sendData()}>Thêm mới</div>
                    </div>
                </div>
        )
    }
    
    noteInfo = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>{this.formRender()}</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        trangthaiAdd: state.addBtn,
        trangthaiEdit: state.editBtn,
        myNote: state.myNote,
        notebook: state.notebook
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        noteInit: (item) => {
            dispatch({type: "init", notebook: [...item]})
        },
        closeForm: () => {
            dispatch({type:"addClicked"})
        },
        clearAll: ()=>{
            dispatch({type:"closeEditForm"})
        },
        showAlert: (x, y)=>{
            dispatch({type: "alertOn", title: x, content: y})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)