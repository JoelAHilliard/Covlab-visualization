import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-reinfection-proportion-graph',
  templateUrl: './reinfection-proportion-graph.component.html',
  styleUrls: ['./reinfection-proportion-graph.component.scss']
})
export class ReinfectionProportionGraphComponent {

  data = {
    "categories": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "series": [
      {
        "name": "Number of Patients",
        "type": "column",
        "data": [50, 60, 70, 90, 150, 200, 320, 240, 150, 75],
        "yAxis":'numPatients'
      },
      {
        "name": "Percentage",
        "type": "line",
        "data": [3.56, 4.27, 4.98, 6.41, 10.68, 14.23, 22.78, 17.08, 10.68, 5.34],
        "tooltip": {
          "valueSuffix": "%"
        },
        "yAxis":'pct',
        
      }
    ]
  }

  
  ngOnInit(): void {
    this.createChart(this.data)
  }


  createChart(data:any){
    const options: Highcharts.Options = {
      chart: {
          renderTo:'reinfection-chart'
      },
      credits: {
        text:"covlab.tech"
      },
      title: {
        text: 'Recovered Patients and Percentage'
      },
      xAxis: [{
        categories: data.categories,
        crosshair: true,
        visible:true,
        labels:{
          
        },
        title:{
          text:"Reinfection times"
        }
        
      }],
      yAxis: [
        {
          id:"numPatients",
          title: {
            text: 'Number of Patients'
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
