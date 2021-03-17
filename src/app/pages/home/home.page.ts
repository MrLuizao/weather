import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiWeatherService } from 'src/app/services/api-weather.service';
import { WeatherdataModel } from 'src/app/models/weather-data.model'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  weatherModel: WeatherdataModel = new WeatherdataModel();
  city: string = '';
  showCard: boolean = false;
  temp_celcius: string;
  min_celcius: string;
  max_celcius: string;

  constructor( private weatherService: ApiWeatherService, public toastController: ToastController,) { }

  ngOnInit() {    
  }

  async snackNotFoundCity() {
    const toast = await this.toastController.create({
      header: '¡No existe la ciudad!',
      position: 'bottom',
      message: 'Verifica los datos ingresados  🙏🏻',
      duration: 2500,
      color: 'primary'
    });
    toast.present();
  }

  async snackEmptyInput() {
    const toast = await this.toastController.create({
      header: '¡No hay datos!',
      position: 'bottom',
      message: 'Ingresa un nombre en el campo de búsqueda  📲',
      duration: 2500,
      color: 'primary'
    });
    toast.present();
  }

  searchCity(form: NgForm){
    if(form.invalid){
      this.snackEmptyInput();
      return
    }

    this.city = this.weatherModel.city
    console.log('city input:',this.city);

    this.weatherService.getDataWeather(this.city).subscribe( (data:WeatherdataModel) =>{
      this.showCard = true;
      this.weatherModel = data
      console.log('resp:', this.weatherModel);

      let sunsetTime = new Date(this.weatherModel.sys.sunset * 1000);
      this.weatherModel.sunset_time = sunsetTime.toLocaleTimeString();

      let currenDate = new Date();
      this.weatherModel.nowIsDay = (currenDate.getTime() < sunsetTime.getTime());

      this.temp_celcius = (this.weatherModel.main.temp - 273.15).toFixed(0);
      this.min_celcius = (this.weatherModel.main.temp_min - 273.15).toFixed(0);
      this.max_celcius = (this.weatherModel.main.temp_max - 273.15).toFixed(0);


    }, error =>{
      console.error(error);

      if(error.status == 404){
        this.snackNotFoundCity();
        this.city = ''
        this.weatherModel.city = ''
        return
      }

    });
  }

}
