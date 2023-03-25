import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import { AfterViewInit, Component, OnInit } from '@angular/core';
HighchartsSankey(Highcharts);
@Component({
  selector: 'app-symptom-relationship',
  templateUrl: './symptom-relationship.component.html',
  styleUrls: ['./symptom-relationship.component.scss']
})
export class SymptomRelationshipComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        this.createChart()
    }
  

  createChart(){
    console.log('hrer')
    
    const chartOptions:any = {
        chart: {
          type: 'sankey',
          renderTo: 'container',
        },
        series: [
          {
            type: 'sankey',
            keys: ['from', 'to', 'weight'],
            data: [
                ["114027", "109894", 12],
                ["114200", "109894", 2],
                ["116353", "109894", 11],
                ["119196", "109894", 2],
                ["125228", "109894", 1],
                ["126258", "109894", 36],
                ["159876", "109894", 3],
                ["114027", "113326", 1],
                ["114200", "113326", 1],
                ["116353", "113326", 4],
                ["126258", "113326", 11],
                ["125228", "113504", 2],
                ["126258", "113504", 14],
                ["114200", "114027", 2],
                ["116353", "114027", 6],
                ["125228", "114027", 3],
                ["126213", "114027", 1],
                ["126258", "114027", 29],
                ["159876", "114027", 3],
                ["116353", "114200", 1],
                ["126258", "114200", 7],
                ["119196", "116353", 2],
                ["125228", "116353", 1]
              
        ],
            nodes: [
                {
                  "id": "114200",
                  "code": "SPANSH 30",
                  "name": "Upper-level Spanish: Four Countries and their Cultures"
                },
                {
                  "id": "126213",
                  "code": "SCILIVSY 20",
                  "name": "Psychological Science"
                },
                {
                  "id": "159876",
                  "code": "ARABIC AB",
                  "name": "Elementary Arabic II"
                },
                {
                  "id": "119196",
                  "code": "MATH 21A",
                  "name": "Multivariable Calculus"
                },
                {
                  "id": "113504",
                  "code": "GOV 97",
                  "name": "Tutorial - Sophomore Year"
                },
                {
                  "id": "114027",
                  "code": "STAT 104",
                  "name": "Introduction to Quantitative Methods for Economics"
                },
                {
                  "id": "125228",
                  "code": "GOV 1359",
                  "name": "The Road to the White House"
                },
                {
                  "id": "113326",
                  "code": "ECON 10A",
                  "name": "Principles of Economics"
                },
                {
                  "id": "109894",
                  "code": "ECON 10B",
                  "name": "Principles of Economics"
                },
                {
                  "id": "126258",
                  "code": "GOV 40",
                  "name": "International Conflict and Cooperation"
                },
                {
                  "id": "116353",
                  "code": "EXPOS 20",
                  "name": "Expository Writing 20"
                }
              ], 

            name: 'Dependency wheel series',
            dataLabels: {
              enabled: false,
            },
            size: '95%'
        }]
      };
      
      const chart = Highcharts.chart(chartOptions);
    }

  }

