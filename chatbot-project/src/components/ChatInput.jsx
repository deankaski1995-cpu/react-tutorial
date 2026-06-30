import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import lodingGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleInputText(event){
    if (event.key === 'Enter' && !isLoading){
      sendMessage();
    } else if(event.key === 'Escape'){
      setInputText('');
    }
  }

  async function sendMessage() {
    if(isLoading || inputText === '') return;

    const chatMessageWithUserMessage = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(chatMessageWithUserMessage);
    
    
    setInputText('');

    setChatMessages([
      ...chatMessageWithUserMessage,
      {
        message: <img
          src={lodingGif}
          style={{height: '40px', margin: '-15px'}}
        />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...chatMessageWithUserMessage,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    
    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a massage to Chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleInputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
  }