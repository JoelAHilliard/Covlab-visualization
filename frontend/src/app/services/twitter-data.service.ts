import { Injectable } from '@angular/core';
import { TwitterData } from '../interfaces/covid-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-variable';
import { BaseOverlayDispatcher } from '@angular/cdk/overlay/dispatchers/base-overlay-dispatcher';

@Injectable({
  providedIn: 'root'
})
export class TwitterDataService {

  apiDomain= GlobalConstants.apiDomain;
  apiPort = GlobalConstants.apiPort;

  apiURL = this.apiDomain+ ":"+this.apiPort;


  constructor(private http:HttpClient) { }
  getRelatedWords(word: string): any {
    const relatedWordsURL = "https://labelling.covlab.tech/word"


    const body = new URLSearchParams();

    body.set('word',word)
    
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };
    
    return this.http.post<any[]>(relatedWordsURL, body.toString(), options);

  }
  getSource(): any {
    return this.http.get<TwitterData[]>(this.apiURL + "/source?key=source");
  }

  getModelResult(): any {
    return this.http.get<TwitterData[]>(this.apiURL + "/source?key=model_label_result");
  }

  getWeeklyAvgPositiveCases(year: string): any {
    return this.http.get<any[]>(this.apiURL + "/dailyPositiveNumber?year="+year);
  }

 
  
}
