import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro';
import { DoseComponent } from './dose';
import { VacinadoComponent } from './vacinado';

const routes: Routes = [
  { path: '', component: DoseComponent },
  { path: 'vacinados', component: VacinadoComponent },  
  { path: 'cadastro', component: CadastroComponent }
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
