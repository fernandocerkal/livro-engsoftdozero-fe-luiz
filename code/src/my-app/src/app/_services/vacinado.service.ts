import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Vacinado } from '../_models/vacinado';

@Injectable({ providedIn: 'root' })
export class VacinadoService {
    constructor(private http: HttpClient) { }

    list() {                
        return this.http.get<any>(environment.apiVacinaUrl).pipe(map(vacinados => {           
            localStorage.setItem('vacinados', JSON.stringify(vacinados));
            return vacinados;
        }));
    }

    insert(vacinado: Vacinado) {        
        return this.http.post<any>(environment.apiVacinaUrl, vacinado).pipe(map(vacinados => vacinados));
    }
}