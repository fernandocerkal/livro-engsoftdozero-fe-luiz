import { Component } from '@angular/core';
import { Dose } from '../_models/dose';
import { DoseService } from '../_services';

@Component({ templateUrl: 'dose.component.html' })
export class DoseComponent {
    loading = false;
    doses: Dose[];    

    constructor(private doseService: DoseService) { }

    ngOnInit() {        
        this.loading = true;

        this.doseService.list().subscribe({
            next: () => {                
                this.doses = JSON.parse(localStorage.getItem('doses'));
                this.loading = false;
            },
            error: error => {                
                this.loading = false;
            }
        });
    }
}