import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
@Component({
  selector: 'cases-countries',
  templateUrl: './cases-countries-line.component.html',
  styleUrls: ['./cases-countries-line.component.scss']
})

export class CasesCountries implements OnInit {
  chart: any;

  days: String[] = [];


  dataAmerican = {
    label: 'America',
    data: [45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 14, 45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    pointHoverBackgroundColor: 'black'
  }
  
  dataUK = {
    label: 'United Kingdom',
    data: [25, 65, 80, 60, 70, 30, 55, 75, 95, 105, 115, 100, 90, 45, 35, 20, 10, 15, 55, 140, 50, 110, 130, 120, 145, 135, 105, 90, 75, 45, 35, 65, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,90, 45, 35, 20, 10, 15, 55, 140, 50,90, 45, 35, 20],
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderColor: 'rgba(255, 0, 0, 1)',
    borderWidth: 1,
    pointHoverBackgroundColor: 'black'
  }

  dataFromAPI = [this.dataAmerican,this.dataUK]

  ngOnInit(): void {    
    const startDate = new Date(2023, 3, 1);
    const endDate = new Date(2023, 5, 1);

    this.days = this.setDateData(startDate,endDate);
    this.createChart(["All"]);
   
  }

  setDateData(startDate: Date, endDate: Date){
    var days = []
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
  // generates custom datasets for the graph
  generateDatasets(type: string[]){

    // if 1 or less user filters, use a swicth
    if(type.length == 1){
      switch (type[0]){
        case "All":
          return this.dataFromAPI;
        case "America":
          return [this.dataAmerican];
        case "United Kingdom":
          return [this.dataUK];
        default:
          return this.dataFromAPI;
      }
    } 
    // filter from the data reveived based on if the users wants to see it
    else {
      return this.dataFromAPI.filter(dataset => type.some(a => dataset.label.includes(a)));
    }
  }
  // this is called on user input, when they select their data set
  recreateChart(type:any){
    // must destroy chart before reloading
    this.chart.destroy();
    this.createChart(type);
  }
  // code that creates the chart
  createChart(type:any){
    const config = {
      labels: this.days,
      // here is where the data is dynamically loaded
      datasets:this.generateDatasets(type)
    };
    
    this.chart = new Chart('canvas', {
      type:'line',
      data:config,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
              labels: {
                  font: {
                      size: 18
                  }
              }
          }
        },
        scales: {
          y: { title: {
                display: true,
                text: 'Cases',
                font: {
                  size: 15
                }
              }
          },
          x: { title: {
                display: true,
                text: 'Date',
                font: {
                  size: 15
                }
              }
            }
        }        
      }
    });
  }
}
