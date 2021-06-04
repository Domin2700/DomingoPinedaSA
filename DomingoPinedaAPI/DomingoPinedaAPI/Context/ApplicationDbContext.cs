using DomingoPinedaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomingoPinedaAPI.Context
{ }
    public class ApplicationDbContext : DbContext
    {

      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
      {

      }

      //Modulo Usuario
      public DbSet<Cliente> Cliente { get; set; }
      public DbSet<Provincia> Provincia { get; set; }
      public DbSet<Direccion> Direccion { get; set; }
    }
}
