import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { RegisterService } from '../services/register.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registroService: RegisterService,
    private visibilityService: VisibilityService
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      tarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      fechaValidez: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false);
    });
  }
  
  ngOnDestroy() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.registroService.registrarUsuario(this.registroForm.value).subscribe(
        response => {
          console.log('Usuario registrado con éxito: ', response);
          this.router.navigate(['/prices']);
        },
        error => {
          console.log('Error al registrar usuario: ', error);
        }
      );
    }else{
      console.log('no valido')
    }
  }
}
