import { Component } from '@angular/core';
import { TrackingFormComponent } from './tracking-form/tracking-form.component';
import { TrackingTimelineComponent } from './tracking-timeline/tracking-timeline.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TrackingFormComponent,
    TrackingTimelineComponent,
    CommonModule 
  ],
  template: `
    <app-tracking-form (consult)="consultarGuia($event)"></app-tracking-form>

    <app-tracking-timeline
      *ngIf="trackingData"
      [guia]="trackingData?.guia"
      [estadoActual]="trackingData?.estadoActual"
      [bodegaActual]="trackingData?.bodegaActual"
      [historial]="trackingData?.historial">
    </app-tracking-timeline>
  `
})
export class AppComponent {
  trackingData: any = null;

  constructor(private http: HttpClient) {}

  consultarGuia(guia: string) {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get(`http://localhost:3000/api/tracking/${guia}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.trackingData = data,
      error: err => console.error(err)
    });
  }
}