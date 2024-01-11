using Microsoft.AspNetCore.Mvc;
using DemoApp.Models; // Import the DTO namespace
using DemoApp.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public MessagesController(ApiDbContext context)
        {
            _context = context;
        }

        // Other methods...

        // POST: api/Onderzoek/Messages
        [HttpPost("Messages")]
        public async Task<ActionResult<MessageDTO>> PostMessage(MessageDTO messageDTO)
        {
            // Create a new Message entity using the DTO
            var message = new Message
            {
                Content = messageDTO.Content,
                Timestamp = messageDTO.Timestamp,
                SenderId = messageDTO.SenderId,
                ReceiverId = messageDTO.ReceiverId
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Return the created MessageDTO
            return CreatedAtAction(nameof(GetMessage), new { id = message.MessageId }, messageDTO);
        }

        // Other methods...

        // Helper method to get a Message by ID
        private async Task<MessageDTO> GetMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return null;
            }

            // Convert the Message entity to MessageDTO
            var messageDTO = new MessageDTO
            {
                MessageId = message.MessageId,
                Content = message.Content,
                Timestamp = message.Timestamp,
                SenderId = message.SenderId,
                ReceiverId = message.ReceiverId
            };

            return messageDTO;
        }
    }
}
