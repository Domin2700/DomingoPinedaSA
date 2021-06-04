import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {
 formClientes!: FormGroup;
 submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formClientes = this.formBuilder.group({
      idCliente:[0],
      nombres:[null,[Validators.required,Validators.maxLength(50)]],
      apellidos:[null,[Validators.required,Validators.maxLength(50)]],
      cedula:[null,[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]*')]]
    }); }

    get f() {
      return this.formClientes.controls;
    }

    onSubmit(): void {

    }
}


