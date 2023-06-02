import { AfterViewInit, Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsSankey from 'highcharts/modules/sankey';
import Boost from 'highcharts/modules/boost';

import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';

// import data from './all_syptoms_relationship.json';

const relatedSymtomData: any = {"data":[['Fever', 'Headache', 19], ['Fever', 'Cough', 19], ['Fever', 'Shortness of breath', 15], ['Fever', 'Generalised body aches', 16], ['Fever', 'Difficulty breathing', 15], ['Fever', 'Fatigue', 14], ['Fever', 'Sensory disorder of smell and/or taste', 8], ['Fever', 'Sore throat', 13], ['Fever', 'Pain', 12], ['Fever', 'Chill ', 10], ['Fever', 'Personal care assessment', 5], ['Fever', 'Emotional state', 7], ['Fever', 'Muscle pain', 8], ['Fever', 'Drug therapy', 7], ['Fever', 'Dry cough', 7], ['Fever', 'Eye pain', 7], ['Fever', 'Sweating', 6], ['Fever', 'Nose running', 5], ['Fever', 'Nausea', 5], ['Fever', 'Lethargy', 6], ['Fever', 'Difficulty sleeping', 6], ['Fever', 'Therapy', 5], ['Fever', 'Loss of appetite', 4], ['Fever', 'Ear finding', 4], ['Fever', 'Persistent cough', 4], ['Fever', 'Vomiting', 3], ['Fever', 'Diarrhea', 1], ['Fever', 'Sinus pain', 3], ['Fever', 'Dizzy', 4], ['Fever', 'Hallucinations', 4], ['Fever', 'Complementary therapy', 2], ['Fever', 'Organic food', 2], ['Fever', 'Therapeutic diet', 4], ['Fever', 'Nosebleed', 2], ['Fever', 'Antibiotic', 3], ['Fever', 'Vitamin', 2], ['Fever', 'Excessive sweating', 2], ['Fever', 'Lymphadenopathy', 2], ['Fever', 'Productive cough', 2], ['Fever', 'Photophobia', 2], ['Fever', 'Urine volume finding', 1], ['Fever', 'Non-opioid analgesic', 2], ['Fever', 'Chloroquine', 1], ['Fever', 'Sneeze', 1], ['Fever', 'Joint pain', 1], ['Fever', 'Skin finding', 1], ['Fever', 'Blood coagulation disorder', 1], ['Fever', 'Cardiovascular', 1], ['Fever', 'NSAID', 1], ['Fever', 'Ibuprofen', 1], ['Fever', 'Amoxicillin', 1], ['Fever', 'Bronchodilator', 0], ['Fever', 'Mineral', 1], ['Headache', 'Cough', 16], ['Headache', 'Shortness of breath', 12], ['Headache', 'Generalised body aches', 11], ['Headache', 'Difficulty breathing', 11], ['Headache', 'Fatigue', 10], ['Headache', 'Sensory disorder of smell and/or taste', 6], ['Headache', 'Sore throat', 12], ['Headache', 'Pain', 9], ['Headache', 'Chill ', 8], ['Headache', 'Personal care assessment', 3], ['Headache', 'Emotional state', 5], ['Headache', 'Muscle pain', 6], ['Headache', 'Drug therapy', 8], ['Headache', 'Dry cough', 5], ['Headache', 'Eye pain', 6], ['Headache', 'Sweating', 3], ['Headache', 'Nose running', 4], ['Headache', 'Nausea', 5], ['Headache', 'Lethargy', 5], ['Headache', 'Difficulty sleeping', 6], ['Headache', 'Therapy', 5], ['Headache', 'Loss of appetite', 4], ['Headache', 'Ear finding', 3], ['Headache', 'Persistent cough', 2], ['Headache', 'Vomiting', 3], ['Headache', 'Diarrhea', 0], ['Headache', 'Sinus pain', 4], ['Headache', 'Dizzy', 4], ['Headache', 'Hallucinations', 4], ['Headache', 'Complementary therapy', 2], ['Headache', 'Organic food', 3], ['Headache', 'Therapeutic diet', 4], ['Headache', 'Nosebleed', 3], ['Headache', 'Antibiotic', 3], ['Headache', 'Vitamin', 2], ['Headache', 'Excessive sweating', 2], ['Headache', 'Lymphadenopathy', 2], ['Headache', 'Productive cough', 1], ['Headache', 'Photophobia', 2], ['Headache', 'Urine volume finding', 0], ['Headache', 'Non-opioid analgesic', 2], ['Headache', 'Chloroquine', 1], ['Headache', 'Sneeze', 1], ['Headache', 'Joint pain', 0], ['Headache', 'Skin finding', 1], ['Headache', 'Blood coagulation disorder', 0], ['Headache', 'Cardiovascular', 1], ['Headache', 'NSAID', 1], ['Headache', 'Ibuprofen', 1], ['Headache', 'Amoxicillin', 1], ['Headache', 'Bronchodilator', 0], ['Headache', 'Mineral', 1], ['Cough', 'Shortness of breath', 13], ['Cough', 'Generalised body aches', 10], ['Cough', 'Difficulty breathing', 11], ['Cough', 'Fatigue', 8], ['Cough', 'Sensory disorder of smell and/or taste', 4], ['Cough', 'Sore throat', 9], ['Cough', 'Pain', 7], ['Cough', 'Chill ', 9], ['Cough', 'Personal care assessment', 4], ['Cough', 'Emotional state', 4], ['Cough', 'Muscle pain', 6], ['Cough', 'Drug therapy', 7], ['Cough', 'Dry cough', 6], ['Cough', 'Eye pain', 4], ['Cough', 'Sweating', 4], ['Cough', 'Nose running', 3], ['Cough', 'Nausea', 3], ['Cough', 'Lethargy', 5], ['Cough', 'Difficulty sleeping', 5], ['Cough', 'Therapy', 3], ['Cough', 'Loss of appetite', 4], ['Cough', 'Ear finding', 4], ['Cough', 'Persistent cough', 4], ['Cough', 'Vomiting', 2], ['Cough', 'Diarrhea', 1], ['Cough', 'Sinus pain', 2], ['Cough', 'Dizzy', 4], ['Cough', 'Hallucinations', 2], ['Cough', 'Complementary therapy', 2], ['Cough', 'Organic food', 3], ['Cough', 'Therapeutic diet', 4], ['Cough', 'Nosebleed', 1], ['Cough', 'Antibiotic', 3], ['Cough', 'Vitamin', 1], ['Cough', 'Excessive sweating', 2], ['Cough', 'Lymphadenopathy', 1], ['Cough', 'Productive cough', 2], ['Cough', 'Photophobia', 1], ['Cough', 'Urine volume finding', 0], ['Cough', 'Non-opioid analgesic', 1], ['Cough', 'Chloroquine', 2], ['Cough', 'Sneeze', 0], ['Cough', 'Joint pain', 0], ['Cough', 'Skin finding', 1], ['Cough', 'Blood coagulation disorder', 0], ['Cough', 'Cardiovascular', 1], ['Cough', 'NSAID', 1], ['Cough', 'Ibuprofen', 1], ['Cough', 'Amoxicillin', 1], ['Cough', 'Bronchodilator', 1], ['Cough', 'Mineral', 1], ['Shortness of breath', 'Generalised body aches', 9], ['Shortness of breath', 'Difficulty breathing', 12], ['Shortness of breath', 'Fatigue', 8], ['Shortness of breath', 'Sensory disorder of smell and/or taste', 4], ['Shortness of breath', 'Sore throat', 8], ['Shortness of breath', 'Pain', 6], ['Shortness of breath', 'Chill ', 7], ['Shortness of breath', 'Personal care assessment', 3], ['Shortness of breath', 'Emotional state', 4], ['Shortness of breath', 'Muscle pain', 7], ['Shortness of breath', 'Drug therapy', 5], ['Shortness of breath', 'Dry cough', 4], ['Shortness of breath', 'Eye pain', 5], ['Shortness of breath', 'Sweating', 3], ['Shortness of breath', 'Nose running', 4], ['Shortness of breath', 'Nausea', 4], ['Shortness of breath', 'Lethargy', 6], ['Shortness of breath', 'Difficulty sleeping', 6], ['Shortness of breath', 'Therapy', 3]]}



// console.log(largeDataArray);

HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsSankey(Highcharts);
HighchartsDependencyWheel(Highcharts);
Boost(Highcharts);
@Component({
  selector: 'app-symptom-relationship',
  templateUrl: './symptom-relationship.component.html',
  styleUrls: ['./symptom-relationship.component.scss']
})


export class SymptomRelationshipComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Related Symptoms',
      
  },
  credits: {
    text:"covlab.tech"
  },
  boost:{
    enabled:true
  },

  
  accessibility: {
      point: {
          valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
      }
  },

  series: [{
      keys: ['from', 'to', 'weight'],
      data: relatedSymtomData.data,
      type: 'dependencywheel',
      name: 'Relationship',
      dataLabels: {
        enabled:false,
          color: '#333',
          style: {
              textOutline: 'none'
          },
          textPath: {
            enabled: true,
            attributes: {
              dy: 5
            }
          },
          distance: 10,
          
      },
      size: '95%',
      turboThreshold:500,
      animation:false
  }]

  };
}
