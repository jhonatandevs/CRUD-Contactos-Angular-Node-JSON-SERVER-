import { Component, inject } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { FormContactoComponent } from '../form-contacto/form-contacto.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-editar-contacto',
  standalone: true,
  imports: [CommonModule,FormContactoComponent, FontAwesomeModule],
  templateUrl: './editar-contacto.component.html',
  styleUrl: './editar-contacto.component.css'
})
export class EditarContactoComponent {
  id:string|null='';
  contactoService: ContactoService = inject(ContactoService);
  router: Router = inject(Router);
  contacto: Contacto|null=null;
  constructor(private route: ActivatedRoute, library: FaIconLibrary) {
    // Registrar los iconos en la biblioteca de Font Awesome
    library.addIcons(faEye, faEdit, faTrash);
  }
  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    // Llamar al servicio para obtener la lista de contactos
    this.contactoService.getContactById(this.id||'999').subscribe({
      next: (data) => {
        this.contacto = data; // Llenar la tabla con los contactos
      },
      error: (error) => {
        console.error('Error fetching contacts:', error); // Manejar errores
      }
    });
  }
  editarContacto() {
    this.router.navigate(['/editar-contacto']); // Navigate to contacts list after success

  }
}
