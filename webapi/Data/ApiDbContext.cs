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
        public DbSet<Beperking> Beperkingen { get; set; } 
        public DbSet<User> Users { get; set; } 
        public DbSet<DeskundigeBeperking> DeskundigeBeperkingen { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);
            
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);
            
            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(255);
            
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .IsRequired()
                .HasMaxLength(20);

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

            // Configuration for Deelname
            modelBuilder.Entity<Deelname>()
                .HasKey(d => new { d.DeskundigeId, d.OnderzoekId });

            modelBuilder.Entity<Deelname>()
                .HasOne(d => d.Deskundige)
                .WithMany(dk => dk.Deelnames)
                .HasForeignKey(d => d.DeskundigeId);

            modelBuilder.Entity<Deelname>()
                .HasOne(d => d.Onderzoek)
                .WithMany(o => o.Deelnames)
                .HasForeignKey(d => d.OnderzoekId);

    // Add configurations for Deskundige and Onderzoek as needed
        }
    }
}