import { Time } from "@angular/common";

export class WeatherdataModel{
    city: string;

    clouds: any;
    main: { 
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    weather: [{
        description: string;
        icon: string;
        id: number; 
        main: string;
    }];
    sys: any;
    sunset_time: string;
    nowIsDay:  boolean;

}