import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
const socket = io('http://localhost:3000');
import '../../globals.css'
const Message = ({ content, isSentBySender }) => {
  const messageClass = isSentBySender ? 'bg-blue-500 text-white' : 'bg-gray-200';

  return (
    <div
      className={`rounded-lg p-2 mb-2 ${isSentBySender ? 'ml-auto' : 'mr-auto'}`}
      style={{ maxWidth: '75%' }}
    >
      <p className={`text-xl ${messageClass}`}>{content.message_description}</p>
      <p className='text-sm'>At {content.time}</p>
      <p className='text-sm'>to {content.receiver_id}</p>
    </div>
  );
};




const Home = () => {
  const router=useRouter();
 const userId1 =(typeof window !== "undefined" ? window.localStorage.getItem('user_id') : false)     
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {slug} = router.query; // Replace with actual user ID
    const userId2=slug;
  useEffect(() => {
  console.log(userId2)
  console.log("user 1",userId1)
    socket.on('connect', () => {
      // Authenticate the user upon connection
      socket.emit('authenticateUser', userId1);
    });

    socket.on('initialMessages', (data) => {
      setMessages(data);
    });

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    fetchMessages();

    return () => {
      socket.off('initialMessages');
      socket.off('newMessage');
    };
  }, []);
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/message/${userId1}/${userId2}`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setMessages(data);
        console.log(data)
      } else {
        console.error('Invalid data format: Expected an array');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
console.log("messages",messages)
  const handleSubmit = (e) => {
    e.preventDefault();

    const senderId = userId1; // Replace with actual user ID
    const receiverId = userId2; // Replace with actual user ID

    const message = {
      senderId,
      receiverId,
      content: newMessage,
    };

    // Send the new message to the server
    socket.emit('sendMessage', message);

    setNewMessage('');
    fetchMessages()
  };

  return (
    
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message}
              isSentBySender={message.user_id === userId1} // Replace with actual user ID
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
            disabled={!newMessage}
          >
            Send
          </button>
        </form>
      </div>
    );
  };
  
  


export default Home;
