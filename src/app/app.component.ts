import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListarContactosComponent } from './contactos/components/listar-contactos/listar-contactos.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListarContactosComponent,HttpClientModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PruebaAlejo';
}
