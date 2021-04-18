import { Component } from '@angular/core';
import { Vacinado } from '../_models/vacinado';
import { VacinadoService } from '../_services';

@Component({ templateUrl: 'vacinado.component.html' })
export class VacinadoComponent {
    loading = false;
    vacinados: Vacinado[];    

    constructor(private vacinadoService: VacinadoService) { }

    ngOnInit() {        
        this.loading = true;

        this.vacinadoService.list().subscribe({
            next: () => {                
                this.vacinados = JSON.parse(localStorage.getItem('vacinados'));
                this.loading = false;
            },
            error: error => {                
                this.loading = false;
            }
        });
    }
}