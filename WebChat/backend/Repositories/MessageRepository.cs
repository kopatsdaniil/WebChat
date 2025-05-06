using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class MessageRepository(ApplicationDbContext context)
{
    public async Task<List<Message>?> GetAllAsync()
    {
        return await context.Messages.ToListAsync();
    }

    public async Task<List<Message>?> GetBySenderIdAsync(Guid senderId)
    {
        return await context.Messages.Where(m => m.SenderId == senderId).ToListAsync();
    }

    public async Task<Message?> GetByIdAsync(Guid id)
    {
        return await context.Messages.FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<Message> CreateAsync(Message message)
    {
        await context.Messages.AddAsync(message);
        await context.SaveChangesAsync();
        
        return message;
    }

    public async Task<Message?> UpdateAsync(Guid id, string text)
    {
        var message = await GetByIdAsync(id);
        
        if (message == null) throw new KeyNotFoundException("Message not found");
        
        message.Text = text;
        
        await context.SaveChangesAsync();
        
        return message;
    }

    public async Task<Message?> DeleteAsync(Guid id)
    {
        var message = await GetByIdAsync(id);
        
        if (message == null) throw new KeyNotFoundException("Message not found");
        
        context.Messages.Remove(message);
        await context.SaveChangesAsync();
        
        return message;
    }
}