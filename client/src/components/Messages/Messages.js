import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import './Messages';

const Messages = ({ name, messages }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
