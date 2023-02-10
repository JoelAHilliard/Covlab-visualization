import { sameBounds } from '@amcharts/amcharts5/.internal/core/util/Utils';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Chart } from 'chart.js';
import * as Highcharts from 'highcharts';
import { TableGraphComponent } from '../table-graph/table-graph.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() apiData:any = []

  data:any = []

  
  columndefs : string[] = ['state','weeklyAverage','weeklyNewCasesPer1k','twoWeekChange',
  'testPositivity'];

 
  
  ngOnInit(): void {

    console.log(this.apiData)

    let usAggregateData = {
      state:"United States",
      dailyCases:0,
      twoWeekChangeCases:0,
      testPositivity:0,

      hospitaliedDaily:0,

      hospitalizedPer100k:0,
      twoWeekChangeHospitalized:0,
      deathsDailyAvg:0,
      deathsPer100k:0,
      per100k:0,
      fullyVaccinated:0,

    }

    
    const sampleData = [
      {
        id:1,
        country: "America",
        data: [
          {
            state: "Tennessee",
            dailyCases: 104,
            per100k: 2,
            twoWeekChangeCases: -27,
            testPositivity: 12,
            hospitaliedDaily: 600,
            hospitalizedPer100k: 12,
            twoWeekChangeHospitalized: -25,
            deathsDailyAvg: 11.6,
            deathsPer100k: 0.25,
            fullyVaccinated: 68
          },
          {
            state: "California",
            dailyCases: 320,
            per100k: 5,
            twoWeekChangeCases: 20,
            testPositivity: 8,
            hospitaliedDaily: 1000,
            hospitalizedPer100k: 15,
            twoWeekChangeHospitalized: 10,
            deathsDailyAvg: 25,
            deathsPer100k: 0.5,
            fullyVaccinated: 72
          },
          {
            state: "New York",
            dailyCases: 220,
            per100k: 3,
            twoWeekChangeCases: -10,
            testPositivity: 10,
            hospitaliedDaily: 800,
            hospitalizedPer100k: 10,
            twoWeekChangeHospitalized: -15,
            deathsDailyAvg: 20,
            deathsPer100k: 0.4,
            fullyVaccinated: 70
          },
          {
            state: "Texas",
            dailyCases: 150,
            per100k: 2,
            twoWeekChangeCases: 10,
            testPositivity: 5,
            hospitaliedDaily: 600,
            hospitalizedPer100k: 8,
            twoWeekChangeHospitalized: 5,
            deathsDailyAvg: 15,
            deathsPer100k: 0.3,
            fullyVaccinated: 68
            },
            {
              state: "Florida",
              dailyCases: 180,
              per100k: 4,
              twoWeekChangeCases: 20,
              testPositivity: 7,
              hospitaliedDaily: 700,
              hospitalizedPer100k: 12,
              twoWeekChangeHospitalized: 8,
              deathsDailyAvg: 17,
              deathsPer100k: 0.35,
              fullyVaccinated: 69
            },
            {
              state: "Illinois",
              dailyCases: 140,
              per100k: 2,
              twoWeekChangeCases: -5,
              testPositivity: 9,
              hospitaliedDaily: 550,
              hospitalizedPer100k: 9,
              twoWeekChangeHospitalized: -10,
              deathsDailyAvg: 12,
              deathsPer100k: 0.25,
              fullyVaccinated: 71
            },
            {
              state: "Pennsylvania",
              dailyCases: 250,
              per100k: 3,
              twoWeekChangeCases: 10,
              testPositivity: 8,
              hospitaliedDaily: 800,
              hospitalizedPer100k: 7,
              twoWeekChangeHospitalized: 3,
              deathsDailyAvg: 20,
              deathsPer100k: 0.4,
              fullyVaccinated: 71
            },
            {
              state: "Ohio",
              dailyCases: 200,
              per100k: 2,
              twoWeekChangeCases: 5,
              testPositivity: 7,
              hospitaliedDaily: 700,
              hospitalizedPer100k: 6,
              twoWeekChangeHospitalized: 2,
              deathsDailyAvg: 15,
              deathsPer100k: 0.3,
              fullyVaccinated: 72
            },
            {
              state: "Georgia",
              dailyCases: 150,
              per100k: 2,
              twoWeekChangeCases: 0,
              testPositivity: 6,
              hospitaliedDaily: 600,
              hospitalizedPer100k: 5,
              twoWeekChangeHospitalized: 0,
              deathsDailyAvg: 10,
              deathsPer100k: 0.2,
              fullyVaccinated: 73
            },
            {
              state: "North Carolina",
              dailyCases: 125,
              per100k: 1,
              twoWeekChangeCases: -5,
              testPositivity: 5,
              hospitaliedDaily: 500,
              hospitalizedPer100k: 4,
              twoWeekChangeHospitalized: -1,
              deathsDailyAvg: 8,
              deathsPer100k: 0.2,
              fullyVaccinated: 75
            }
        ]
      },
      {
        country: "Canada",
        id:2,
        data: [
          {
            state: "Ontario",
            dailyCases: 120,
            per100k: 2,
            twoWeekChangeCases: 10,
            testPositivity: 11,
            hospitaliedDaily: 500,
            hospitalizedPer100k: 8,
            twoWeekChangeHospitalized: 5,
            deathsDailyAvg: 12,
            deathsPer100k: 0.2,
            fullyVaccinated: 65
          },
          {
            state: "British Columbia",
            dailyCases: 150,
            per100k: 2.5,
            twoWeekChangeCases: 15,
            testPositivity: 9,
            hospitaliedDaily: 550,
            hospitalizedPer100k: 9,
            twoWeekChangeHospitalized: 8,
            deathsDailyAvg: 14,
            deathsPer100k: 0.25,
            fullyVaccinated: 67
          },
          {
            state: "Quebec",
            dailyCases: 100,
            per100k: 1.5,
            twoWeekChangeCases: 5,
            testPositivity: 10,
            hospitaliedDaily: 450,
            hospitalizedPer100k: 7,
            twoWeekChangeHospitalized: 3,
            deathsDailyAvg: 10,
            deathsPer100k: 0.15,
            fullyVaccinated: 63
          }
        ]
      }
    ];


    
    sampleData[0].data.forEach((element:any)=>{
      usAggregateData.dailyCases += element.dailyCases;
      usAggregateData.twoWeekChangeCases += element.twoWeekChangeCases;
      usAggregateData.testPositivity += element.testPositivity;
      usAggregateData.hospitaliedDaily += element.hospitaliedDaily;
      usAggregateData.fullyVaccinated += element.fullyVaccinated;
      usAggregateData.hospitalizedPer100k += element.hospitalizedPer100k;
      usAggregateData.twoWeekChangeHospitalized += element.twoWeekChangeHospitalized;
      usAggregateData.deathsDailyAvg += element.deathsDailyAvg;
      usAggregateData.deathsPer100k += element.deathsPer100k;
      usAggregateData.per100k += element.per100k;
    })

    sampleData[0].data.unshift(usAggregateData);
    

    this.data = sampleData[0].data;

    

  }


  updateData(event:any){

  }
}
