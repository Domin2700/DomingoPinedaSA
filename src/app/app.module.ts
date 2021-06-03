//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { ModalClientesComponent } from './components/modal-clientes/modal-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DireccionesComponent,
    ModalClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
