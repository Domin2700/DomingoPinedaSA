using DomingoPinedaAPI.Context;
using DomingoPinedaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace DomingoPinedaAPI.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class DireccionesController : Controller
  {
    private readonly ApplicationDbContext _context;


    public DireccionesController(ApplicationDbContext context)
    {
      this._context = context;
    }

    #region Provincia

    [HttpGet("getprovincias")]
    public async Task<ActionResult<Provincia>> getProvincias()
    {
      var provincias = await _context.Provincia.Where(w => w.Enable == true).ToListAsync();
      return Ok(provincias);
    }

    #endregion

    #region Cliente

    [HttpPost("insertcliente")]
    public async Task<IActionResult> InsertCliente([FromBody] Cliente cliente)
    {
      if (ModelState.IsValid)
      {
        var clienteExiste = await _context.Cliente.AnyAsync(a => a.Cedula == cliente.Cedula);
        if (clienteExiste)
        {
          ModelState.AddModelError("Mensaje", "El cliente ya existe");
          return BadRequest(ModelState);
        }
        await _context.Cliente.AddAsync(cliente);
        int x = await _context.SaveChangesAsync();

        if (x > 0)
        {
          return Ok();
        }
        else
        {
          ModelState.AddModelError("Mensaje", "Error al guardar los datos");
          return BadRequest(ModelState);
        }
      }
      else
      {
        ModelState.AddModelError("Mensaje", ModelState.ToString());
        return BadRequest(ModelState);
      }

    }

    [HttpPut("updatecliente/{idCliente}")]
    public async Task<IActionResult> UpdateCliente([FromRoute] int idCliente, [FromBody] Cliente cliente)
    {
      if (ModelState.IsValid)
      {
        if (idCliente != cliente.IdCliente)
        {
          ModelState.AddModelError("Mensaje", "El id no coincide");
          return BadRequest(ModelState);
        }

        _context.Cliente.Update(cliente);
        int x = await _context.SaveChangesAsync();

        if (x > 0)
        {
          return Ok();
        }
        else
        {
          ModelState.AddModelError("Mensaje", "Error al actualizar los datos");
          return BadRequest(ModelState);
        }
      }
      else
      {
        ModelState.AddModelError("Mensaje", ModelState.ToString());
        return BadRequest(ModelState);
      }
    }

    [HttpDelete("deletecliente/{idCliente}")]
    public async Task<ActionResult<Cliente>> DeleteClienete([FromRoute] int idCliente)
    {
   
        var cliente = await _context.Cliente.FirstOrDefaultAsync(f => f.IdCliente == idCliente);

        if (cliente == null)
        {
        ModelState.AddModelError("Mensaje", "Cliente no existe");
        return BadRequest(ModelState);
        }


      _context.Entry(cliente).State = EntityState.Deleted;
      _context.SaveChanges();
      return Ok();
    }

  [HttpGet("getclientes")]
    public async Task<ActionResult<Cliente>> getCliente()
    {
      var clientes = await _context.Cliente.Where(w => w.Enable == true).ToListAsync();
      return Ok(clientes);
    }



    #endregion


    #region Direccion
    [HttpPost("insertdireccion")]
    public async Task<IActionResult> InsertDireccion([FromBody] Direccion direccion)
    {
      if (ModelState.IsValid)
      {
  
        await _context.Direccion.AddAsync(direccion);
        int x = await _context.SaveChangesAsync();

        if (x > 0)
        {
          return Ok();
        }
        else
        {
          ModelState.AddModelError("Mensaje", "Error al guardar los datos");
          return BadRequest(ModelState);
        }
      }
      else
      {
        ModelState.AddModelError("Mensaje", ModelState.ToString());
        return BadRequest(ModelState);
      }

    }

    [HttpPut("updatedireccion/{idDireccion}")]
    public async Task<IActionResult> UpdateDireccion([FromRoute] int idDireccion, [FromBody] Direccion direccion)
    {
      if (ModelState.IsValid)
      {
        if (idDireccion != direccion.IdDireccion)
        {
          ModelState.AddModelError("Mensaje", "El id no coincide");
          return BadRequest(ModelState);
        }

        _context.Direccion.Update(direccion);
        int x = await _context.SaveChangesAsync();

        if (x > 0)
        {
          return Ok();
        }
        else
        {
          ModelState.AddModelError("Mensaje", "Error al actualizar los datos");
          return BadRequest(ModelState);
        }
      }
      else
      {
        ModelState.AddModelError("Mensaje", ModelState.ToString());
        return BadRequest(ModelState);
      }
    }

    [HttpDelete("deletedireccion/{idDireccion}")]
    public async Task<ActionResult<Cliente>> DeleteDireccion([FromRoute] int idDireccion)
    {

      var cliente = await _context.Direccion.FirstOrDefaultAsync(f => f.IdDireccion == idDireccion);

      if (cliente == null)
      {
        ModelState.AddModelError("Mensaje", "Direccion no existe");
        return BadRequest(ModelState);
      }


      _context.Entry(cliente).State = EntityState.Deleted;
      _context.SaveChanges();
      return Ok();
    }

    [HttpGet("getdirecciones")]
    public async Task<ActionResult<Direccion>> getDireccion()
    {
      var direcciones = await _context.Direccion.Join(_context.Cliente
        , d => d.IdCliente
        , c => c.IdCliente
        , (d, c) => new { d = d, c = c })
        .Join(_context.Provincia
         , dp => dp.d.IdProvincia
         , p => p.IdProvincia
         , (dp, p) => new { dp = dp, p = p })
        .Select(s => new {
           s.dp.d.IdDireccion
          ,s.dp.d.Calle
          ,s.dp.d.Sector
          ,s.dp.d.Municipio
          ,Provincia = s.p.Nombre
          ,Cliente = s.dp.c.Nombres + " " + s.dp.c.Apellidos
          ,Cedula = s.dp.c.Cedula
          ,s.p.IdProvincia
          ,s.dp.c.IdCliente
          ,s.dp.d.Enable
        }).ToListAsync();



      return Ok(direcciones);
    }
    #endregion

  }
}
