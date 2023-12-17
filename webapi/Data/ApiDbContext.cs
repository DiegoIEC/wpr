using Microsoft.EntityFrameworkCore;
using DemoApp.Models;

namespace DemoApp.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
            : base(options)
        {
        }

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Deskundige> Deskundigen { get; set; }
        public DbSet<Beperking> Beperkingen { get; set; }  // Add this if not already present
        public DbSet<DeskundigeBeperking> DeskundigeBeperkingen { get; set; } // Add this for the associative entity

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the many-to-many relationship
            modelBuilder.Entity<DeskundigeBeperking>()
                .HasKey(db => new { db.DeskundigeId, db.BeperkingId });

            modelBuilder.Entity<DeskundigeBeperking>()
                .HasOne(db => db.Deskundige)
                .WithMany(d => d.DeskundigeBeperkingen)
                .HasForeignKey(db => db.DeskundigeId);

            modelBuilder.Entity<DeskundigeBeperking>()
                .HasOne(db => db.Beperking)
                .WithMany(b => b.DeskundigeBeperkingen)
                .HasForeignKey(db => db.BeperkingId);
        }
    }
}