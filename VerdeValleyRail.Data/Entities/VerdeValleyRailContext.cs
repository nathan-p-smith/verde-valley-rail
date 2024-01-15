using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VerdeValleyRail.Data.Entities
{
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

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<BookingSeat> BookingSeats { get; set; } = null!;
        public virtual DbSet<Car> Cars { get; set; } = null!;
        public virtual DbSet<CarType> CarTypes { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Engine> Engines { get; set; } = null!;
        public virtual DbSet<Invoice> Invoices { get; set; } = null!;
        public virtual DbSet<InvoiceBooking> InvoiceBookings { get; set; } = null!;
        public virtual DbSet<Route> Routes { get; set; } = null!;
        public virtual DbSet<Seat> Seats { get; set; } = null!;
        public virtual DbSet<Station> Stations { get; set; } = null!;
        public virtual DbSet<Train> Trains { get; set; } = null!;
        public virtual DbSet<TrainCar> TrainCars { get; set; } = null!;
        public virtual DbSet<Trip> Trips { get; set; } = null!;
        public virtual DbSet<VwBookingSeat> VwBookingSeats { get; set; } = null!;
        public virtual DbSet<VwTripSeat> VwTripSeats { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(_connectionString);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Address");

                entity.Property(e => e.Address1).HasMaxLength(100);

                entity.Property(e => e.Address2).HasMaxLength(100);

                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.Lat).HasColumnType("decimal(20, 14)");

                entity.Property(e => e.Lng).HasColumnType("decimal(20, 14)");

                entity.Property(e => e.State).HasMaxLength(2);

                entity.Property(e => e.Zipcode).HasMaxLength(10);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("Booking");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__Custome__04E4BC85");

                entity.HasOne(d => d.Trip)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.TripId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__TripId__05D8E0BE");
            });

            modelBuilder.Entity<BookingSeat>(entity =>
            {
                entity.ToTable("BookingSeat");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.BookingSeats)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BookingSe__Booki__22751F6C");

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.BookingSeats)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BookingSe__CarId__245D67DE");

                entity.HasOne(d => d.Seat)
                    .WithMany(p => p.BookingSeats)
                    .HasForeignKey(d => d.SeatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__BookingSe__SeatI__236943A5");
            });

            modelBuilder.Entity<Car>(entity =>
            {
                entity.ToTable("Car");

                entity.HasOne(d => d.CarType)
                    .WithMany(p => p.Cars)
                    .HasForeignKey(d => d.CarTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Car__CarTypeId__0D7A0286");
            });

            modelBuilder.Entity<CarType>(entity =>
            {
                entity.ToTable("CarType");

                entity.Property(e => e.Description).HasMaxLength(50);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.HasIndex(e => e.Email, "UQ_Email")
                    .IsUnique();

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PasswordHash).HasMaxLength(60);

                entity.Property(e => e.PasswordSalt).HasMaxLength(29);

                entity.Property(e => e.Phone).HasMaxLength(10);
            });

            modelBuilder.Entity<Engine>(entity =>
            {
                entity.ToTable("Engine");

                entity.Property(e => e.ModelNumber).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("Invoice");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Invoice__Custome__6E01572D");
            });

            modelBuilder.Entity<InvoiceBooking>(entity =>
            {
                entity.ToTable("InvoiceBooking");

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.InvoiceBookings)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__InvoiceBo__Booki__151B244E");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.InvoiceBookings)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__InvoiceBo__Invoi__14270015");
            });

            modelBuilder.Entity<Route>(entity =>
            {
                entity.ToTable("Route");

                entity.HasOne(d => d.EndStation)
                    .WithMany(p => p.RouteEndStations)
                    .HasForeignKey(d => d.EndStationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Route_EndStation");

                entity.HasOne(d => d.StartStation)
                    .WithMany(p => p.RouteStartStations)
                    .HasForeignKey(d => d.StartStationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Route_StartStation");
            });

            modelBuilder.Entity<Seat>(entity =>
            {
                entity.ToTable("Seat");

                entity.Property(e => e.Position)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.CarType)
                    .WithMany(p => p.Seats)
                    .HasForeignKey(d => d.CarTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seat__CarTypeId__74AE54BC");
            });

            modelBuilder.Entity<Station>(entity =>
            {
                entity.ToTable("Station");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Stations)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Station__Address__778AC167");
            });

            modelBuilder.Entity<Train>(entity =>
            {
                entity.ToTable("Train");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Engine)
                    .WithMany(p => p.Trains)
                    .HasForeignKey(d => d.EngineId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Train__EngineId__7A672E12");
            });

            modelBuilder.Entity<TrainCar>(entity =>
            {
                entity.ToTable("TrainCar");

                entity.HasIndex(e => new { e.TrainId, e.CarId }, "UQ_TrainId_CarId")
                    .IsUnique();

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.TrainCars)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TrainCar__CarId__1CBC4616");

                entity.HasOne(d => d.Train)
                    .WithMany(p => p.TrainCars)
                    .HasForeignKey(d => d.TrainId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TrainCar__TrainI__1BC821DD");
            });

            modelBuilder.Entity<Trip>(entity =>
            {
                entity.ToTable("Trip");

                entity.Property(e => e.Departure).HasColumnType("datetime");

                entity.Property(e => e.PricePerSeat)
                    .HasColumnType("decimal(5, 2)")
                    .HasColumnName("pricePerSeat");
            });

            modelBuilder.Entity<VwBookingSeat>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_BookingSeat");

                entity.Property(e => e.Position)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            modelBuilder.Entity<VwTripSeat>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("vw_TripSeat");

                entity.Property(e => e.Position)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
