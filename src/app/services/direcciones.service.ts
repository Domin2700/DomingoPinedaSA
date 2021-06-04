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
    console.log(direccion);
    let idDireccion: number = direccion.idDireccion!;
    return this.http.put<Direccion>(`${this.url}/direcciones/updatedireccion/${idDireccion}`,direccion);
  }

  deleteDireccion(idDireccion: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/direcciones/deletedireccion/${idDireccion}`);
  }

  getDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.url}/direcciones/getdirecciones`);
  }
  
  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.url}/direcciones/getprovincias`);
  }
 
  insertCliente(cliente: Cliente): Observable<Cliente>{
    console.log(cliente);
    return this.http.post<Cliente>(`${this.url}/direcciones/insertcliente`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    let idCliente: number = cliente.idCliente!;
    return this.http.put<Cliente>(`${this.url}/direcciones/updatecliente/${idCliente}`,cliente);
  }

  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/direcciones/deletecliente/${idCliente}`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/direcciones/getclientes`);
  }

  

}
