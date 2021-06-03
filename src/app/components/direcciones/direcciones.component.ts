import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

 formDirecciones!: FormGroup;
 submitted: boolean = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formDirecciones = this.formBuilder.group({
     idDireccion:[0],
     calle:[null,[Validators.required,Validators.maxLength(50)]],
     sector:[null,[Validators.required,Validators.maxLength(50)]],
     municipio:[null,Validators.maxLength(50)],
     idProvincia:[null,Validators.required],
     idCliente:[null,Validators.required]
    });
  }

  get f() {
    return this.formDirecciones.controls;
  }

  onSubmit(): void {

  }
}
