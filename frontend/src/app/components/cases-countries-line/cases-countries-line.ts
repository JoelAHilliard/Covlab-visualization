import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { timeHours } from 'd3-time';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'cases-countries',
  templateUrl: './cases-countries-line.component.html',
  styleUrls: ['./cases-countries-line.component.scss']
})

export class CasesCountries implements OnInit {


  highcharts: any;


  chart: any;

  chart1: any;

  days: string[] = [];

  lastValue: number = 0;

  lastHighestValue: number = 0;


  

  rawAmericanPositiveCases = this.generateRawCases();

  rawEuropePositiveCases = this.generateRawCases();

  rawAsiaPositiveCases = this.generateRawCases();


  rawDataSets = [this.rawAmericanPositiveCases,this.rawEuropePositiveCases,this.rawAsiaPositiveCases];

  leftSliderIndex: number = 0;

  rightSliderIndex: number = this.rawAmericanPositiveCases.length;

  dataAmerican = {
    label: 'America',
    data: this.rawAmericanPositiveCases,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 3,
    pointHoverBackgroundColor: 'black',
    yAxisID:"y"
  }

  tweetCountAmerican = {
    type:"line",
    label: 'USA Tweets',
    data: this.rawAsiaPositiveCases,
    backgroundColor: 'rgb(105,105,105)',
    borderColor: 'rgb(105,105,105)',
    borderWidth: 1,
    pointHoverBackgroundColor: 'black',
    yAxisID:"tweetCount",
    
  }
  
  dataUK = {
    label: 'United Kingdom',
    data:this.rawEuropePositiveCases,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderColor: 'rgba(255, 0, 0, 1)',
    borderWidth: 3,
    pointHoverBackgroundColor: 'black',
    yAxisID:"y"
  }

  //replace with dynamic data
  dataFromAPI = [this.dataAmerican,this.dataUK,this.tweetCountAmerican]

 
  startDate = new Date(2023, 3, 1);
  endDate = new Date(2023, 3, 15);

  dateRange: Date[] = this.createDateRange(this.startDate,this.endDate);

  minValue: number = this.dateRange[0].getTime();
  maxValue: number = this.dateRange[this.dateRange.length-1].getTime();
  
  value: number = this.dateRange[0].getTime();
  
  selectedGroup = [""];
  
