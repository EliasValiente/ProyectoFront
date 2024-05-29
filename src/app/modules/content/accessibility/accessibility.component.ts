import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.css'
})
export class AccessibilityComponent implements OnInit, OnDestroy {

  constructor(
    private visibilityService: VisibilityService
  ) {}

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
