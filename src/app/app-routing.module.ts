import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  { path: 'bienvenue', component: BienvenueComponent },
  { path: 'probleme', component: ProblemeComponent },
  { path: '', redirectTo: 'bienvenue', pathMatch: 'full' },
  { path: '**', redirectTo: 'bienvenue', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
