namespace backend.Models;

public class Message
{
    private Message(Guid id, string text, DateTime date)
    {
        Id = id;
        Text = text;
        Date = date;
    }

    public Message()
    {
    }
    
    public Guid Id { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    
    public User Sender { get; set; }
    public Guid SenderId { get; set; }

    public static Message Create(Guid id, string text, DateTime date)
    {
        return new Message(id, text, date);
    }
}