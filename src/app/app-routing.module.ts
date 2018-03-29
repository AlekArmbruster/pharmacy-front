import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { MedicineComponent } from './Medicine/Medicine.component';

const routes: Routes = [

	{ path: '', redirectTo: 'Medicine', pathMatch: 'full' },

	{ path: 'Medicine', component: MedicineComponent },

	{ path: '**', redirectTo: '' }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }
