import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-table-graph',
  templateUrl: './table-graph.component.html',
  styleUrls: ['./table-graph.component.scss']
})
export class TableGraphComponent implements AfterViewInit, OnDestroy {
  
  @Input() index: string = "";
  
  @Input() id: string = "";

  @Input() twoWeekChange: any;

  private charts: Chart[] = [];

  constructor() {

  }

  ngAfterViewInit(): void {
    this.createChart()
  }

  ngOnDestroy(): void {
    // Change all chart ids
    this.charts.forEach(c => {
        c.canvas.id = ""
      }
    );
  }


  createChart(){
    let sIndex = Number(this.index);
    let data;

    if(this.twoWeekChange == "N/A")
    {
      data = {
        //last two weeks
        
      };
    } 
    else 
    {
      var labels:any = [];
      var dataVals:any = [];
      try 
      {
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
      } 
      catch {}
    }


    const chart = new Chart(String(sIndex), {
      type: "line",
      data: data as ChartData,
      options: {
        responsive: false,
        animation: false,
        maintainAspectRatio:true,
        elements: {
          point:{
              radius: 0.1
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
      }
    });

    // Add chart instance to array
    this.charts.push(chart);
    }
  }

