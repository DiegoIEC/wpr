// Add this class in DemoApp.DTOs namespace
namespace DemoApp.Models
{
    public class MessageDTO
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
    }
}
