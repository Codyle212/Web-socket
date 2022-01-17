import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';
//user message:{user,text} if you want to deconstruct message further down
const Message = ({ name, message }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if (message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{message.user}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
      <p className="sentText pl-10">{message.user}</p>
    </div>
  );
};

export default Message;
