using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Car",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SeatingCapacity = table.Column<int>(type: "int", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Car", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Flight",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturningDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DepartingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReturningTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartingCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartingCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CombinedDepLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CombinedDestination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReturnDepartingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReturnArrivingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flight", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Hotel",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Package = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    People = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rooms = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotel", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    zip_code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    latitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    longitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "restaurant",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Meals = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurant", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    DOB = table.Column<DateOnly>(type: "date", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CarBooking",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    carID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Pickup_Location_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Return_Location_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PickupDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rental_days = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarBooking", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CarBooking_Car_carID",
                        column: x => x.carID,
                        principalTable: "Car",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarBooking_Location_Pickup_Location_Id",
                        column: x => x.Pickup_Location_Id,
                        principalTable: "Location",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarBooking_Location_Return_Location_Id",
                        column: x => x.Return_Location_Id,
                        principalTable: "Location",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CarBooking_User_userID",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FlightBooking",
                columns: table => new
                {
                    FlightBookingID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FlightID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Adults = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kids = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightBooking", x => x.FlightBookingID);
                    table.ForeignKey(
                        name: "FK_FlightBooking_Flight_FlightID",
                        column: x => x.FlightID,
                        principalTable: "Flight",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FlightBooking_User_userID",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HotelBooking",
                columns: table => new
                {
                    HotelBookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HotelID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartingFromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelBooking", x => x.HotelBookingId);
                    table.ForeignKey(
                        name: "FK_HotelBooking_Hotel_HotelID",
                        column: x => x.HotelID,
                        principalTable: "Hotel",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HotelBooking_User_userID",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RestaurantBooking",
                columns: table => new
                {
                    RestaurantBookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RestaurantID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MealTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalPeople = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MealDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestaurantBooking", x => x.RestaurantBookingId);
                    table.ForeignKey(
                        name: "FK_RestaurantBooking_User_userID",
                        column: x => x.userID,
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RestaurantBooking_restaurant_RestaurantID",
                        column: x => x.RestaurantID,
                        principalTable: "restaurant",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarBooking_carID",
                table: "CarBooking",
                column: "carID");

            migrationBuilder.CreateIndex(
                name: "IX_CarBooking_Pickup_Location_Id",
                table: "CarBooking",
                column: "Pickup_Location_Id");

            migrationBuilder.CreateIndex(
                name: "IX_CarBooking_Return_Location_Id",
                table: "CarBooking",
                column: "Return_Location_Id");

            migrationBuilder.CreateIndex(
                name: "IX_CarBooking_userID",
                table: "CarBooking",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_FlightBooking_FlightID",
                table: "FlightBooking",
                column: "FlightID");

            migrationBuilder.CreateIndex(
                name: "IX_FlightBooking_userID",
                table: "FlightBooking",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_HotelBooking_HotelID",
                table: "HotelBooking",
                column: "HotelID");

            migrationBuilder.CreateIndex(
                name: "IX_HotelBooking_userID",
                table: "HotelBooking",
                column: "userID");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBooking_RestaurantID",
                table: "RestaurantBooking",
                column: "RestaurantID");

            migrationBuilder.CreateIndex(
                name: "IX_RestaurantBooking_userID",
                table: "RestaurantBooking",
                column: "userID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarBooking");

            migrationBuilder.DropTable(
                name: "FlightBooking");

            migrationBuilder.DropTable(
                name: "HotelBooking");

            migrationBuilder.DropTable(
                name: "RestaurantBooking");

            migrationBuilder.DropTable(
                name: "Car");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropTable(
                name: "Flight");

            migrationBuilder.DropTable(
                name: "Hotel");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "restaurant");
        }
    }
}
