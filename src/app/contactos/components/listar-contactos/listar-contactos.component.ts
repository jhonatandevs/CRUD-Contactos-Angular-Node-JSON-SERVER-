import { Component, inject } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Contacto } from '../../models/contacto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-contactos',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './listar-contactos.component.html',
  styleUrl: './listar-contactos.component.css'
})
export class ListarContactosComponent {

  contactos: Contacto[] = [];
  contactoService: ContactoService = inject(ContactoService);
  router: Router = inject(Router);
  constructor(library: FaIconLibrary) {
    // Registrar los iconos en la biblioteca de Font Awesome
    library.addIcons(faEye, faEdit, faTrash);
  }
  ngOnInit(): void {
    // Llamar al servicio para obtener la lista de contactos
    this.contactoService.getAllContacts().subscribe({
      next: (data) => {
        this.contactos = data; // Llenar la tabla con los contactos
        this.contactoService.sizeContacts=data.length;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error); // Manejar errores
      }
    });
  }
  eliminarContacto(contacto: Contacto) {
    this.contactoService.deleteContacto(contacto.id).subscribe({
      next: (data) => {
        this.contactoService.getAllContacts().subscribe({
          next: (data) => {
            this.contactos = data; // Llenar la tabla con los contactos
          },
          error: (error) => {
            console.error('Error fetching contacts:', error); // Manejar errores
          }
        });
      },
      error: (error) => {
        console.error('Error fetching contacts:', error); // Manejar errores
      }
    });
  }
  editarContacto(contacto: Contacto) {
    this.router.navigate(['/editar-contacto'], { queryParams: { id: contacto.id } });
  }
  verContacto(id: string) {
    this.router.navigate(['/ver-contacto'], { queryParams: { id: id } });
  }
  crearContactoRoute(){
    this.router.navigate(['/crear-contacto']);
  }
}
