using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class finalmigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attribute",
                table: "Onderzoeken");

            migrationBuilder.Sql(
                @"ALTER TABLE ""Onderzoeken"" 
                ALTER COLUMN ""Startdatum"" TYPE timestamp with time zone 
                USING ""Startdatum""::timestamp with time zone;");

            migrationBuilder.Sql(
                @"ALTER TABLE ""Onderzoeken"" 
                ALTER COLUMN ""Einddatum"" TYPE timestamp with time zone 
                USING ""Einddatum""::timestamp with time zone;");

            migrationBuilder.AddColumn<List<int>>(
                name: "BeperkingenIds",
                table: "Onderzoeken",
                type: "integer[]",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BeperkingenIds",
                table: "Onderzoeken");

            migrationBuilder.AlterColumn<char>(
                name: "Startdatum",
                table: "Onderzoeken",
                type: "character(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<char>(
                name: "Einddatum",
                table: "Onderzoeken",
                type: "character(1)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<string>(
                name: "Attribute",
                table: "Onderzoeken",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
