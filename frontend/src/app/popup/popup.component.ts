import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() message: string = 'This webapp is not be fully optimized for mobile devices.';
  @Input() backgroundColor: string = '#f8d7da';
  opacity: number = 0;

  ngOnInit() {
    if(this.isMobile()){
      this.closePopup();
    }
    setTimeout(() => {
      this.fadeOut();
    }, 3000);
  }

  fadeIn() {
    this.opacity = 1;
  }

  fadeOut() {
    this.opacity = 0;
    setTimeout(() => {
      this.closePopup();
    }, 3500);
  }
  isMobile(): boolean {
    console.log(window.innerWidth >= 420)
    return window.innerWidth >= 420;
  }
  closePopup() {
    const popupElement = document.querySelector('.popup');
    if (popupElement) {
      popupElement.remove();
    }
  }
}
