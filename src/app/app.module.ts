import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalUsuariosComponent } from './components/modal-usuarios/modal-usuarios.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ModalUsuariosComponent,
    DireccionesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
