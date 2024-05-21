import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private visibilityService: VisibilityService) {}

   ngOnInit() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.visibilityService.setShowSearchBox(true);
    });
  }

}
