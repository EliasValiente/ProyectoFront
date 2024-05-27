// src/app/components/login/login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private visibilityService: VisibilityService, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(false);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        this.errorMessage = ''; 
        console.log(response);
        if (response.roles.includes('ROLE_ADMIN')) {
          window.location.href = 'http://localhost:8000/admin/dashboard'; 
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed: ' + (error.error.error || 'Unknown error');
      }
    );
  }
}
