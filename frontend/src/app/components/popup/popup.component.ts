import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() message: string = 'For the best experience, view on desktop.';
  @Input() backgroundColor: string = '#f8d7da';


  @Input() hasCloseButton: boolean = true;

  @Input() popUpTime: number = 3000;

  opacity: number = 0;

  ngOnInit() {
    if (this.isMobile()) {
        this.closePopup();
    }
    console.log(this.popUpTime)
    setTimeout(() => {
        this.fadeOut();
    }, this.popUpTime);
  }


  fadeIn() {
    this.opacity = 1;
  }

  fadeOut() {
    this.opacity = 0;
    setTimeout(() => {
        this.closePopup();
    }, 0); // Use a constant value or a new @Input() property
  }

  isMobile(): boolean {
    return window.innerWidth >= 420;
  }
  closePopup() {
    const popupElement = document.querySelector('.popup');
    if (popupElement) {
      popupElement.remove();
    }
  }
}
