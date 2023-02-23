import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { isEmpty } from 'rxjs';
Chart.register(...registerables)
@Component({
  selector: 'app-table-graph',
  templateUrl: './table-graph.component.html',
  styleUrls: ['./table-graph.component.scss']
})
export class TableGraphComponent implements AfterViewInit {
  
  @Input() index: string = "";
  
  @Input() id: string = ""

  @Input() twoWeekChange: any;

  constructor() {

  }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  
  ngAfterViewInit(): void {
    
    let newIndex = Number(this.index);
    let newId = this.id;
    let data;
    if(this.twoWeekChange == "N/A"){
      data = {
        //last two weeks
        
      };
    }
    else {
      var labels:any = [];
      var dataVals:any = [];
      try{
        for(var i=0;i<this.twoWeekChange['14DayData'].data.length;i++){
          labels[i] = (this.twoWeekChange['14DayData'].data[i][0])
          dataVals[i] = (this.twoWeekChange['14DayData'].data[i][1])
        }
        data = {
          //last two weeks
          labels: labels,
          datasets: [
            {
              backgroundColor: "blur",
              borderColor: "blue",
              borderWidth: 3,
              data: dataVals,
              fill: {
                target: 'origin',
                above: 'rgb(0, 0, 255, 0.25)'
              }
            }
          ]
        };
      }catch{

      }
      
    }
    new Chart(newId + newIndex, {
      type: "line",
      data: data as ChartData,
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

