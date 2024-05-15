import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

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