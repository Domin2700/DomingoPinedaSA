import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import Swal from 'sweetalert2';
import { DireccionesComponent } from '../direcciones/direcciones.component';
import { DireccionesService } from '../../services/direcciones.service';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {
 @ViewChild(DireccionesComponent) componentDirecciones!: DireccionesComponent;
 @Input() clientes: Cliente[]=[];

 formClientes!: FormGroup;
 submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
            private direccionesService:DireccionesService) { }

  ngOnInit(): void {
    this.formClientes = this.formBuilder.group({
      idCliente:[0],
      nombres:[null,[Validators.required,Validators.maxLength(50)]],
      apellidos:[null,[Validators.required,Validators.maxLength(50)]],
      cedula:[null,[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]*')]],
      enable:[1]
    }); }

    get f() {
      return this.formClientes.controls;
    }

    onSubmit(): void {
      this.submitted = true;
      if (this.formClientes.valid) {
  
        if (this.f.idCliente.value) {
          this.updateCliente();
        } else {
          this.insertCliente();
        }
      } else {
        return;
      }
    }


    insertCliente(): void {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Guardando...'
      });
      Swal.showLoading();
      this.direccionesService.insertCliente(this.formClientes.value).subscribe((resp)=> {
        Swal.fire({
          icon: 'success',
          title: 'Cliente guardado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.submitted = false;
        this.formClientes.reset;
        this.componentDirecciones.getClientes();
      });
    }
  
    updateCliente(): void {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Actualizando...'
      });
      Swal.showLoading();
      this.direccionesService.updateCliente(this.formClientes.value).subscribe((resp)=> {
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.submitted = false;
        this.formClientes.reset;
        this.componentDirecciones.getClientes();
      });
    }
  
  
    deleteCliente(idCliente: number): void { 
      Swal.fire({
        title: 'Estas segur@?',
        text: 'Va a eliminar el cliente',
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
          .deleteDireccion(idCliente)
          .subscribe(
            (resp) => {
              Swal.fire('Listo!', 'Cliente eliminado');
              this.componentDirecciones.getClientes();
             
            }
          );
        }
      });
     }
  
  
     cargarDatos( cliente: Cliente ): void {
      this.formClientes.patchValue({
      idCliente:cliente.idCliente,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      cedula: cliente.cedula,
      enable: cliente.enable
      });
    }
}


