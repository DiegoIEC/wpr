﻿// <auto-generated />
using System;
using System.Collections.Generic;
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
    [Migration("20240109131616_auto-migration")]
    partial class automigration
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

            modelBuilder.Entity("Deelname", b =>
                {
                    b.Property<int>("DeskundigeId")
                        .HasColumnType("integer");

                    b.Property<int>("OnderzoekId")
                        .HasColumnType("integer");

                    b.Property<int>("status")
                        .HasColumnType("integer");

                    b.HasKey("DeskundigeId", "OnderzoekId");

                    b.HasIndex("OnderzoekId");

                    b.ToTable("Deelnames");
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

                    b.Property<int>("test")
                        .HasColumnType("integer");

                    b.Property<int>("test2")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("DemoApp.Models.Message", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MessageId"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ReceiverId")
                        .HasColumnType("integer");

                    b.Property<int>("SenderId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("MessageId");

                    b.HasIndex("ReceiverId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("DemoApp.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("UserId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("DemoApp.Models.Verzorger", b =>
                {
                    b.Property<int>("VerzorgerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("VerzorgerID"));

                    b.Property<int>("DeskundigeID")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Naam")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Postcode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("VerzorgerID");

                    b.HasIndex("DeskundigeID")
                        .IsUnique();

                    b.ToTable("Verzorgers");
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

            modelBuilder.Entity("Onderzoek", b =>
                {
                    b.Property<int>("OnderzoekId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("OnderzoekId"));

                    b.Property<double>("Beloning")
                        .HasColumnType("double precision");

                    b.Property<List<int>>("BeperkingenIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("Beschrijving")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Einddatum")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("KorteBeschrijving")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Locatie")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Soort")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Startdatum")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Titel")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("OnderzoekId");

                    b.ToTable("Onderzoeken", (string)null);
                });

            modelBuilder.Entity("DemoApp.Models.Deskundige", b =>
                {
                    b.HasBaseType("DemoApp.Models.User");

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

                    b.Property<int>("Leeftijd")
                        .HasColumnType("integer");

                    b.Property<string>("Naam")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Postcode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("Deskundigen", (string)null);
                });

            modelBuilder.Entity("DemoApp.Models.Organisatie", b =>
                {
                    b.HasBaseType("DemoApp.Models.User");

                    b.Property<string>("Locatie")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Naam")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Website")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("Organisaties");
                });

            modelBuilder.Entity("DemoApp.Models.Stichting", b =>
                {
                    b.HasBaseType("DemoApp.Models.User");

                    b.ToTable("Stichtingen");
                });

            modelBuilder.Entity("Deelname", b =>
                {
                    b.HasOne("DemoApp.Models.Deskundige", null)
                        .WithMany("Deelnames")
                        .HasForeignKey("DeskundigeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Onderzoek", "Onderzoek")
                        .WithMany("Deelnames")
                        .HasForeignKey("OnderzoekId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Onderzoek");
                });

            modelBuilder.Entity("DemoApp.Models.Message", b =>
                {
                    b.HasOne("DemoApp.Models.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DemoApp.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Receiver");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("DemoApp.Models.Verzorger", b =>
                {
                    b.HasOne("DemoApp.Models.Deskundige", "Deskundige")
                        .WithOne()
                        .HasForeignKey("DemoApp.Models.Verzorger", "DeskundigeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deskundige");
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

            modelBuilder.Entity("DemoApp.Models.Deskundige", b =>
                {
                    b.HasOne("DemoApp.Models.User", null)
                        .WithOne()
                        .HasForeignKey("DemoApp.Models.Deskundige", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DemoApp.Models.Organisatie", b =>
                {
                    b.HasOne("DemoApp.Models.User", null)
                        .WithOne()
                        .HasForeignKey("DemoApp.Models.Organisatie", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("DemoApp.Models.Stichting", b =>
                {
                    b.HasOne("DemoApp.Models.User", null)
                        .WithOne()
                        .HasForeignKey("DemoApp.Models.Stichting", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Beperking", b =>
                {
                    b.Navigation("DeskundigeBeperkingen");
                });

            modelBuilder.Entity("Onderzoek", b =>
                {
                    b.Navigation("Deelnames");
                });

            modelBuilder.Entity("DemoApp.Models.Deskundige", b =>
                {
                    b.Navigation("Deelnames");

                    b.Navigation("DeskundigeBeperkingen");
                });
#pragma warning restore 612, 618
        }
    }
}
