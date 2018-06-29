/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CertificateTemplateService } from './CertificateTemplate.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-CertificateTemplate',
	templateUrl: './CertificateTemplate.component.html',
	styleUrls: ['./CertificateTemplate.component.css'],
  providers: [CertificateTemplateService]
})
export class CertificateTemplateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          templateId = new FormControl("", Validators.required);
        
  
      
          Global = new FormControl("", Validators.required);
        
  
      
          typeC = new FormControl("", Validators.required);
        
  
      
          badge = new FormControl("", Validators.required);
        
  
      
          context = new FormControl("", Validators.required);
        
  
      
          revoked = new FormControl("", Validators.required);
        
  


  constructor(private serviceCertificateTemplate:CertificateTemplateService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          templateId:this.templateId,
        
    
        
          Global:this.Global,
        
    
        
          typeC:this.typeC,
        
    
        
          badge:this.badge,
        
    
        
          context:this.context,
        
    
        
          revoked:this.revoked
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCertificateTemplate.getAll()
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
      $class: "org.degree.CertificateTemplate",
      
        
          "templateId":this.templateId.value,
        
      
        
          "Global":this.Global.value,
        
      
        
          "typeC":this.typeC.value,
        
      
        
          "badge":this.badge.value,
        
      
        
          "context":this.context.value,
        
      
        
          "revoked":this.revoked.value
        
      
    };

    this.myForm.setValue({
      
        
          "templateId":null,
        
      
        
          "Global":null,
        
      
        
          "typeC":null,
        
      
        
          "badge":null,
        
      
        
          "context":null,
        
      
        
          "revoked":null
        
      
    });

    return this.serviceCertificateTemplate.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "templateId":null,
        
      
        
          "Global":null,
        
      
        
          "typeC":null,
        
      
        
          "badge":null,
        
      
        
          "context":null,
        
      
        
          "revoked":null 
        
      
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
      $class: "org.degree.CertificateTemplate",
      
        
          
        
    
        
          
            "Global":this.Global.value,
          
        
    
        
          
            "typeC":this.typeC.value,
          
        
    
        
          
            "badge":this.badge.value,
          
        
    
        
          
            "context":this.context.value,
          
        
    
        
          
            "revoked":this.revoked.value
          
        
    
    };

    return this.serviceCertificateTemplate.updateAsset(form.get("templateId").value,this.asset)
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

    return this.serviceCertificateTemplate.deleteAsset(this.currentId)
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

    return this.serviceCertificateTemplate.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "templateId":null,
          
        
          
            "Global":null,
          
        
          
            "typeC":null,
          
        
          
            "badge":null,
          
        
          
            "context":null,
          
        
          
            "revoked":null 
          
        
      };



      
        if(result.templateId){
          
            formObject.templateId = result.templateId;
          
        }else{
          formObject.templateId = null;
        }
      
        if(result.Global){
          
            formObject.Global = result.Global;
          
        }else{
          formObject.Global = null;
        }
      
        if(result.typeC){
          
            formObject.typeC = result.typeC;
          
        }else{
          formObject.typeC = null;
        }
      
        if(result.badge){
          
            formObject.badge = result.badge;
          
        }else{
          formObject.badge = null;
        }
      
        if(result.context){
          
            formObject.context = result.context;
          
        }else{
          formObject.context = null;
        }
      
        if(result.revoked){
          
            formObject.revoked = result.revoked;
          
        }else{
          formObject.revoked = null;
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
      
        
          "templateId":null,
        
      
        
          "Global":null,
        
      
        
          "typeC":null,
        
      
        
          "badge":null,
        
      
        
          "context":null,
        
      
        
          "revoked":null 
        
      
      });
  }

}
