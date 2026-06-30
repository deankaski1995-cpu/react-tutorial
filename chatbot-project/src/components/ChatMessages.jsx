import { useAutoScroll } from '../App'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

export function ChatMessages({chatMessages}) {
    const containerRef = useAutoScroll([chatMessages]);

    return (
      <div 
        className="chat-messages-container"
        ref={containerRef}
      >
        {chatMessages.length === 0 && <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>}
        {chatMessages.length > 0 && chatMessages.map((chatMessage) => {
          return (
            <ChatMessage 
              message={chatMessage.message}
              sender={chatMessage.sender}
              key= {chatMessage.id}
            />
          );
        })}
      </div>
    )
  }