using backend.Contracts;
using backend.Models;

namespace backend.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username
        };
    }
}