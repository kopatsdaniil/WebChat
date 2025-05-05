namespace backend.Contracts;

public class MessageDto
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public Guid SenderId { get; set; }
}