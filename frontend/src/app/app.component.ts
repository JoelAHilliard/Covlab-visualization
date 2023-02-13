import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-portal';
  links = [
    {text: 'Graphs', route: 'graphs'},
    {text: 'Related Words', route: 'related-words'},
    {text: 'Map', route: 'map'},

  ];
  
  activeLink = this.links[0].text;

}
