import React, { useState } from 'react';
import * as env from "./../env.json";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setMessages((prevMessages) => [...prevMessages, <span className='prompt-output'>{newMessage}</span>]);
        getData(newMessage);
        setNewMessage('');
    };

    async function getData(prompt) {
        const decoder = new TextDecoder('utf-8');
      
        try {
          const response = await fetch(`${env.url}/api/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'llama3.1',
              prompt
            })
          });
            
          const reader = response.body.getReader();
            
          while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setMessages((prevMessages) => [...prevMessages, <><br /><br /></>]);

                return;
              }

              const sanitizedValue = decoder.decode(value)
              const newMessage = JSON.parse(sanitizedValue).response;
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        } catch (error) {
          console.error(error.message);
        }
      }

    return (
        <div>
            <div className="answer-output">
                {messages.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="prompt-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Prompt the llama"
                    />
                <button type="button" onClick={handleSendMessage}>Send</button>
            </form>
        </div>
    );
};

export default Chat;