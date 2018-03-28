import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MedicineService } from './Medicine.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Medicine',
	templateUrl: './Medicine.component.html',
	styleUrls: ['./Medicine.component.css'],
  providers: [MedicineService]
})
export class MedicineComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          medicineId = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          quantity = new FormControl("", Validators.required);
        
  
      
          isPrescription = new FormControl("", Validators.required);
        
  
      
          pharmacy = new FormControl("", Validators.required);
        
  


  constructor(private serviceMedicine:MedicineService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          medicineId:this.medicineId,
        
    
        
          description:this.description,
        
    
        
          quantity:this.quantity,
        
    
        
          isPrescription:this.isPrescription,
        
    
        
          pharmacy:this.pharmacy
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceMedicine.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.biznet.Medicine",
      
        
          "medicineId":this.medicineId.value,
        
      
        
          "description":this.description.value,
        
      
        
          "quantity":this.quantity.value,
        
      
        
          "isPrescription":this.isPrescription.value,
        
      
        
          "pharmacy":this.pharmacy.value
        
      
    };

    this.myForm.setValue({
      
        
          "medicineId":null,
        
      
        
          "description":null,
        
      
        
          "quantity":null,
        
      
        
          "isPrescription":null,
        
      
        
          "pharmacy":null
        
      
    });

    return this.serviceMedicine.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "medicineId":null,
        
      
        
          "description":null,
        
      
        
          "quantity":null,
        
      
        
          "isPrescription":null,
        
      
        
          "pharmacy":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.biznet.Medicine",
      
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "quantity":this.quantity.value,
          
        
    
        
          
            "isPrescription":this.isPrescription.value,
          
        
    
        
          
            "pharmacy":this.pharmacy.value
          
        
    
    };

    return this.serviceMedicine.updateAsset(form.get("medicineId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceMedicine.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceMedicine.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "medicineId":null,
          
        
          
            "description":null,
          
        
          
            "quantity":null,
          
        
          
            "isPrescription":null,
          
        
          
            "pharmacy":null 
          
        
      };



      
        if(result.medicineId){
          
            formObject.medicineId = result.medicineId;
          
        }else{
          formObject.medicineId = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.quantity){
          
            formObject.quantity = result.quantity;
          
        }else{
          formObject.quantity = null;
        }
      
        if(result.isPrescription){
          
            formObject.isPrescription = result.isPrescription;
          
        }else{
          formObject.isPrescription = null;
        }
      
        if(result.pharmacy){
          
            formObject.pharmacy = result.pharmacy;
          
        }else{
          formObject.pharmacy = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "medicineId":null,
        
      
        
          "description":null,
        
      
        
          "quantity":null,
        
      
        
          "isPrescription":null,
        
      
        
          "pharmacy":null 
        
      
      });
  }

}
