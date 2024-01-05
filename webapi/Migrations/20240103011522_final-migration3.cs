using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class finalmigration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Beschrijving",
                table: "Onderzoeken",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "KorteBeschrijving",
                table: "Onderzoeken",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Soort",
                table: "Onderzoeken",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "Deelnames",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Beschrijving",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "KorteBeschrijving",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "Soort",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Deelnames");
        }
    }
}
