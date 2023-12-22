using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class deskundigemigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeskundigeBeperkingen_Deskundigen_DeskundigeId",
                table: "DeskundigeBeperkingen");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Deskundigen",
                table: "Deskundigen");

            migrationBuilder.RenameTable(
                name: "Deskundigen",
                newName: "User");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "User",
                newName: "UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Postcode",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Naam",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Leeftijd",
                table: "User",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Beschikbaarheid",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "BenaderingVoorkeur",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "BenaderingCommercieel",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Aandoening",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "User",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "User",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "UserId");

            migrationBuilder.CreateTable(
                name: "Onderzoek",
                columns: table => new
                {
                    OnderzoekId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Titel = table.Column<string>(type: "text", nullable: false),
                    Beloning = table.Column<double>(type: "double precision", nullable: false),
                    Locatie = table.Column<string>(type: "text", nullable: false),
                    Startdatum = table.Column<char>(type: "character(1)", nullable: false),
                    Einddatum = table.Column<char>(type: "character(1)", nullable: false),
                    Attribute = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Onderzoek", x => x.OnderzoekId);
                });

            migrationBuilder.CreateTable(
                name: "Deelname",
                columns: table => new
                {
                    DeskundigeId = table.Column<int>(type: "integer", nullable: false),
                    OnderzoekId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deelname", x => new { x.DeskundigeId, x.OnderzoekId });
                    table.ForeignKey(
                        name: "FK_Deelname_Onderzoek_OnderzoekId",
                        column: x => x.OnderzoekId,
                        principalTable: "Onderzoek",
                        principalColumn: "OnderzoekId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Deelname_User_DeskundigeId",
                        column: x => x.DeskundigeId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deelname_OnderzoekId",
                table: "Deelname",
                column: "OnderzoekId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeskundigeBeperkingen_User_DeskundigeId",
                table: "DeskundigeBeperkingen",
                column: "DeskundigeId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeskundigeBeperkingen_User_DeskundigeId",
                table: "DeskundigeBeperkingen");

            migrationBuilder.DropTable(
                name: "Deelname");

            migrationBuilder.DropTable(
                name: "Onderzoek");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_Email",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Deskundigen");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Deskundigen",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Postcode",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naam",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Leeftijd",
                table: "Deskundigen",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Beschikbaarheid",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BenaderingVoorkeur",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BenaderingCommercieel",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Aandoening",
                table: "Deskundigen",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deskundigen",
                table: "Deskundigen",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DeskundigeBeperkingen_Deskundigen_DeskundigeId",
                table: "DeskundigeBeperkingen",
                column: "DeskundigeId",
                principalTable: "Deskundigen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
