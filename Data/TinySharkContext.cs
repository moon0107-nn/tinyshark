using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TinyShark.Models;

namespace TinyShark.Data
{
    public class TinySharkContext : DbContext
    {
        public TinySharkContext (DbContextOptions<TinySharkContext> options)
            : base(options)
        {
        }

        public DbSet<TinyShark.Models.Transaction> Transaction { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(18,2)");
        }
    }
}
