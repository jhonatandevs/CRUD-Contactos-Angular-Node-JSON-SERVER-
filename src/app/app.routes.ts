import { Routes } from '@angular/router';
import { ListarContactosComponent } from './contactos/components/listar-contactos/listar-contactos.component';
import { VerContactoComponent } from './contactos/components/ver-contacto/ver-contacto.component';
import { CrearContactoComponent } from './contactos/components/crear-contacto/crear-contacto.component';
import { EditarContactoComponent } from './contactos/components/editar-contacto/editar-contacto.component';

export const routes: Routes = [
  {
    path: "",
    component: ListarContactosComponent,
  },
  {
    path: "ver-contacto",
    component: VerContactoComponent,
  },
  {
    path: "crear-contacto",
    component: CrearContactoComponent,
  },
  {
    path: "editar-contacto",
    component: EditarContactoComponent,
  }
];
