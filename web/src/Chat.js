// Chat.js
import React, { useState, useEffect } from 'react';
import './Chat.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, serverTimestamp } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import { useAuth } from './globals/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Chat = () => {
  const { user, loading, logout_user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState({ uid: user.userId }); // Set a default user

  const messagesRef = ref(database, 'messages');

  const toggleChat = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

  const fetchMessages = () => {
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
        console.log('Current Messages State:', messagesArray);
      } else {
        setMessages([]); // Ensure to set an empty array if there are no messages
        console.log('No messages available.');
      }
    });
  };

  const sendMessage = () => {
    console.log('Inside sendMessage');
    if (currentUser && currentUser.uid) {
      console.log('CurrentUser UID:', currentUser.uid);
      const message = {
        content: newMessage,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      };

      console.log('Sending message:', message);

      push(messagesRef, message)
        .then(() => {
          console.log('Message sent successfully');
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error.message);
        });
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-container">
      <button onClick={toggleChat}>Toggle Chat</button>

      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Chat Header</span>
            <button onClick={toggleChat}>Close</button>
          </div>
          <div className="chat-body">
            {messages.length > 0 ? (
              messages.map((message) => (
                <p key={message.timestamp}>{message.content}</p>
              ))
            ) : (
              <p>No messages available.</p>
            )}
            <input
              type="text"
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
