import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { timeHours } from 'd3-time';

@Component({
  selector: 'cases-countries',
  templateUrl: './cases-countries-line.component.html',
  styleUrls: ['./cases-countries-line.component.scss']
})

export class CasesCountries implements OnInit {

  chart: any;

  days: String[] = [];
 
  startDate = new Date(2023, 3, 1);
  endDate = new Date(2023, 5, 1);

  dateRange: Date[] = this.createDateRange(this.startDate,this.endDate);

  minValue: number = this.dateRange[0].getTime();
  maxValue: number = this.dateRange[this.dateRange.length-1].getTime();
  
  value: number = this.dateRange[0].getTime();
  
  options: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    }
  
  };

  selectedGroup = [""];

  createDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }



  dataAmerican = {
    label: 'America',
    data: [45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 14, 45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 3,
    pointHoverBackgroundColor: 'black',
    yAxisID:"y"
  }

  tweetCountAmerican = {
    label: 'USA Tweets',
    data: [125, 135, 14, 45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,45, 35, 60, 70, 80, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115],
    backgroundColor: 'rgb(105,105,105)',
    borderColor: 'rgb(105,105,105)',
    borderWidth: 1,
    pointHoverBackgroundColor: 'black',
    yAxisID:"tweetCount",
    type:"bar"

  }
  
  dataUK = {
    label: 'United Kingdom',
    data: [25, 65, 80, 60, 70, 30, 55, 75, 95, 105, 115, 100, 90, 45, 35, 20, 10, 15, 55, 140, 50, 110, 130, 120, 145, 135, 105, 90, 75, 45, 35, 65, 50, 40, 20, 10, 15, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145,90, 45, 35, 20, 10, 15, 55, 140, 50,90, 45, 35, 20],
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderColor: 'rgba(255, 0, 0, 1)',
    borderWidth: 3,
    pointHoverBackgroundColor: 'black',
    yAxisID:"y"
  }

  //replace with dynamic data
  dataFromAPI = [this.dataAmerican,this.dataUK,this.tweetCountAmerican]

  ngOnInit(): void {    
    const startDate = new Date(2023, 3, 1);
    const endDate = new Date(2023, 5, 1);

    this.days = this.setDateData(startDate,endDate);

    this.createChart(["All"]);
   
  }


  updateDate(event: any) {
    console.log(event)
    this.days = this.setDateData(new Date(event.value), new Date(event.highValue));
    this.recreateChart(this.selectedGroup);
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
    this.selectedGroup = type;
    // if 1 or less user filters, use a swicth
    if(type.length == 1){
      switch (type[0]){
        case "All":
          return this.dataFromAPI;
        case "America":
          return [this.dataAmerican,this.tweetCountAmerican];
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

    

    if(type.length == 0){
      type = ['All'];
    }

    this.createChart(type);
  }

  onSliderChange(value: any){
    console.log(value)
  }
  // code that creates the chart
  createChart(type:any){
    
    var showSecondYAxis = false;

    if(type[0] == 'All' || type[0] == 'America'){
      showSecondYAxis = true;
    }


    const config = {
      labels: this.days,
      // here is where the data is dynamically loaded
      datasets:this.generateDatasets(type)
    };
    
    this.chart = new Chart('canvas', {
      type:'line',
      data:config,
      options: {
        
        maintainAspectRatio: true,
        plugins: {
          // annotation: {
          //   annotations: {
          //     line1: {
          //       type: 'line',
          //       yMin: 60,
          //       yMax: 60,
          //       borderColor: 'rgb(255, 99, 132)',
          //       borderWidth: 2,
          //     }
          //   }
          // },
          tooltip :{
            enabled:true
          },
          title: {
            display: true,
            text: 'Positive Cases by Country',
            font: {
              size: 20
            }
          },
          legend: {
            onClick: function(event, legendItem) {},
              labels: {
                  font: {
                      size: 18
                  }
              }
          }
        },
        scales: {
          tweetCount: {
            display:showSecondYAxis,
            position:'right',
            title: {
              display:true,
              text:'Tweet Count',
              font: {
                size: 15
              }
            }
          },
       
          y: { title: {
                display: true,
                text: 'Confirmed Cases',
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
