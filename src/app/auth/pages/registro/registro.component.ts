import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre              : ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email               : ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username            : ['', [Validators.required, this.validatorService.noPuederSerStrider]],
    password            : ['', [Validators.required, Validators.minLength(6)]],
    confirmationPassword: ['', [Validators.required]],
  }, {
    validators: [ this.validatorService.camposIguales('password', 'confirmationPassword')]
  });

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.required ) {
      return 'Email es obligatorio';
    } else if ( errors?.pattern ) {
      return 'No es un email válido';
    } else if ( errors?.emailTomado ) {
      return 'El email ya esta en uso';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Mateo Castro',
      email: 'mateocastro1297@hotmail.com',
      username: 'mateoU1297'
    });
  }

  guardar(): void {
    this.miFormulario.markAllAsTouched();
  }

  campoNoValido(campo: string): any {
    return this.miFormulario.get(campo)?.invalid 
          && this.miFormulario.get(campo)?.touched;
  }

}
