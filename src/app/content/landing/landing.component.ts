import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('photoContainer') photoContainer!: ElementRef;

  ngAfterViewInit() {
    this.loadPhotos();
  }

  navigateTo(url: string): void {
    window.location.replace(url);
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
}
