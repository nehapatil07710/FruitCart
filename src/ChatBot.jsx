import React, { useState } from "react";

const chatFlow = [
  {
    question: "👋 Hi! I'm your shopping assistant. What do you want to know?",
    options: [
      { text: "🛍️ What products are available?", next: 1 },
      { text: "🛒 How to check my cart?", next: 2 },
      { text: "💳 How to place an order?", next: 3 },
      { text: "🔐 Login/Signup help", next: 4 },
    ],
  },
  {
    answer: "We offer fresh fruits like apples, bananas, oranges 🍎🍌🍊.",
  },
  {
    answer: "Click on the cart icon 🛒 at the top to see your selected items.",
  },
  {
    answer:
      "Go to cart and click the 'Buy Now' button to complete your purchase 💳.",
  },
  {
    answer:
      "Click the 'Login' or 'Signup' buttons in the navbar to get started 🔐.",
  },
];

const ChatBot = () => {
  const [chatLog, setChatLog] = useState([
    { sender: "bot", text: chatFlow[0].question, options: chatFlow[0].options },
  ]);

  const handleOptionClick = (option, nextIndex) => {
    const userMsg = { sender: "user", text: option.text };
    const botReply = chatFlow[nextIndex];

    const newMessages = [userMsg, { sender: "bot", text: botReply.answer }];
    setChatLog((prev) => [...prev, ...newMessages]);
  };

  const renderOptions = (options) =>
    options &&
    options.map((option, index) => (
      <button
        key={index}
        onClick={() => handleOptionClick(option, option.next)}
        style={styles.optionButton}
      >
        {option.text}
      </button>
    ));

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8f9fa",
              color: "#000", // ✅ Ensures black text
            }}
          >
            {msg.text}
            {msg.options && (
              <div style={styles.optionsContainer}>
                {renderOptions(msg.options)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "90%",
    maxWidth: "500px",
    margin: "20px auto",
    border: "2px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "Arial",
    backgroundColor: "#fff",
  },
  chatBox: {
    minHeight: "300px",
    maxHeight: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#ffffff",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "80%",
    color: "#000", // ✅ Ensures all messages are black
  },
  optionsContainer: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  optionButton: {
    padding: "8px 12px",
    backgroundColor: "#e6f0ff",
    border: "1px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "left",
    color: "#000", // ✅ Button text black
    fontWeight: "bold",
  },
};

export default ChatBot;
