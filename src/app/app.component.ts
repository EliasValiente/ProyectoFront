import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VisibilityService } from './services/visibility/visibility.service';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './content/home/home.component';
import { LandingComponent } from './content/landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegisterComponent, HomeComponent, LandingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy{
  showSearchbox: boolean = true;
  private visibilitySubscription: Subscription;

  constructor(private visibilityService: VisibilityService) {
    this.visibilitySubscription = this.visibilityService.showSearchBox$.subscribe(visible => {
      this.showSearchbox = visible;
    });
  }

  ngOnDestroy() {
    this.visibilitySubscription.unsubscribe();
  }
}
