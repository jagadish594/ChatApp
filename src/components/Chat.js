import React from "react";
import { connect } from "react-redux";
import "../App.css";

class Chat extends React.Component {
  componentDidMount() {
    this.props.onJoiningChatRoom();
  }

  handleMessage = () =>{
    this.props.handleSendMessage()
    this.props.onCheckingMessages()

  }
  render() {
    let userList = ""
    if(this.props.users){
      userList = this.props.users.join(", ")
    }
    return (
      <div className="ChatContainer">
        <div className="LeftPanel">
          <div className="UserName">{this.props.userName}</div>
          <ul className="ChatRooms">
            {this.props.data &&
              this.props.data.map(item => (
                <li
                  key={item.id}
                  id={item.id}
                  onClick={this.props.handleChatRoom}
                  value={item.name}
                  className="Room"
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="RightPanel">
          <div className="ChatRoomHeader">
            <h3>{this.props.roomName}</h3>
            <div>{userList}</div>
          </div>
          
          <div className="Messages">
          {
            this.props.messages && this.props.messages.map(item =>{
              return <div className="MessageBox" key={item.id}>
                        <div className="Message" >{item.message}</div>
                        <div className="User">{item.name}</div>
                    </div>
            })
          }
                
          </div>
          
          <div className="ReplyBox">
            <input type="text" value={this.props.replyInput} onChange={this.props.handleReplyInput} className="ReplyInput"/>
            <button onClick={this.handleMessage} className="SendButton" >Send</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userName,
    data: state.data,
    roomName: state.roomName,
    users: state.users,
    messages: state.messages,
    replyInput: state.replyInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onJoiningChatRoom: () =>
      dispatch({
        type: "JOIN_CHAT",
      }),

    onCheckingMessages: () =>
      dispatch({
        type: "CHECK_MSG",
      }),

    handleChatRoom: event =>
      dispatch({
        type: "CHAT_ROOM_DETAILS",
        roomName: event.target.innerHTML,
        roomId: event.target.id
      }),

    handleReplyInput: (event) =>
      dispatch({
        type: "REPLY_INPUT",
        replyInput: event.target.value
      }),

    handleSendMessage: () =>
      dispatch({
        type: "SEND_MSG",
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
