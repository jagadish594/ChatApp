import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const Login =(props) =>{
    return(
        <div className="LoginContainer">
            <input type="text" value={props.userName} onChange={props.handleUserName} className="LoginInputBox" placeholder="Type your username..."/>
            <button className="JoinChatButton"><NavLink to="/Chat" className="JoinChatButtonText">Join the DoorDash Chat!</NavLink></button>
        </div>  
    )
}
  
const mapDispatchToProps = (dispatch) =>{
    return{
        handleUserName: (event) => dispatch({
        type: "USER_NAME",
        userName: event.target.value
        })
    }
}

export default connect(null, mapDispatchToProps)(Login);
