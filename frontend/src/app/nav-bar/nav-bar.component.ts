import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  links = [
    {text: 'Graphs', route: '/graphs'},
    {text: 'Related Words', route: '/related-words'},
    {text: 'Map', route: '/map'},

  ];
  activeLink = "";
  constructor() { }

  ngOnInit(): void {
  }

}
