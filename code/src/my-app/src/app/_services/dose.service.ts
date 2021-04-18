import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoseService {
    constructor(private http: HttpClient) { }

    list() {                
        return this.http.get<any>(environment.apiDoseUrl).pipe(map(doses => {
            localStorage.setItem('doses', JSON.stringify(doses));
            return doses;
        }));
    }
}