import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './popup/App.css';

/**
 * Chat message type
 */
interface ChatMessage {
  type: 'user' | 'ai';
  text: string;
}

/**
 * Chat modal component
 * @param onHide Function to hide the modal
 * @param onInsertMessage Function to insert the generated message into the page
 */
const ChatModal = ({ onHide, onInsertMessage }: { onHide: () => void; onInsertMessage: (message: string) => void }) => {
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isRegenerateMode, setIsRegenerateMode] = useState<boolean>(false);

  /**
   * Function to simulate AI message generation
   */
  const generateAISuggestion = () => {
    const userQuery: ChatMessage = { type: 'user', text: userInput };
    const aiSuggestion: ChatMessage = {
      type: 'ai',
      text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    };

    setChatLog((prevChatLog) => [...prevChatLog, userQuery, aiSuggestion]);
    setUserInput('');
    setIsRegenerateMode(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-gray-900 bg-opacity-50">
      {/* Modal */}
      <div className="bg-white p-6 rounded-lg shadow-lg z-40 w-[500px] max-h-[80vh] flex flex-col">
        {/* Chat window with auto-growing height */}
        <div className="overflow-y-auto max-h-[400px] flex-grow">
          {chatLog.map((message, index) => (
            <div className={`flex w-full items-center  ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div
                key={index}
                className={`my-2 p-2 rounded max-w-[75%] ${
                  message.type === 'user' ? 'bg-gray-100 text-right self-end' : 'bg-blue-100 text-left self-start'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input section */}
        <div className="mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
            placeholder="Your prompt"
          />
        </div>

        <div className="mt-4 flex justify-end gap-x-4 items-center text-2xl font-semibold">
          {/* Insert button to send the last AI message back */}
          {chatLog.length > 0 && (
            <button
              onClick={() => {
                onInsertMessage(chatLog[chatLog.length - 1].text);
              }}
              className="bg-white ring-1 ring-inset ring-gray-500 text-gray-500 px-4 py-2 rounded flex items-center"
            >
              <img
                src={`${browser.runtime.getURL('icon/insert-icon.svg' as any)}`}
                className="mr-2 w-6 h-6"
              />
              Insert
            </button>
          )}

          {/* Button section */}

          <button
            onClick={generateAISuggestion}
            disabled={userInput.length < 1}
            className="bg-blue-500 disabled:bg-gray-500 text-white px-4 py-2 rounded flex items-center text-2xl font-semibold"
          >
            <img
              src={`${browser.runtime.getURL(isRegenerateMode ? 'icon/regenerate-icon.svg' : 'icon/Arrow-icon.svg' as any)}`}
              alt={isRegenerateMode ? "Regenerate Icon" : "Generate Icon"}
              className="mr-2 w-6 h-6"
            />
            {isRegenerateMode ? "Regenerate" : "Generate"}
          </button>


        </div>
      </div>

      {/* Close modal when clicking outside */}
      <div className="absolute inset-0 z-10" onClick={onHide}></div>
    </div>
  );
};

export default ChatModal;


