import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Medicine } from '../org.acme.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class MedicineService {


	private NAMESPACE: string = 'Medicine';




	constructor(private dataService: DataService<Medicine>) {
	};

	public getAll(): Observable<Medicine[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	public getAsset(id: any): Observable<Medicine> {
		return this.dataService.getSingle(this.NAMESPACE, id);
	}

	public addAsset(itemToAdd: any): Observable<Medicine> {
		return this.dataService.add(this.NAMESPACE, itemToAdd);
	}

	public updateAsset(id: any, itemToUpdate: any): Observable<Medicine> {
		return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
	}

	public deleteAsset(id: any): Observable<Medicine> {
		return this.dataService.delete(this.NAMESPACE, id);
	}

	public tradeAsset(id: any): Observable<Medicine> {
		return this.dataService.trade(this.NAMESPACE, id);
	}

}
