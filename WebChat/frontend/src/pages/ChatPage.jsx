import { useState, useEffect, useRef } from "react";
import MyMessage from "../components/MyMessage";
import CompanionMessage from "../components/CompanionMessage";
import "../css/ChatPage.css";

export default function ChatPage({ companionId }) {
  const currentUserId = localStorage.getItem("currentUserId") || "";
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const chatWindowRef = useRef(null);

  async function fetchMessages() {
    try {
      const response = await fetch(
        `https://webchatbajmitos.runasp.net/api/v1/messages?userId=${currentUserId}`,
        { mode: "cors" }
      );
      if (!response.ok) throw new Error("Ошибка загрузки сообщений");
      const data = await response.json();
      setMessages(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [currentUserId]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://webchatbajmitos.runasp.net/api/v1/users",
          { mode: "cors" }
        );
        if (!response.ok) throw new Error("Ошибка загрузки пользователей");
        setUsers(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const scrollToBottom = () => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const editMessage = (message) => {
    setEditingMessage(message);
    setNewMessage(message.text);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch(
        "https://webchatbajmitos.runasp.net/api/v1/messages/add",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: currentUserId,
            receiverId: companionId,
            text: newMessage,
            date: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Ошибка отправки сообщения");
      setNewMessage("");
      await fetchMessages();
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  const updateMessage = async () => {
    if (!editingMessage || newMessage.trim() === "") return;

    try {
      const response = await fetch(
        `https://webchatbajmitos.runasp.net/api/v1/messages/update/${editingMessage.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newMessage, senderId: currentUserId }),
        }
      );
      if (!response.ok) throw new Error("Ошибка обновления сообщения");
      setEditingMessage(null);
      setNewMessage("");
      await fetchMessages();
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `https://webchatbajmitos.runasp.net/api/v1/messages/delete/${messageId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Ошибка удаления сообщения");
      await fetchMessages();
      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.length === 0 ? (
          <p className="no-messages">Нет сообщений</p>
        ) : (
          messages.map((msg) => {
            const senderName =
              msg.senderId === currentUserId
                ? "Вы"
                : users.find((user) => user.id === msg.senderId)?.username ||
                  "Компаньон";

            return msg.senderId === currentUserId ? (
              <MyMessage
                key={msg.id}
                messageId={msg.id}
                senderId={msg.senderId}
                currentUserId={currentUserId}
                sender={senderName}
                text={msg.text}
                time={msg.date?.split("T")[1]?.slice(0, 5) || "—"}
                onEdit={() => editMessage(msg)}
                onDelete={() => deleteMessage(msg.id)}
              />
            ) : (
              <CompanionMessage
                key={msg.id}
                sender={senderName}
                text={msg.text}
                time={msg.date?.split("T")[1]?.slice(0, 5) || "—"}
              />
            );
          })
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (editingMessage ? updateMessage() : sendMessage())
          }
        />
        <button onClick={editingMessage ? updateMessage : sendMessage}>
          {editingMessage ? "Обновить" : "Отправить"}
        </button>
      </div>
    </div>
  );
}
