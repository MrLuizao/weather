import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  apiKey = '6eeec067b220c72dea98a328542aac45';
  URI: string = '';

  constructor( private http: HttpClient) { 
    this.URI = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`
  }

  getDataWeather(city: string){
    return this.http.get(`${this.URI}${city}`) 
  }
  
}
