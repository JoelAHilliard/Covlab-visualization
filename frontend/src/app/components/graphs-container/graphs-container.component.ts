import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs-container',
  templateUrl: './graphs-container.component.html',
  styleUrls: ['./graphs-container.component.scss'],

})

export class GraphsContainerComponent implements OnInit {


  
  graphDataArr: any = [];

  constructor() { }

  ngOnInit(): void {
  }


  graphData(event:any){
    this.graphDataArr = event;
  }

}
