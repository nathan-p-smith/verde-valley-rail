using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VerdeValleyRail.Data.Entities;

public partial class VerdeValleyRailContext : DbContext
{
    private string _connectionString;

    public VerdeValleyRailContext()
    {
    }

    public VerdeValleyRailContext(DbContextOptions<VerdeValleyRailContext> options)
        : base(options)
    {
    }

    public VerdeValleyRailContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<BookingSeat> BookingSeats { get; set; }

    public virtual DbSet<Car> Cars { get; set; }

    public virtual DbSet<CarType> CarTypes { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Engine> Engines { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<InvoiceBooking> InvoiceBookings { get; set; }

    public virtual DbSet<Route> Routes { get; set; }

    public virtual DbSet<Seat> Seats { get; set; }

    public virtual DbSet<Station> Stations { get; set; }

    public virtual DbSet<Train> Trains { get; set; }

    public virtual DbSet<TrainCar> TrainCars { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql(_connectionString, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.33-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.AddressId).HasName("PRIMARY");

            entity.ToTable("Address");

            entity.Property(e => e.Address1)
                .HasMaxLength(100)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Address2)
                .HasMaxLength(100)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Lat).HasPrecision(20, 14);
            entity.Property(e => e.Lng).HasPrecision(20, 14);
            entity.Property(e => e.State)
                .HasMaxLength(2)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Zipcode)
                .HasMaxLength(10)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PRIMARY");

            entity.ToTable("Booking");

            entity.HasIndex(e => e.CustomerId, "FK_Customer_idx");

            entity.HasIndex(e => e.TripId, "FK_Trip_idx");

            entity.Property(e => e.BookingGuid)
                .HasMaxLength(36);                

            entity.HasOne(d => d.Customer).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Booking_Customer");

