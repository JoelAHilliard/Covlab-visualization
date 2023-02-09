import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PieChartData } from '../interfaces/covid-data';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  constructor(private http: HttpClient) { }

  
  async postData(): Promise<any> {
    const response = fetch('https://labelling.covlab.tech/statistics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    return await (await response).json();
  }
  
  getData(): any {
    //let covidData : CovidData[] = [] 
    // this.http.get<CovidData[]>("https://api.covidtracking.com/v1/states/current.json").subscribe((data) => {     
    // //console.log(data);
    //   data.forEach(element => {
    //     covidData.push({
    //       date: element.date,
    //       state: element.state,
    //       negative: element.negative,
    //       positive: element.positive,
    //       probableCases: element.probableCases
    //     })
    //   });       
    // });
    // return covidData;
    return this.http.post<PieChartData>("https://labelling.covlab.tech/statistics",{});
  }

  //readJson(){
    //this.http.get('./assets/tweetWeb.json').subscribe(data => console.log(data));
   // var file = new File([],'C:\\Users\\saiak\\Downloads\\tweetWeb.json');
   // var fileReader = new FileReader();
    //fileReader.
    //file.text().then(d => {console.log(d.toString()); console.log(d.length);})

  //}
}
