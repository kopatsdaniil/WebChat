using backend.Mappers;
using backend.Services;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/messages")]
public class MessageController(MessageService messageService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var messages = await messageService.GetAllAsync();
        
        if (messages == null) return BadRequest();
        
        return Ok(messages.Select(m => m.ToDto()));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var message = await messageService.GetByIdAsync(id);
        
        if (message == null) return BadRequest();
        
        return Ok(message.ToDto());
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddMessage([FromBody] MessageRequest request)
    {
        var message = await messageService.CreateAsync(request.Text, DateTime.Now, request.SenderId);
        
        return Ok(message.ToDto());
    }

    [HttpPut("update/{id:guid}")]
    public async Task<IActionResult> UpdateMessage(Guid id, [FromBody] UpdateMessageRequest request)
    {
        var message = await messageService.UpdateAsync(id, request.Text);
        
        if (message == null) return BadRequest();
        
        return Ok(message.ToDto());
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> DeleteMessage(Guid id)
    {
        var message = await messageService.DeleteAsync(id);
        
        if (message == null) return BadRequest();
        
        return Ok(message.ToDto());
    }
}