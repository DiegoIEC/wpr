using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class deskundigemigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beperkingen",
                columns: table => new
                {
                    BeperkingId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Naam = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beperkingen", x => x.BeperkingId);
                });

            migrationBuilder.CreateTable(
                name: "Deskundigen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Postcode = table.Column<string>(type: "text", nullable: false),
                    Naam = table.Column<string>(type: "text", nullable: false),
                    Leeftijd = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Beschikbaarheid = table.Column<string>(type: "text", nullable: false),
                    BenaderingVoorkeur = table.Column<string>(type: "text", nullable: false),
                    BenaderingCommercieel = table.Column<string>(type: "text", nullable: false),
                    Aandoening = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deskundigen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeskundigeBeperkingen",
                columns: table => new
                {
                    DeskundigeId = table.Column<int>(type: "integer", nullable: false),
                    BeperkingId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeskundigeBeperkingen", x => new { x.DeskundigeId, x.BeperkingId });
                    table.ForeignKey(
                        name: "FK_DeskundigeBeperkingen_Beperkingen_BeperkingId",
                        column: x => x.BeperkingId,
                        principalTable: "Beperkingen",
                        principalColumn: "BeperkingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeskundigeBeperkingen_Deskundigen_DeskundigeId",
                        column: x => x.DeskundigeId,
                        principalTable: "Deskundigen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeskundigeBeperkingen_BeperkingId",
                table: "DeskundigeBeperkingen",
                column: "BeperkingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeskundigeBeperkingen");

            migrationBuilder.DropTable(
                name: "Beperkingen");

            migrationBuilder.DropTable(
                name: "Deskundigen");
        }
    }
}
