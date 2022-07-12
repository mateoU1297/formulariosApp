import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  miFormulario: FormGroup = this.fb.group({
    nombre  : ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email   : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  guardar(): void {
    this.miFormulario.markAllAsTouched();
  }

  campoNoValido(campo: string): any {
    return this.miFormulario.get(campo)?.invalid 
          && this.miFormulario.get(campo)?.touched;
  }

}
