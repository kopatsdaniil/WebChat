namespace backend.Contracts;

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
}