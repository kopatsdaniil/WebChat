import { useState } from "react";
/*import MyMessage from "./MyMessage";
import CompanionMessage from "./CompanionMessage";*/
import "../css/ChatPage.css";

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { sender: "companion", text: "Привет! Как дела?", time: new Date().toLocaleTimeString() },
        { sender: "me", text: "Привет! Все отлично, а у тебя?", time: new Date().toLocaleTimeString() },
    ]);

    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const messageObject = {
            sender: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString(),
        };

        setMessages([...messages, messageObject]);
        setNewMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-window">
                {messages.map((msg, index) =>
                    msg.sender === "me" ? (
                        <MyMessage key={index} text={msg.text} time={msg.time} />
                    ) : (
                        <CompanionMessage key={index} text={msg.text} time={msg.time} />
                    )
                )}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
}
