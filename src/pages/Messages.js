import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
  const [conversations] = useState([
    { id: 1, name: 'Sarah Johnson', message: 'Hey! I received my order but one item is missing...', time: '2 min ago', unread: 3, avatar: '👩' },
    { id: 2, name: 'Mike Chen', message: 'Can you help me with the return process?', time: '15 min ago', unread: 1, avatar: '👨' },
    { id: 3, name: 'Emma Wilson', message: 'Thank you for the quick delivery! Everything looks perfect.', time: '1 hour ago', unread: 0, avatar: '👩‍🦰' },
    { id: 4, name: 'David Brown', message: 'Is this product available in blue color?', time: '2 hours ago', unread: 2, avatar: '👱‍♂️' },
    { id: 5, name: 'Lisa Garcia', message: 'I love my new purchase! Will definitely order again.', time: '3 hours ago', unread: 0, avatar: '👩‍🦱' }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would normally send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages</h1>
        <p>Customer support and communications</p>
      </div>

      <div className="messages-container">
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h3>Conversations</h3>
            <button className="new-message-btn">✉️</button>
          </div>
          
          <div className="conversations-list">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="conversation-avatar">{conversation.avatar}</div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="conversation-name">{conversation.name}</span>
                    <span className="conversation-time">{conversation.time}</span>
                  </div>
                  <div className="conversation-preview">
                    <span className="last-message">{conversation.message}</span>
                    {conversation.unread > 0 && (
                      <span className="unread-badge">{conversation.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <span className="chat-avatar">{selectedConversation.avatar}</span>
                  <div className="chat-user-details">
                    <h4>{selectedConversation.name}</h4>
                    <span className="status online">Online</span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">📞</button>
                  <button className="action-btn">📹</button>
                  <button className="action-btn">ℹ️</button>
                </div>
              </div>

              <div className="chat-messages">
                <div className="message incoming">
                  <div className="message-avatar">{selectedConversation.avatar}</div>
                  <div className="message-content">
                    <div className="message-bubble">
                      {selectedConversation.message}
                    </div>
                    <span className="message-time">{selectedConversation.time}</span>
                  </div>
                </div>
                
                <div className="message outgoing">
                  <div className="message-content">
                    <div className="message-bubble">
                      Thank you for reaching out! I'll help you with that right away. Can you please provide your order number?
                    </div>
                    <span className="message-time">1 min ago</span>
                  </div>
                </div>
              </div>

              <form className="message-input-form" onSubmit={handleSendMessage}>
                <div className="input-group">
                  <button type="button" className="attachment-btn">📎</button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button type="button" className="emoji-btn">😊</button>
                  <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                    📤
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-conversation">
              <span className="no-conversation-icon">💬</span>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
