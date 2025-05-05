using backend.Contracts;
using backend.Models;

namespace backend.Mappers;

public static class MessageMapper
{
    public static MessageDto ToDto(this Message message)
    {
        return new MessageDto
        {
            Id = message.Id,
            Date = message.Date,
            Text = message.Text,
            SenderId = message.SenderId
        };
    }
}