using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddHotelBookingExtraFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartingFromDate",
                table: "HotelBooking",
                newName: "Checkoutdate");

            migrationBuilder.RenameColumn(
                name: "EndingDate",
                table: "HotelBooking",
                newName: "Checkindate");

            migrationBuilder.AddColumn<string>(
                name: "bookingStatus",
                table: "HotelBooking",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "noofPeople",
                table: "HotelBooking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "roomType",
                table: "HotelBooking",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bookingStatus",
                table: "HotelBooking");

            migrationBuilder.DropColumn(
                name: "noofPeople",
                table: "HotelBooking");

            migrationBuilder.DropColumn(
                name: "roomType",
                table: "HotelBooking");

            migrationBuilder.RenameColumn(
                name: "Checkoutdate",
                table: "HotelBooking",
                newName: "StartingFromDate");

            migrationBuilder.RenameColumn(
                name: "Checkindate",
                table: "HotelBooking",
                newName: "EndingDate");
        }
    }
}