            entity.HasOne(d => d.Trip).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.TripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Booking_Trip");
        });

        modelBuilder.Entity<BookingSeat>(entity =>
        {
            entity.HasKey(e => e.BookingSeatId).HasName("PRIMARY");

            entity.ToTable("BookingSeat");

            entity.HasIndex(e => e.BookingId, "FK_BookingId_idx");

            entity.HasIndex(e => e.CarId, "FK_BookingSeat_Car_idx");

            entity.HasIndex(e => e.SeatId, "FK_Seat_idx");

            entity.HasOne(d => d.Booking).WithMany(p => p.BookingSeats)
                .HasForeignKey(d => d.BookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookingSeat_Booking");

            entity.HasOne(d => d.Car).WithMany(p => p.BookingSeats)
                .HasForeignKey(d => d.CarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookingSeat_Car");

            entity.HasOne(d => d.Seat).WithMany(p => p.BookingSeats)
                .HasForeignKey(d => d.SeatId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BookingSeat_Seat");
        });

        modelBuilder.Entity<Car>(entity =>
        {
            entity.HasKey(e => e.CarId).HasName("PRIMARY");

            entity.ToTable("Car");

            entity.HasIndex(e => e.CarTypeId, "FK_CarType_idx");

            entity.HasOne(d => d.CarType).WithMany(p => p.Cars)
                .HasForeignKey(d => d.CarTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Car_CarType");
        });

        modelBuilder.Entity<CarType>(entity =>
        {
            entity.HasKey(e => e.CarTypeId).HasName("PRIMARY");

            entity.ToTable("CarType");

            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PRIMARY");

            entity.ToTable("Customer");

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(60)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.PasswordSalt).HasMaxLength(29);
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Engine>(entity =>
        {
            entity.HasKey(e => e.EngineId).HasName("PRIMARY");

            entity.ToTable("Engine");

            entity.Property(e => e.ModelNumber)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.InvoiceId).HasName("PRIMARY");

            entity.ToTable("Invoice");

            entity.HasIndex(e => e.CustomerId, "FK_CustomerId_idx");

            entity.Property(e => e.CreatedOn).HasColumnType("datetime");
            entity.Property(e => e.Guid).HasMaxLength(36);
        });

        modelBuilder.Entity<InvoiceBooking>(entity =>
        {
            entity.HasKey(e => e.InvoiceBookingId).HasName("PRIMARY");

            entity.ToTable("InvoiceBooking");

            entity.HasIndex(e => e.BookingId, "FK_BookingId_idx");

            entity.HasIndex(e => e.InvoiceId, "FK_InvoiceId_idx");

            entity.HasOne(d => d.Invoice).WithMany(p => p.InvoiceBookings)
                .HasForeignKey(d => d.InvoiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InvoiceBooking_Invoice");
        });

        modelBuilder.Entity<Route>(entity =>
        {
            entity.HasKey(e => e.RouteId).HasName("PRIMARY");

            entity.ToTable("Route");

            entity.HasIndex(e => e.EndStationId, "FK_Route_EndStation");

            entity.HasIndex(e => new { e.StartStationId, e.EndStationId }, "FK_Route_StartStation");

            entity.HasOne(d => d.EndStation).WithMany(p => p.RouteEndStations)
                .HasForeignKey(d => d.EndStationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Route_EndStation");

            entity.HasOne(d => d.StartStation).WithMany(p => p.RouteStartStations)
                .HasForeignKey(d => d.StartStationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Route_StartStation");
        });

        modelBuilder.Entity<Seat>(entity =>
        {
            entity.HasKey(e => e.SeatId).HasName("PRIMARY");

            entity.ToTable("Seat");

            entity.HasIndex(e => e.CarTypeId, "FK_CarType_idx");

            entity.Property(e => e.Position)
                .HasMaxLength(1)
                .IsFixedLength();

            entity.HasOne(d => d.CarType).WithMany(p => p.Seats)
                .HasForeignKey(d => d.CarTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Seat_CarType");
        });

        modelBuilder.Entity<Station>(entity =>
        {
            entity.HasKey(e => e.StationId).HasName("PRIMARY");

            entity.ToTable("Station");

            entity.HasIndex(e => e.AddressId, "FK_Address_idx");

            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.Address).WithMany(p => p.Stations)
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Station_Address");
        });

        modelBuilder.Entity<Train>(entity =>
        {
            entity.HasKey(e => e.TrainId).HasName("PRIMARY");

            entity.ToTable("Train");

            entity.HasIndex(e => e.EngineId, "FK_Train_Engine_idx");

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .UseCollation("utf8mb3_general_ci")
                .HasCharSet("utf8mb3");

            entity.HasOne(d => d.Engine).WithMany(p => p.Trains)
                .HasForeignKey(d => d.EngineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Train_Engine");
        });

        modelBuilder.Entity<TrainCar>(entity =>
        {
            entity.HasKey(e => e.TrainCarId).HasName("PRIMARY");

            entity.ToTable("TrainCar");

            entity.HasIndex(e => e.CarId, "FK_TrainCar_Car_idx");

            entity.HasIndex(e => e.TrainId, "FK_TrainCar_Train_idx");

            entity.HasIndex(e => new { e.TrainId, e.CarId }, "UQ_TrainId_CarId").IsUnique();

            entity.HasOne(d => d.Car).WithMany(p => p.TrainCars)
                .HasForeignKey(d => d.CarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TrainCar_Car");

            entity.HasOne(d => d.Train).WithMany(p => p.TrainCars)
                .HasForeignKey(d => d.TrainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TrainCar_Train");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.TripId).HasName("PRIMARY");

            entity.ToTable("Trip");

            entity.HasIndex(e => e.RouteId, "FK_Trip_Route_idx");

            entity.HasIndex(e => e.TrainId, "FK_Trip_Train_idx");

            entity.Property(e => e.Departure).HasColumnType("datetime");
            entity.Property(e => e.PricePerSeat).HasPrecision(10, 2);

            entity.HasOne(d => d.Route).WithMany(p => p.Trips)
                .HasForeignKey(d => d.RouteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Trip_Route");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
