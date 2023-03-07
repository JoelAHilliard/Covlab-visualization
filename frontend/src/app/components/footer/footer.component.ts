import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  goToPage(location:string){
    this.router.navigate([location])
    window.scrollTo(0,0);

  }

}
