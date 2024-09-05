import { Component, inject, Input, signal } from '@angular/core';
import { Contacto } from '../../models/contacto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-contacto.component.html',
  styleUrl: './form-contacto.component.css'
})
export class FormContactoComponent {

  contactoService: ContactoService = inject(ContactoService);
  router: Router = inject(Router);
  id: string | null = '';

  @Input() modo: 'crear' | 'modificar' | 'ver' = 'crear';
  @Input() contacto: Contacto | null = null;

  form = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),
    })
  );
  constructor(private route: ActivatedRoute) {
    // Registrar los iconos en la biblioteca de Font Awesome

  }
  ngOnInit() {
    if (this.contacto) {
      this.form().patchValue({
        nombre: this.contacto.nombre,
        apellidos: this.contacto.apellidos,
        celular: this.contacto.celular,
        correo: this.contacto.correo,
        direccion: this.contacto.direccion,
      });

      // Si está en modo "ver", deshabilitamos todos los campos
      if (this.modo === 'ver') {
        this.form().disable();
      }
    }

  }
  // Acción según el modo (crear o modificar)
  guardarContacto() {
    if (this.modo === 'crear') {
      this.crearContacto();
    } else if (this.modo === 'modificar') {
      this.modificarContacto();
    }
  }

  // Crear un nuevo contacto
  async crearContacto() {


    if (this.modo === 'crear') {
      const nuevoContacto: Contacto = {
        ...this.form().value,
        id: this.contactoService.sizeContacts + 1 + '',
        telefonos: []
      };
      this.contactoService.addContacto(nuevoContacto).subscribe(
        (response: any) => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error creando contacto:', error);
        }
      );
    }
    else if (this.modo === 'modificar') {
      await this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });

      const editContacto: Contacto = {
        ...this.form().value,
        id: this.id,
        telefonos: []
      };
      this.contactoService.updateContacto(editContacto).subscribe(
        (response: any) => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error creando contacto:', error);
        }
      );
    }
  }

  // Modificar un contacto existente
  modificarContacto() {
    if (this.contacto) {
      const contactoModificado: Contacto = {
        ...this.contacto,
        ...this.form().value
      };

      this.contactoService.updateContacto(contactoModificado).subscribe(
        (response: any) => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error modificando contacto:', error);
        }
      );
    }
  }

}
