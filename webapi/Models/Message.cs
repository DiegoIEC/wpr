namespace DemoApp.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }

        // Foreign keys and navigation properties for User
        public int SenderId { get; set; }
        public User Sender { get; set; }

        public int ReceiverId { get; set; }
        public User Receiver { get; set; }
    }
}