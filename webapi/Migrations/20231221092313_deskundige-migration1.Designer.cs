﻿// <auto-generated />
using DemoApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20231221092313_deskundige-migration1")]
    partial class deskundigemigration1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Beperking", b =>
                {
                    b.Property<int>("BeperkingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("BeperkingId"));

                    b.Property<string>("Naam")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("BeperkingId");

                    b.ToTable("Beperkingen");
                });

            modelBuilder.Entity("DemoApp.Models.Deskundige", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Aandoening")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("BenaderingCommercieel")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("BenaderingVoorkeur")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Beschikbaarheid")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Leeftijd")
                        .HasColumnType("integer");

                    b.Property<string>("Naam")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Postcode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Deskundigen");
                });

            modelBuilder.Entity("DemoApp.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DriverNumber")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("DeskundigeBeperking", b =>
                {
                    b.Property<int>("DeskundigeId")
                        .HasColumnType("integer");

                    b.Property<int>("BeperkingId")
                        .HasColumnType("integer");

                    b.HasKey("DeskundigeId", "BeperkingId");

                    b.HasIndex("BeperkingId");

                    b.ToTable("DeskundigeBeperkingen");
                });

            modelBuilder.Entity("DeskundigeBeperking", b =>
                {
                    b.HasOne("Beperking", "Beperking")
                        .WithMany("DeskundigeBeperkingen")
                        .HasForeignKey("BeperkingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DemoApp.Models.Deskundige", "Deskundige")
                        .WithMany("DeskundigeBeperkingen")
                        .HasForeignKey("DeskundigeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Beperking");

                    b.Navigation("Deskundige");
                });

            modelBuilder.Entity("Beperking", b =>
                {
                    b.Navigation("DeskundigeBeperkingen");
                });

            modelBuilder.Entity("DemoApp.Models.Deskundige", b =>
                {
                    b.Navigation("DeskundigeBeperkingen");
                });
#pragma warning restore 612, 618
        }
    }
}
