import { Routes } from '@angular/router';
import { LandingComponent } from './modules/content/landing/landing.component';
import { HomeComponent } from './modules/content/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { PricingComponent } from './modules/content/pricing/pricing.component';
import { PlayerComponent } from './modules/content/player/player.component';

export const routes: Routes = [
    {'path':  '', component:LandingComponent},
    {'path':  'home', component:HomeComponent},
    {'path':  'login', component:LoginComponent},
    {'path':  'register', component:RegisterComponent},
    {'path':  'prices', component:PricingComponent},
    {'path': 'movie/:id', component: PlayerComponent },
    {'path':  '**', component:LandingComponent}
];
