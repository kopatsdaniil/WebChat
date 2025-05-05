using backend.Mappers;
using backend.Services;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController(UserService userService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await userService.GetAllAsync();
        
        if (users is null) return BadRequest();
        
        return Ok(users.Select(u => u.ToDto()));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await userService.GetByIdAsync(id);
        
        if (user is null) return BadRequest();
        
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRequest request)
    {
        try
        {
            var isAuthorized = await userService.Login(request.Username, request.Password);
            
            if(!isAuthorized)
                return BadRequest();
        
            return Ok();
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(500, $"{ex} Invalid username or password");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRequest request)
    {
        try
        {
            var user = await userService.Register(request.Username, request.Password);
            
            return Ok(user.ToDto());
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"{ex} User is already registered");
        }
    }

    [HttpPut("update/{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UserRequest request)
    {
        var user = await userService.UpdateAsync(id, request.Username, request.Password);
        
        if(user is null) return BadRequest();
        
        return Ok(user.ToDto());
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var user = await userService.DeleteAsync(id);
        
        if(user is null) return BadRequest();
        
        return Ok(user.ToDto());
    }
}