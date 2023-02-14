import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs-container',
  templateUrl: './graphs-container.component.html',
  styleUrls: ['./graphs-container.component.scss'],

})

export class GraphsContainerComponent implements OnInit {


  
  graphDataArr: any = [];
  
  links = [
    {text: 'Graphs', route: '/graphs'},
    {text: 'Related Words', route: '/related-words'},
    {text: 'Map', route: '/map'},

  ];
  activeLink = "";

  constructor() { }

  ngOnInit(): void {
  }


  graphData(event:any){
    this.graphDataArr = event;
  }

}
