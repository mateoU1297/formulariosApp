import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  guardar(): void {
    
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
    
  }

  validarNombre(): boolean {
    return this.miFormulario?.controls.producto?.invalid &&
    this.miFormulario?.controls.producto?.touched;
  }

  validarPrecio(): boolean {
    return this.miFormulario?.controls.precio?.touched &&
    this.miFormulario?.controls.precio?.value < 0;
  }

}
