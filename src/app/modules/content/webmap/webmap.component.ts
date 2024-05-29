import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-webmap',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './webmap.component.html',
  styleUrl: './webmap.component.css'
})
export class WebmapComponent implements OnInit, OnDestroy{

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
