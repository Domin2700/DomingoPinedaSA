using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomingoPinedaAPI.Models
{
  public class Cliente
  {
    [Key]
    public int? IdCliente { get; set; }
    [Required, MaxLength(50)]
    public string Nombres { get; set; }
    [Required, MaxLength(50)]
    public string Apellidos { get; set; }
    [Required, MaxLength(11)]
    public string Cedula { get; set; }
    public bool Enable { get; set; }
  }
}
