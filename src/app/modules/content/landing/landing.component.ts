import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { VisibilityService } from '../../../shared/services/visibility/visibility.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(
    private visibilityService: VisibilityService,
    private router: Router
  ) {}

   
  @ViewChild('photoContainer') photoContainer!: ElementRef;

  ngAfterViewInit() {
    this.loadPhotos();
  }

  navigateTo(url: string): void {
    this.router.navigate(['/'+url]);
  }

  loadPhotos(): void {
    if (this.photoContainer) {
      let content = '<div class="column">';
      for (let i = 0; i < 9; i++) {
        if (i != 0 && (i % 9 == 0)) {
          content += `
              </div><div class="column">
              ${this.getPhotoElement(i + 1)}`;
        } else {
          content += this.getPhotoElement(i + 1);
        }
      }
      
      content += "</div>";
      this.photoContainer.nativeElement.innerHTML = content;
    }
  }

  private generarInt(): number {
    return Math.floor(Math.random() * 2) + 1;
  }

  private getPhotoElement(photoId: number): string {
    let carpeta = this.generarInt();
    return `<a href="#" class="photo">
      <img loading="lazy" alt="Photo ${photoId}" src="assets/images/imgs_${carpeta}/photo_${photoId}.jpg" />
    </a>`;
  }

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
