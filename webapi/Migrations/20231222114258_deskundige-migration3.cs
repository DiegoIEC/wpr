using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class deskundigemigration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deelname_Onderzoek_OnderzoekId",
                table: "Deelname");

            migrationBuilder.DropForeignKey(
                name: "FK_Deelname_User_DeskundigeId",
                table: "Deelname");

            migrationBuilder.DropForeignKey(
                name: "FK_DeskundigeBeperkingen_User_DeskundigeId",
                table: "DeskundigeBeperkingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Deelname",
                table: "Deelname");

            migrationBuilder.DropColumn(
                name: "Aandoening",
                table: "User");

            migrationBuilder.DropColumn(
                name: "BenaderingCommercieel",
                table: "User");

            migrationBuilder.DropColumn(
                name: "BenaderingVoorkeur",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Beschikbaarheid",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Leeftijd",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Naam",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Postcode",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Deelname",
                newName: "Deelnames");

            migrationBuilder.RenameIndex(
                name: "IX_User_Email",
                table: "Users",
                newName: "IX_Users_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Deelname_OnderzoekId",
                table: "Deelnames",
                newName: "IX_Deelnames_OnderzoekId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deelnames",
                table: "Deelnames",
                columns: new[] { "DeskundigeId", "OnderzoekId" });

            migrationBuilder.CreateTable(
                name: "Deskundigen",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Postcode = table.Column<string>(type: "text", nullable: false),
                    Naam = table.Column<string>(type: "text", nullable: false),
                    Leeftijd = table.Column<int>(type: "integer", nullable: false),
                    Beschikbaarheid = table.Column<string>(type: "text", nullable: false),
                    BenaderingVoorkeur = table.Column<string>(type: "text", nullable: false),
                    BenaderingCommercieel = table.Column<string>(type: "text", nullable: false),
                    Aandoening = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deskundigen", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Deskundigen_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_Deskundigen_DeskundigeId",
                table: "Deelnames",
                column: "DeskundigeId",
                principalTable: "Deskundigen",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_Onderzoek_OnderzoekId",
                table: "Deelnames",
                column: "OnderzoekId",
                principalTable: "Onderzoek",
                principalColumn: "OnderzoekId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeskundigeBeperkingen_Deskundigen_DeskundigeId",
                table: "DeskundigeBeperkingen",
                column: "DeskundigeId",
                principalTable: "Deskundigen",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_Deskundigen_DeskundigeId",
                table: "Deelnames");

            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_Onderzoek_OnderzoekId",
                table: "Deelnames");

            migrationBuilder.DropForeignKey(
                name: "FK_DeskundigeBeperkingen_Deskundigen_DeskundigeId",
                table: "DeskundigeBeperkingen");

            migrationBuilder.DropTable(
                name: "Deskundigen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Deelnames",
                table: "Deelnames");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "Deelnames",
                newName: "Deelname");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Email",
                table: "User",
                newName: "IX_User_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Deelnames_OnderzoekId",
                table: "Deelname",
                newName: "IX_Deelname_OnderzoekId");

            migrationBuilder.AddColumn<string>(
                name: "Aandoening",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BenaderingCommercieel",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BenaderingVoorkeur",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Beschikbaarheid",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "User",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Leeftijd",
                table: "User",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Naam",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Postcode",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deelname",
                table: "Deelname",
                columns: new[] { "DeskundigeId", "OnderzoekId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Deelname_Onderzoek_OnderzoekId",
                table: "Deelname",
                column: "OnderzoekId",
                principalTable: "Onderzoek",
                principalColumn: "OnderzoekId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Deelname_User_DeskundigeId",
                table: "Deelname",
                column: "DeskundigeId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeskundigeBeperkingen_User_DeskundigeId",
                table: "DeskundigeBeperkingen",
                column: "DeskundigeId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
