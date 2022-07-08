import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre      : ['', [Validators.required, Validators.minLength(3)]],
    precio      : ['', [Validators.required, Validators.min(0)]],
    existencias : ['', [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) { }

  campoEsValido(campo: string): any {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre      : 'RTX 4080ti',
      precio      : 1600,
      existencias : 1000
    });
  }

  guardar(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.miFormulario.reset();

  }

}
