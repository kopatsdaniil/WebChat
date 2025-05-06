using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class UserService(UserRepository userRepository)
{
    public async Task<List<User>?> GetAllAsync()
    {
        return await userRepository.GetAllAsync();
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await userRepository.GetByIdAsync(id);
    }

    public async Task<User> Register(string username, string password)
    {
        var user = await userRepository.GetByUsernameAsync(username);
        
        if(user != null) throw new Exception("Username already exists");
        
        var passwordHash = Generate(password);
        
        return await userRepository.CreateAsync(User.Create(Guid.NewGuid(), username, passwordHash));
    }

    public async Task<bool> Login(string username, string password)
    {
        var user = await userRepository.GetByUsernameAsync(username);
        
        if (user == null) throw new UnauthorizedAccessException("Invalid username or password");
        
        return Verify(password, user.PasswordHash);
    }

    public async Task<User?> UpdateAsync(Guid id, string username, string password)
    {
        return await userRepository.UpdateAsync(id, username, Generate(password));
    }

    public async Task<User?> DeleteAsync(Guid id)
    {
        return await userRepository.DeleteAsync(id);
    }
    
    private static string Generate(string password) => BCrypt.Net.BCrypt.EnhancedHashPassword(password);
    
    private static bool Verify(string password, string hashedPassword) =>
        BCrypt.Net.BCrypt.EnhancedVerify(password, hashedPassword);
}