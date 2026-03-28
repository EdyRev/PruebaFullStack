import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <input type="text" formControlName="trackingNumber" placeholder="Número de guía" />
      <button type="submit">Consultar</button>
    </form>
  `
})
export class TrackingFormComponent {
  form = new FormGroup({
    trackingNumber: new FormControl('', [Validators.required])
  });

  @Output() consult = new EventEmitter<string>();

  onSubmit() {
    const value = this.form.get('trackingNumber')?.value?.trim();
    if (value) {
      console.log('submit disparado:', value); // <- ahora sí debería aparecer
      this.consult.emit(value);
    }
  }
}