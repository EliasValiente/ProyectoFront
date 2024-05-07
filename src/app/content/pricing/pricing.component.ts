import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityService } from '../../services/visibility/visibility.service'; 

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent implements OnInit, OnDestroy {

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
