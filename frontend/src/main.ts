import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

// Token fijo de prueba
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkZW1vIiwiaWF0IjoxNzc0NzI1ODk2LCJleHAiOjE3NzQ3Mjk0OTZ9.dSd083LUZ1LvDbtw3Af2g17dJTKMj46FSq_8Fpw7zc0');

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
});
