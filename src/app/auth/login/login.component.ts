import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../services/visibility/visibility.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private visibilityService: VisibilityService) {}

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
}