import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  sizeContacts=0;
  private  http =inject(HttpClient)
  private apiUrl = environment.BD_URL;
  getAllContacts(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }
  getContactById(id:string): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/${id}`);
  }

  addContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto);
  }

  updateContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.patch<Contacto>(`${this.apiUrl}/${contacto.id}`, contacto);
  }

  deleteContacto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
