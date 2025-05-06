using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class MessageService(MessageRepository messageRepository)
{
    public async Task<List<Message>?> GetAllAsync()
    {
        return await messageRepository.GetAllAsync();
    }

    public async Task<Message?> GetByIdAsync(Guid id)
    {
        return await messageRepository.GetByIdAsync(id);
    }

    public async Task<List<Message>?> GetBySenderIdAsync(Guid senderId)
    {
        return await messageRepository.GetBySenderIdAsync(senderId);
    }

    public async Task<Message> CreateAsync(string text, DateTime date, Guid senderId)
    {
        return await messageRepository.CreateAsync(Message.Create(Guid.NewGuid(), text, date, senderId));
    }

    public async Task<Message?> UpdateAsync(Guid id, string text)
    {
        return await messageRepository.UpdateAsync(id, text);
    }

    public async Task<Message?> DeleteAsync(Guid id)
    {
        return await messageRepository.DeleteAsync(id);
    }
}