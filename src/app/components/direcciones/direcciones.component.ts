import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import Swal from 'sweetalert2';
import { Provincia } from '../../interfaces/provincia.interface';
import { DireccionesService } from '../../services/direcciones.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

 formDirecciones!: FormGroup;
 submitted: boolean = false;

 provincias: Provincia[] = [];
 clientes: Cliente[] = [];
 direcciones: Direccion[] = [];

  constructor(private formBuilder:FormBuilder,
              private direccionesService: DireccionesService
    ) { }

  ngOnInit(): void {
    this.formDirecciones = this.formBuilder.group({
     idDireccion:[null],
     calle:[null,[Validators.required,Validators.maxLength(50)]],
     sector:[null,[Validators.required,Validators.maxLength(50)]],
     municipio:[null,Validators.maxLength(50)],
     idProvincia:[null,Validators.required],
     idCliente:[null,Validators.required],
     enable:[1]
    });

    this. getClientes();
    this.getProvincias();
    this.getDirecciones();

  }

  get f() {
    return this.formDirecciones.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formDirecciones.valid) {

      if (this.f.idDireccion.value) {
        this.updateDireccion();
      } else {
        this.insertDireccion();
      }
    } else {
      return;
    }
  }

  getDirecciones(): void {
   this.direccionesService.getDirecciones().subscribe((resp)=> {
     this.direcciones = resp
   });
  }

  getClientes(): void {
    this.direccionesService.getClientes().subscribe((resp) => {
      this.clientes = resp;
    });
  }

  getProvincias(): void {
    this.direccionesService.getProvincias().subscribe((resp)=> {
      this.provincias = resp;
    });
  }

  insertDireccion(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando...'
    });
    Swal.showLoading();
    this.direccionesService.insertDireccion(this.formDirecciones.value).subscribe((resp)=> {
      Swal.fire({
        icon: 'success',
        title: 'Direccion guardada!',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitted = false;
      this.formDirecciones.reset;
      this.getDirecciones();
    });
  }

  updateDireccion(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Actualizando...'
    });
    Swal.showLoading();
    this.direccionesService.updateDireccion(this.formDirecciones.value).subscribe((resp)=> {
      Swal.fire({
        icon: 'success',
        title: 'Direccion actualizada!',
        showConfirmButton: false,
        timer: 1500
      });
      this.submitted = false;
      this.formDirecciones.reset;
      this.getDirecciones();
    });
  }


  deleteDireccion(idDireccion: number): void { 
    Swal.fire({
      title: 'Estas segur@?',
      text: 'Va a eliminar la direccion',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.direccionesService
        .deleteDireccion(idDireccion)
        .subscribe(
          (resp) => {
            Swal.fire('Listo!', 'Direccion eliminada');
            this.getDirecciones();
           
          }
        );
      }
    });
   }


   cargarDatos( direccion: Direccion ): void {
    this.formDirecciones.patchValue({
      idDireccion: direccion.idDireccion,
      calle: direccion.calle,
      sector:direccion.sector,
      idProvincia: direccion.idProvincia,
      idCliente: direccion.idCliente,
      enable: direccion.enable
    });
  }


}
