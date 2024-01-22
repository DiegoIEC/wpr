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
        public DbSet<User> Users { get; set; }
        public DbSet<Deelname> Deelnames { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<Deskundige> Deskundigen { get; set; }
        public DbSet<Beperking> Beperkingen { get; set; } 
        public DbSet<DeskundigeBeperking> DeskundigeBeperkingen { get; set; } 
        public DbSet<Message> Messages { get; set; }
        public DbSet<Organisatie> Organisaties {get; set; }
        public DbSet<Stichting> Stichtingen {get; set; }
        public DbSet<Onderzoek> Onderzoeken {get; set; }
        public DbSet<Verzorger> Verzorgers {get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>()
                .ToTable("Users")
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

             // Deskundige configuration
            modelBuilder.Entity<Deskundige>()
                .ToTable("Deskundigen");

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
            
            modelBuilder.Entity<Deelname>()
                .Ignore(d => d.Deskundige)
                .Ignore(d => d.Onderzoek);

            modelBuilder.Entity<Verzorger>()
                .HasOne(v => v.Deskundige)
                .WithOne()
                .HasForeignKey<Verzorger>(v => v.DeskundigeID);


            modelBuilder.Entity<Onderzoek>()
                .ToTable("Onderzoeken")
                .HasKey(o => o.OnderzoekId);


             modelBuilder.Entity<Onderzoek>()
                .HasMany(o => o.Deelnames)
                .WithOne(d => d.Onderzoek)
                .HasForeignKey(d => d.OnderzoekId);

    // Add configurations for Deskundige and Onderzoek as needed
        }
    }
}