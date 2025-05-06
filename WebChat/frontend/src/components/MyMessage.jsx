export default function MyMessage({
  sender,
  text,
  time,
  messageId,
  senderId,
  currentUserId,
  onEdit,
  onDelete,
}) {
  return (
    <div className="my-message">
      {sender && <p className="sender-name">{sender}</p>}
      <p>{text}</p>
      <span className="message-time">{time}</span>
      {senderId === currentUserId && (
        <div className="message-actions">
          <button className="edit-btn" onClick={() => onEdit(messageId)}>
            ✏️ Редактировать
          </button>
          <button className="delete-btn" onClick={() => onDelete(messageId)}>
            🗑 Удалить
          </button>
        </div>
      )}
    </div>
  );
}
