using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class finalmigration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Verzorgers_DeskundigeID",
                table: "Verzorgers");

            migrationBuilder.CreateIndex(
                name: "IX_Verzorgers_DeskundigeID",
                table: "Verzorgers",
                column: "DeskundigeID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Verzorgers_DeskundigeID",
                table: "Verzorgers");

            migrationBuilder.CreateIndex(
                name: "IX_Verzorgers_DeskundigeID",
                table: "Verzorgers",
                column: "DeskundigeID");
        }
    }
}
