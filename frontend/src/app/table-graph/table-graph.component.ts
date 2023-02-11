import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)
@Component({
  selector: 'app-table-graph',
  templateUrl: './table-graph.component.html',
  styleUrls: ['./table-graph.component.scss']
})
export class TableGraphComponent implements AfterViewInit {
  
  @Input() index: string = "";
  
  @Input() id: string = ""

  @Input() twoWeekChange:any = [];

  constructor() {

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  
  ngAfterViewInit(): void {
    
    let newIndex = Number(this.index);
    let newId = this.id;

    var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 3,
          data: generateFakeData(),
          fill: {
            target: 'origin',
            above: 'rgb(0, 0, 255, 0.25)'
          }
        }
      ]
    };

    new Chart(newId + newIndex, {
      type: "line",
      data: data,
      options: {
        responsive: false,
        maintainAspectRatio:true,
        elements: {
          point:{
              radius: 0
          },
          line: {
            tension : 0.5,
          }
        },     
        plugins: {
          legend:{
            display:false
          },
          tooltip: {
            enabled:false
          }
          
        },
        scales: {
          y:{
            display:false
          },
          x:{
            display:false
          }
        }
        
      
      },
      
    });
     

  }

  



}
function generateFakeData() {
  let fakeData = []
  for(var i =0;i<5;i++){
    fakeData.push(Math.random() * 10)
  }
  return fakeData
}

