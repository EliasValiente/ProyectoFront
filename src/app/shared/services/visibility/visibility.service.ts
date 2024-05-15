import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private showSearchBox = new BehaviorSubject<boolean>(true);
  public showSearchBox$ = this.showSearchBox.asObservable();

  constructor() {}

  public setShowSearchBox(visible: boolean): void {
    this.showSearchBox.next(visible);
  }
}
