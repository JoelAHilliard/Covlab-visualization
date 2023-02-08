import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-table-graph',
  templateUrl: './table-graph.component.html',
  styleUrls: ['./table-graph.component.scss']
})
export class TableGraphComponent implements OnInit {
  @Input() index: string = "";
  id: string = "myChart"

  constructor() {

  }
  
  ngOnInit(): void {
    
    let newIndex = Number(this.index);
    let newId= this.id;

    window.onload = function(){

      for(var i = 0; i<=newIndex;i++){

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
        new Chart(newId + i, {
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
  }

  



}
function generateFakeData() {
  let fakeData = []
  for(var i =0;i<5;i++){
    fakeData.push(Math.random() * 10)
  }
  return fakeData
}

