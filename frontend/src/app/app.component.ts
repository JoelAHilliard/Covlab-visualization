import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'covid-portal';
  
  links = 
  [
    {text: 'Graphs', route: 'graphs'},
    {text: 'Related Words', route: 'related-words'},
    {text: 'Map', route: 'map'}
  ];

  activeLink = "";

  constructor(private router: Router) {
  }
  
  ngOnInit(){
    this.setUpAnalytics();
  }
  
  setUpAnalytics() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'G-1WF7HWGET3',
              {
                page_path: event.urlAfterRedirects
              }
          );
        }
      });
  }
}
