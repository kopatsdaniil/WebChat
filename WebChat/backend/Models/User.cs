namespace backend.Models;

public class User
{
    private User(Guid id, string username, string passwordHash)
    {
        Id = id;
        Username = username;
        PasswordHash = passwordHash;
    }

    public User()
    {
    }
    
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    public List<Message> Messages { get; set; }

    public static User Create(Guid id, string username, string passwordHash)
    {
        return new User(id, username, passwordHash);
    }
}