  options: Options = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return new Date(value).toDateString();
    }
  
  };

  generateTweetCounts(){

    let rawAmericanPositiveCases = [];
    for (let i = 0; i < 15; i++) {
      let cases = Math.floor(Math.random() * 10000);
      rawAmericanPositiveCases.push(cases);
    }
    console.log(rawAmericanPositiveCases)
    return rawAmericanPositiveCases;
  }

  generateRawCases() {
  let rawAmericanPositiveCases = [];
  for (let i = 0; i < 15; i++) {
    let date = "4/" + (i + 1) + "/2023";
    let cases = Math.floor(Math.random() * 100000);
    rawAmericanPositiveCases.push([date, cases]);
  }
  return rawAmericanPositiveCases;
  }
  createDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  }



  
  ngOnInit(): void {    
    const startDate = new Date(2023, 3, 1);
    const endDate = new Date(2023, 3, 15);

    this.days = this.setDateData(startDate,endDate);

    console.log(this.days)

    this.createChart(["All"]);

    this.makeHighchart()
    
  }


  updateData(event: any) {    
    // left hand was moved
    if(event.pointerType == 0){
      //find index of where slider was left
      let index = 0;
      let date = new Date(event.value);
      // copy of data (this assumes that all data lengths are equal)
      let data = new Array(this.rawAmericanPositiveCases)[0];
      //copy of the x axis data
      let daysCopy = new Array(this.days)[0]
      
      //find correct index to slice the dataset at
      for (let i = 0;i<data.length;i++){
        if(data[i][0] === date.toLocaleDateString()){
          index = i;
        }
      }
      let counter = 0;
      /*var temp = document.getElementById("chartContainer").highcharts()*/
      this.chart.data.datasets.forEach((element:any) => {
        //find correct  raw data somehow and set it here
        element.data = this.rawDataSets[counter].slice(index,this.rightSliderIndex+1);
        counter++;
      });
      this.highcharts.xAxis[0].update({
        categories:daysCopy.slice(index,this.rightSliderIndex+1)
      })
      counter = 0
      this.highcharts.series.forEach((element:any) => {
        console.log(element)
        element.update({
          data: this.rawDataSets[counter].slice(index,this.rightSliderIndex+1)

        })
        counter++;
      });
      
      
      




      this.leftSliderIndex = index;


      //slice data (or a copy of it?) based on this index


    }
    
    // right hand was moved
    if(event.pointerType == 1){
      let index = 0;
      let date = new Date(event.highValue);
      // copy of data
      let data = new Array(this.rawAmericanPositiveCases)[0];

      for (let i = 0;i<data.length;i++){
        if(data[i][0] === date.toLocaleDateString()){
          index = i;
        }
      }

      if(index == 0){
        index = this.rightSliderIndex;
      }
      let counter = 0;
      this.chart.data.datasets.forEach((element:any) => {
        //find correct  raw data somehow and set it here
        element.data = this.rawDataSets[counter].slice(this.leftSliderIndex,index+1);
        counter++;
      });
      this.rightSliderIndex = index;

    }
    
   
    
    this.lastValue = event.value;
    this.lastHighestValue = event.lastHighestValue;
    this.createChart(this.selectedGroup);
    this.highcharts.redraw();
  }

  
  // generates custom datasets for the graph
  generateDatasets(type: string[]){

    // dataAmerican = {
    //   label: 'America',
    //   data: this.rawAmericanPositiveCases,
    //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //   borderColor: 'rgba(54, 162, 235, 1)',
    //   borderWidth: 3,
    //   pointHoverBackgroundColor: 'black',
    //   yAxisID:"y"
    // }
    this.selectedGroup = type;

    let counter = 0;

    let allData = [];

    // if 1 or less user filters, use a swicth
    if(type.length == 1){
      switch (type[0]){
        case "All":
          this.rawDataSets.forEach ((element) => {
            let data = {
              label: counter,
              data: element,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 3,
              pointHoverBackgroundColor: 'black',
              yAxisID:"y"
            }
            allData.push(data);
          })
          
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
  // code that creates the chart
  createChart(type:any){
    if(this.chart){
      this.chart.destroy();
    }
    var showSecondYAxis = false;

    if(type[0] == 'All' || type[0] == 'America'){
      showSecondYAxis = true;
    }


    const config = {
      // here is where the data is dynamically loaded
      datasets:this.generateDatasets(type)
    };

    this.chart = new Chart('canvas', {
      type:"line",
      data:config,
      options: {
        plugins: {
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
  setDateData(startDate: Date, endDate: Date){
    var days = []
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(d.toLocaleDateString());
    }
    return days;
  }
  

  makeHighchart(){
    this.highcharts = Highcharts.chart('chartContainer', {
      title: {
          text: 'Covtech Data',
          align: 'left'
      },
      navigator : {
          enabled:true
      },
      rangeSelector :{
        verticalAlign:'top',
        x:0,
        y:0,
        enabled:true
      },
      xAxis: {
          categories: this.days
      },
      yAxis: [{ // Primary yAxis
          labels: {
              
          },
          title: {
              text: 'Positive Cases',
            
          }
      },{ // Primary yAxis
      labels: {
          
      },
      title: {
          text: 'Tweets',
         
      },
      opposite:true
  }],
      tooltip: {
          valueSuffix: ' positive tests'
      },
      series: [
        {
          type: 'column',
          name: '2020',
          data: this.dataUK.data,
          yAxis:1
        }, 
        {
          type: 'spline',
          name: 'American Data',
          data: this.dataAmerican.data,
          marker: {
              lineWidth: 2,
              lineColor: "purple",
              fillColor: 'white'
          }
        },
        {
          type: 'spline',
          name: 'UK Data',
          data: this.dataUK.data,
          marker: {
              lineWidth: 2,
              lineColor: "purple",
              fillColor: 'white'
          }
        }
      ]
    }); 
  }
}
