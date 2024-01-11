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

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessages()
        {
            return await _context.Messages
                .Select(m => new MessageDTO
                {
                    MessageId = m.MessageId,
                    Content = m.Content,
                    Timestamp = m.Timestamp,
                    SenderId = m.SenderId,
                    ReceiverId = m.ReceiverId
                })
                .ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MessageDTO>> GetMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

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

        // POST: api/Messages
        [HttpPost]
        public async Task<ActionResult<MessageDTO>> PostMessage(MessageDTO messageDTO)
        {
            var message = new Message
            {
                Content = messageDTO.Content,
                Timestamp = messageDTO.Timestamp,
                SenderId = messageDTO.SenderId,
                ReceiverId = messageDTO.ReceiverId
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessage), new { id = message.MessageId }, messageDTO);
        }

        // PUT: api/Messages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, MessageDTO messageDTO)
        {
            if (id != messageDTO.MessageId)
            {
                return BadRequest();
            }

            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            message.Content = messageDTO.Content;
            message.Timestamp = messageDTO.Timestamp;
            message.SenderId = messageDTO.SenderId;
            message.ReceiverId = messageDTO.ReceiverId;

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(int id)
        {
            return _context.Messages.Any(m => m.MessageId == id);
        }
    }
}
