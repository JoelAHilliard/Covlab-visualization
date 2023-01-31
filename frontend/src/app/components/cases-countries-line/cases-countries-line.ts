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

  constructor() { }

  ngOnInit(): void {
    const startDate = new Date(2023, 3, 1);
    const endDate = new Date(2023, 5, 1);

    this.days = this.setDateData(startDate,endDate);

    const config = {
        labels: this.days,
        datasets: [
            {
              label: 'America',
              data: [45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 14, 45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              pointHoverBackgroundColor: 'black'
           },
           {
            label: 'United Kingdom',
            data: [25, 65, 80, 60, 70, 30, 55, 75, 95, 105, 115, 100, 90, 45, 35, 20, 10, 15, 55, 140, 50, 110, 130, 120, 145, 135, 105, 90, 75, 45, 35, 65, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,90, 45, 35, 20, 10, 15, 55, 140, 50,90, 45, 35, 20],
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            pointHoverBackgroundColor: 'black'

         }

      ]
    };
     

    this.createChart(config);
   
  }

  setDateData(startDate: Date,endDate: Date){
    var days = []
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
  
  createChart(data: any){
    this.chart = new Chart('canvas', {
      type:'line',
      data:data,
    
      options: {
        responsive: true,
          
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
