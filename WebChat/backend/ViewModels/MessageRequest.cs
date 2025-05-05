namespace backend.ViewModels;

public class MessageRequest
{
    public string Text { get; set; } = string.Empty;
    public Guid SenderId { get; set; }
}