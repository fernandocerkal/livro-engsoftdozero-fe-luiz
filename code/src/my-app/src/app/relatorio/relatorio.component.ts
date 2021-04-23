import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Dose } from '../_models/dose';
import { Vacinado } from '../_models/vacinado';

@Component({
  templateUrl: './relatorio.component.html'
})
export class RelatorioComponent  {
  doses: Dose[];
  vacinados: Vacinado[];    
  primeiroAno: Label = ((new Date()).getFullYear()-2).toString();
  segundoAno: Label = ((new Date()).getFullYear()-1).toString();
  terceiroAno: Label = ((new Date()).getFullYear()).toString();

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartLabels: Label[] = [this.primeiroAno, this.segundoAno, this.terceiroAno];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit() {
    
    //todo: para melhorar, você poderá substituir este código. Ao invés de pegar os dados do cache, 
    // você pode pegar os dados acessando os serviços de Dose e Vacinado. Assim não corre o risco de não existir os dados.
    this.doses = JSON.parse(localStorage.getItem('doses'));
    this.vacinados = JSON.parse(localStorage.getItem('vacinados'));
    
    this.doses.forEach((dose) => 
    {        
        this.barChartData.push({ data: [0,0,0], label: dose.descricao })    
    });
    
    this.vacinados.forEach((vacinado) => 
    {        
        var data = this.barChartData.find(f => f.label == vacinado.dose.descricao).data;        
        var ano = new Date(vacinado.dataHora.toString()).getFullYear().toString();        
           
        switch (ano)
        {
            case this.primeiroAno:                 
                data[0] = parseInt(data[0].toString()) + 1;                
            break;
            case this.segundoAno: 
                data[1] = parseInt(data[1].toString()) + 1;                
            break;
            case this.terceiroAno: 
                data[2] = parseInt(data[2].toString()) + 1;                
            break;
        }        
    });
  }
}