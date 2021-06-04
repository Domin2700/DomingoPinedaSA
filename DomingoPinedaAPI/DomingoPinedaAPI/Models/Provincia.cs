using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomingoPinedaAPI.Models
{
  public class Provincia
  {
    [Key]
    public int IdProvincia { get; set; }

    public string Nombre { get; set; }
    public bool Enable { get; set; }
  }
}
