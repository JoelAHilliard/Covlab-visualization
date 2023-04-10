import { HighContrastMode } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-all-symtpoms-pie-chart',
  templateUrl: './all-symtpoms-pie-chart.component.html',
  styleUrls: ['./all-symtpoms-pie-chart.component.scss']
})
export class AllSymtpomsPieChartComponent {
    symptoms = 
      {
        "Fever": 47.76,
        "Headache": 34.33,
        "Cough": 32.84,
        "Shortness of breath": 25.37,
        "Generalised body aches": 25.37,
        "Difficulty breathing": 23.88,
        "Fatigue": 23.88,
        "Sensory disorder of smell and/or taste": 22.39,
        "Sore throat": 20.90,
        "Pain": 19.40,
        "Chill": 14.93,
        "Personal care assessment": 14.93,
        "Emotional state": 13.43,
        "Muscle pain": 11.94,
        "Drug therapy": 11.94,
        "Dry cough": 10.45,
        "Eye pain": 10.45,
        "Sweating": 8.96,
        "Nose running": 8.96,
        "Nausea": 8.96,
        "Lethargy": 8.96,
        "Difficulty sleeping": 8.96,
        "Therapy": 8.96,
        "Loss of appetite": 7.46,
        "Ear finding": 7.46,
        "Persistent cough": 5.97,
        "Vomiting": 5.97,
        "Diarrhea": 5.97,
        "Sinus pain": 5.97,
        "Dizzy": 5.97,
        "Hallucinations": 5.97,
        // "Complementary therapy": 5.97,
        // "Organic food": 5.97,
        // "Therapeutic diet": 5.97,
        // "Nosebleed": 4.48,
        // "Antibiotic": 4.48,
        // "Vitamin": 4.48,
        // "Excessive sweating": 2.99,
        // "Lymphadenopathy": 2.99,
        // "Productive cough": 2.99,
        // "Photophobia": 2.99,
        // "Urine volume finding": 2.99,
        // "Non-opioid analgesic": 2.99,
        // "Chloroquine": 2.99,
        // "Sneeze": 1.49,
        // "Joint pain": 1.49,
        // "Skin finding": 1.49,
        // "Blood coagulation disorder": 1.49
        }

    chartData = Object.entries(this.symptoms).map(([name, y]) => ({ name, y}));

    ngOnInit(){
      this.drawPieChart(this.chartData);
    }


    drawPieChart(symptom_data: any){
      const options: Highcharts.Options = {
        title: {
          text: "All Symptoms",
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
          renderTo: "all-symptoms-pie-chart",
          reflow: true,
        },
        series: [
          {
            name: "Covlab Tweet Labelling",
            borderRadius: 10,
            type: "pie",
            data: symptom_data,
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
      Highcharts.chart(options);
    }
}
