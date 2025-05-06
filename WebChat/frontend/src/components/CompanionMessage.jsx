export default function CompanionMessage({ sender, text, time }) {
    return (
      <div className="companion-message">
        <p className="sender-name">{sender}</p>
        <p>{text}</p>
        <span className="message-time">{time}</span>
      </div>
    );
  }
  