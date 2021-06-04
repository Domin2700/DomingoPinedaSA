import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../interfaces/clientes.interface';
import { Direccion } from '../interfaces/direccion.interface';
import { Provincia } from '../interfaces/provincia.interface';


@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
 url: string = environment.url;

  constructor(private http:HttpClient) { }
  
  insertDireccion(direccion: Direccion): Observable<Direccion>{
    return this.http.post<Direccion>(`${this.url}/direcciones/insertdireccion`,direccion);
  }

  updateDireccion(direccion: Direccion): Observable<Direccion> {
    let idDireccion: number = direccion.idDireccion;
    return this.http.patch<Direccion>(`${this.url}/direcciones/updatedireccion/${idDireccion}`,direccion);
  }

  getDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.url}/direcciones/getdirecciones`);
  }
  
  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.url}/direcciones/getprovincias`);
  }
 
  insertCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}/direcciones/insertcliente`,cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    let idCliente: number = cliente.idCliente;
    return this.http.patch<Direccion>(`${this.url}/direcciones/updatecliente/${idCliente}`,cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/direcciones/getclientes`);
  }

  

}
