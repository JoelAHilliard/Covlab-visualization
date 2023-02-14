import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { GraphsContainerComponent } from '../graphs-container/graphs-container.component';
import { MapComponent } from '../map/map.component';
import { RelatedWordsComponent } from '../related-words/related-words.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {

   
  @Output() output = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(window.location.pathname)
  }
  goToApp(){
    this.router.navigate(['graphs'],{state:{showing:false}})
    //send data to ap.component.ts that this was clicked and set 'onHome' to false.
    this.output.emit("false");
  }
}
