namespace backend.Models;

public class Message
{
    private Message(Guid id, string text, DateTime date, Guid senderId)
    {
        Id = id;
        Text = text;
        Date = date;
        SenderId = senderId;
    }

    public Message()
    {
    }
    
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    
    public User Sender { get; set; }
    public Guid SenderId { get; set; }

    public static Message Create(Guid id, string text, DateTime date, Guid senderId)
    {
        return new Message(id, text, date, senderId);
    }
}