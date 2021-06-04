using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DomingoPinedaAPI.Models
{
  public class Direccion
  {
    [Key]
    public int? IdDireccion { get; set; }
    [Required,MaxLength(50)]
    public string Calle { get; set; }
    [Required, MaxLength(50)]
    public string Sector { get; set; }

    public string Municipio { get; set; }
    [Required]
    public int IdProvincia { get; set; }
    [Required]
    public int IdCliente { get; set; }
    public bool Enable { get; set; }
  }
}
