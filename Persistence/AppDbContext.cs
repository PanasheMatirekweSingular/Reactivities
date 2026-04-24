using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.ActivityId, a.UserId }));

        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.User)
            .WithMany(u => u.Activities)
            .HasForeignKey(a => a.UserId);

        builder.Entity<ActivityAttendee>()
        .HasOne(a => a.Activity)
        .WithMany(a => a.Attendees)
        .HasForeignKey(a => a.ActivityId);
    }
}
    