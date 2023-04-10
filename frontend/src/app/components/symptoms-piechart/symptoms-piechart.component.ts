import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
@Component({
  selector: 'app-symptoms-piechart',
  templateUrl: './symptoms-piechart.component.html',
  styleUrls: ['./symptoms-piechart.component.css']
})
export class SymptomsPiechartComponent {


  symptom_data = {
    "Fever": 0.477612,
    "Headache": 0.343284,
    "Cough": 0.328358,
    "Shortness of breath": 0.253731,
    "Generalised body aches": 0.253731,
    "Difficulty breathing": 0.238806,
    "Fatigue": 0.238806,
    "Sensory disorder of smell and/or taste": 0.223881,
    "Sore throat": 0.208955,
    "Pain": 0.19403,
    "Chill": 0.149254,
    "Personal care assessment": 0.149254,
    "Emotional state": 0.134328,
    "Muscle pain": 0.119403,
    "Drug therapy": 0.119403,
    "Dry cough": 0.104478,
    "Eye pain": 0.104478,
    "Sweating": 0.089552,
    "Nose running": 0.089552
  }


  chartData = Object.entries(this.symptom_data).map(([name, y]) => ({ name, y: y * 100 }));


  ngOnInit(): void {
    
    this.createChart(this.chartData)
  }

  
  //grab data from api
  
  //draw pie chart
  createChart(data: any) {
  
  
    const options: Highcharts.Options = {
      title: {
        text: "Top 10 Symptoms",
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },
      credits: {
        text:"covlab.tech"
      },
      chart: {
        type: "pie",
        renderTo: "container5",
        reflow: true,
      },
      series: [
        {
          name: "Covlab Tweet Labelling",
          borderRadius: 10,
          type: "pie",
          data: data,
        },
      ],
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.y:.1f}%",
          },
        },
      },
    };
  
    new Highcharts.Chart(options);
  }
  
}


