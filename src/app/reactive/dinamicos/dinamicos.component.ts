import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre    : ['', [Validators.required, Validators.minLength(3)]],
    favoritos : this.fb.array([
      ['Metal Slug', Validators.required],
      ['Metal Gear', Validators.required]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr(): FormArray {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder) { }

  campoEsValido(campo: string): any {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(): any {
    if (this.nuevoFavorito.invalid) {
      return; 
    }

    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

  guardar(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.miFormulario.reset();
  }

  borrar(i: number): void {
    this.favoritosArr.removeAt(i);
  }

}
