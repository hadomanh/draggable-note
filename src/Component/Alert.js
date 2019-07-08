import React, { Component } from 'react';
import {connect} from 'react-redux';

class Alert extends Component {
    render() {
        return (
            <div className={"alert alert-dismissible fade show alert-" + this.props.alert.content} role="alert">
                <strong>{this.props.alert.title}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>this.props.hideAlert()}>
                <span aria-hidden="true">×</span>
                </button>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alert: state.alert
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

export default connect(mapStateToProps, mapDispatchToProps)(Alert)