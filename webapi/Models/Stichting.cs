namespace DemoApp.Models
{
    public class Stichting : User
    {
        // Attributes for Stichting will be defined here

        public Stichting(string email, string password, string role) 
            : base(email, password, role)
        {
            // Initialize properties specific to Stichting
        }

        // Additional properties and methods specific to Stichting
    }
}