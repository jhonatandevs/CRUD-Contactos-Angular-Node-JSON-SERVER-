import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContactoComponent } from './editar-contacto.component';

describe('EditarContactoComponent', () => {
  let component: EditarContactoComponent;
  let fixture: ComponentFixture<EditarContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
