using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Configurations;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.ToTable("Messages");
        
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Id)
            .IsRequired();
        
        builder.Property(x => x.Text)
            .HasColumnType("nvarchar(2048)")
            .IsRequired();
        
        builder.Property(x => x.Date)
            .HasColumnType("smalldatetime")
            .IsRequired();
        
        builder.HasOne(x => x.Sender)
            .WithMany(x => x.Messages)
            .OnDelete(DeleteBehavior.Cascade);
    }
}