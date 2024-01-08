using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class deskundigemigration5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_Onderzoek_OnderzoekId",
                table: "Deelnames");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Onderzoek",
                table: "Onderzoek");

            migrationBuilder.RenameTable(
                name: "Onderzoek",
                newName: "Onderzoeken");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Onderzoeken",
                table: "Onderzoeken",
                column: "OnderzoekId");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SenderId = table.Column<int>(type: "integer", nullable: false),
                    ReceiverId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_Messages_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Organisaties",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Naam = table.Column<string>(type: "text", nullable: false),
                    Locatie = table.Column<string>(type: "text", nullable: false),
                    Website = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisaties", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Organisaties_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stichtingen",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stichtingen", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Stichtingen_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_Onderzoeken_OnderzoekId",
                table: "Deelnames",
                column: "OnderzoekId",
                principalTable: "Onderzoeken",
                principalColumn: "OnderzoekId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_Onderzoeken_OnderzoekId",
                table: "Deelnames");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Organisaties");

            migrationBuilder.DropTable(
                name: "Stichtingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Onderzoeken",
                table: "Onderzoeken");

            migrationBuilder.RenameTable(
                name: "Onderzoeken",
                newName: "Onderzoek");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Onderzoek",
                table: "Onderzoek",
                column: "OnderzoekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_Onderzoek_OnderzoekId",
                table: "Deelnames",
                column: "OnderzoekId",
                principalTable: "Onderzoek",
                principalColumn: "OnderzoekId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
