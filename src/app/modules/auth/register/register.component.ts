import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { RegisterService } from '../services/register.service';
import { Router, RouterLink } from '@angular/router';

// Decorador @Component define el componente Angular
@Component({
  selector: 'app-register', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Importa CommonModule, ReactiveFormsModule y RouterLink
  templateUrl: './register.component.html', // Plantilla HTML del componente
  styleUrls: ['./register.component.css'] // Estilos CSS del componente
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup; // Definición del formulario de registro

  // Constructor para inyectar dependencias
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private visibilityService: VisibilityService
  ) {}

  // Método del ciclo de vida de Angular, se llama cuando el componente se inicializa
  ngOnInit() {
    // Define los controles del formulario con validadores
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required], 
      userName: ['', Validators.required],  
      tarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      fechaValidez: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Esconde la barra de búsqueda después de un pequeño retraso cuando se carga el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false);
    });
  }
  
  // Método del ciclo de vida de Angular, se llama cuando el componente se destruye
  ngOnDestroy() {
    // Muestra la barra de búsqueda después de un pequeño retraso cuando se destruye el componente
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  // Método que se llama cuando se envía el formulario de registro
  onSubmit(): void {
    // Verifica si el formulario es válido
    if (this.registroForm.valid) {
      // Verifica si las contraseñas coinciden
      if (this.registroForm.value.password !== this.registroForm.value.repetirPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }

      // Crea un objeto usuario con los valores del formulario
      const usuario = {
        nombre: this.registroForm.value.nombre,
        apellidos: this.registroForm.value.apellidos,
        userName: this.registroForm.value.userName,
        tarjeta: this.registroForm.value.tarjeta,
        cvv: this.registroForm.value.cvv,
        fechaValidez: this.registroForm.value.fechaValidez,
        email: this.registroForm.value.email,
        password: this.registroForm.value.password
      };

      // Llama al servicio de registro para registrar el usuario
      this.registerService.registrarUsuario(usuario).subscribe(
        response => {
          console.log('Usuario registrado con éxito: ', response);
          // Redirige a la página de precios después del registro exitoso
          this.router.navigate(['/prices']);
        },
        error => {
          console.log('Error al registrar usuario: ', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
