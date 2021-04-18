import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Dose } from '../_models/dose';
import { Vacinado } from '../_models/vacinado';
import { VacinadoService } from '../_services';

@Component({ templateUrl: 'cadastro.component.html' })
export class CadastroComponent implements OnInit {
    cadastroForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    doses: Dose[];    

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private vacinadoService: VacinadoService) { }

    ngOnInit() {        
        this.loading = false;
        this.cadastroForm = this.formBuilder.group({
            rg: ['', Validators.required],
            cpf: ['', Validators.required],
            dose: [1, Validators.required]
        });

        this.doses = JSON.parse(localStorage.getItem('doses'));
    }

    get form() { return this.cadastroForm.controls; }

    onSubmit() {
        this.submitted = true;
        
        if (this.cadastroForm.invalid) {
            return;
        }        

        this.loading = true;
        let vacinado = new Vacinado();
        vacinado.cpf = this.form.cpf.value;
        vacinado.rg = this.form.rg.value;
        vacinado.dose = new Dose();
        vacinado.dose.identificador = this.form.dose.value;

        this.vacinadoService.insert(vacinado)
            .pipe(first())
            .subscribe({
                next: () => {                    
                    const returnUrl = '/vacinados';
                    this.router.navigate([returnUrl]);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}