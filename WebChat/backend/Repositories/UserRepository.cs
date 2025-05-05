using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class UserRepository(ApplicationDbContext context)
{
    public async Task<List<User>?> GetAllAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await context.Users.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await context.Users.FirstOrDefaultAsync(x => x.Username == username);
    }

    public async Task<User> CreateAsync(User user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
        
        return user;
    }

    public async Task<User?> UpdateAsync(Guid id, string username, string passwordHash)
    {
        var user = await GetByIdAsync(id);
        
        if(user == null) throw new KeyNotFoundException("User not found");
        
        user.Username = username;
        user.PasswordHash = passwordHash;
        
        await context.SaveChangesAsync();
        
        return user;
    }

    public async Task<User?> DeleteAsync(Guid id)
    {
        var user = await GetByIdAsync(id);
        
        if(user == null) throw new KeyNotFoundException("User not found");

        context.Users.Remove(user);
        await context.SaveChangesAsync();
        
        return user;
    }
}