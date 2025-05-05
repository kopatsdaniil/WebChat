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
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    
    public ICollection<Message> Messages { get; set; }

    public static User Create(Guid id, string username, string passwordHash)
    {
        return new User(id, username, passwordHash);
    }
}