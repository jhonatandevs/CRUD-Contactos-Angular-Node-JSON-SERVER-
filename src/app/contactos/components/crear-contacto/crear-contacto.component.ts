import { Component, inject, signal } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { Router } from '@angular/router';
import { Contacto } from '../../models/contacto';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormContactoComponent } from '../form-contacto/form-contacto.component';

@Component({
  selector: 'app-crear-contacto',
  standalone: true,
  imports: [ReactiveFormsModule,FormContactoComponent],
  templateUrl: './crear-contacto.component.html',
  styleUrl: './crear-contacto.component.css'
})
export class CrearContactoComponent {
  contactoService: ContactoService = inject(ContactoService);
  router: Router = inject(Router);
  id=this.contactoService.sizeContacts+1;
  form = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      celular: new FormControl('',[Validators.required]),
      correo: new FormControl('',[ Validators.email, Validators.required]),
      direccion: new FormControl('',[Validators.required]),
    })
  )
  contacto: Contacto = {
    nombre: '',
    apellidos: '',
    celular: '',
    correo: '',
    direccion: '',
    id: '',
    telefonos: []
  };

  crearContacto() {
    // Extract values from the form and assign them to the 'contacto' object
    this.contacto.nombre = this.form().value.nombre;
    this.contacto.apellidos = this.form().value.apellidos;
    this.contacto.celular = this.form().value.celular;
    this.contacto.correo = this.form().value.correo;
    this.contacto.direccion = this.form().value.direccion;
    this.contacto.id = this.id+'';
    // Call your ContactoService to create the contact (assuming a createContact method exists)
    this.contactoService.addContacto(this.contacto)
      .subscribe((response: any) => {
        this.router.navigate(['/']); // Navigate to contacts list after success
      }, (error: any) => {
        // Handle errors during creation (e.g., display error messages)
        console.error('Error creando contacto:', error);
      });

  }
}
