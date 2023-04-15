import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-recovery-time-chart',
  templateUrl: './recovery-time-chart.component.html',
  styleUrls: ['./recovery-time-chart.component.css']
})
export class RecoveryTimeChartComponent implements OnInit{
  

 
  chart_data = {
    "categories": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "series": [
      {
        "name": "Number of Patients",
        "type": "column",
        "data": [50, 60, 70, 90, 150, 200, 320, 240, 150, 75],
        "yAxis":'patientProportion'
      },
      {
        "name": "Percentage",
        "type": "line",
        "data": [3.56, 4.27, 4.98, 6.41, 10.68, 14.23, 22.78, 17.08, 10.68, 5.34],
        "tooltip": {
          "valueSuffix": "%"
        },
        "yAxis":'pct'
      }
    ]
  }

  
  ngOnInit(): void {
    this.createChart(this.chart_data)
  }


  createChart(data:any){
    const options: Highcharts.Options = {
      chart: {
          renderTo:'recover-container'
      },
      credits: {
        text:"covlab.tech"
      },
      title: {
        text: 'Reinfection times & Proportion'
      },
      xAxis: [{
        categories: data.categories,
        crosshair: true,
        visible:false,
        labels:{
        },
        title:{
          text:"Recovered Days"
        }
      }],
      yAxis: [
        {
          id:"patientProportion",
          title: {
            text: 'Patient Proportion'
          },
          
          
        },
        {id:"pct",
          title: {
            text: 'Percentage'
          },
          labels: {
            format: '{value}%'
          },
          visible:true,
          opposite: true
        }
      ],
      tooltip: {
        formatter: function() {
          let value = this.point.y;
          let title = this.series.yAxis.options.title?.text;
          return `${title}: ${value}`;
        }
      },
      series: data.series,
      colors:["darkred","black"]
    };

    Highcharts.chart(options);
  }

}
