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
import { PersonalCertificateService } from './PersonalCertificate.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-PersonalCertificate',
	templateUrl: './PersonalCertificate.component.html',
	styleUrls: ['./PersonalCertificate.component.css'],
  providers: [PersonalCertificateService]
})
export class PersonalCertificateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          certId = new FormControl("", Validators.required);
        
  
      
          templateId = new FormControl("", Validators.required);
        
  
      
          localAdministrator = new FormControl("", Validators.required);
        
  
      
          recipient = new FormControl("", Validators.required);
        
  
      
          recipientProfile = new FormControl("", Validators.required);
        
  
      
          hash = new FormControl("", Validators.required);
        
  


  constructor(private servicePersonalCertificate:PersonalCertificateService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          certId:this.certId,
        
    
        
          templateId:this.templateId,
        
    
        
          localAdministrator:this.localAdministrator,
        
    
        
          recipient:this.recipient,
        
    
        
          recipientProfile:this.recipientProfile,
        
    
        
          hash:this.hash
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePersonalCertificate.getAll()
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
      $class: "org.degree.PersonalCertificate",
      
        
          "certId":this.certId.value,
        
      
        
          "templateId":this.templateId.value,
        
      
        
          "localAdministrator":this.localAdministrator.value,
        
      
        
          "recipient":this.recipient.value,
        
      
        
          "recipientProfile":this.recipientProfile.value,
        
      
        
          "hash":this.hash.value
        
      
    };

    this.myForm.setValue({
      
        
          "certId":null,
        
      
        
          "templateId":null,
        
      
        
          "localAdministrator":null,
        
      
        
          "recipient":null,
        
      
        
          "recipientProfile":null,
        
      
        
          "hash":null
        
      
    });

    return this.servicePersonalCertificate.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "certId":null,
        
      
        
          "templateId":null,
        
      
        
          "localAdministrator":null,
        
      
        
          "recipient":null,
        
      
        
          "recipientProfile":null,
        
      
        
          "hash":null 
        
      
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
      $class: "org.degree.PersonalCertificate",
      
        
          
        
    
        
          
            "templateId":this.templateId.value,
          
        
    
        
          
            "localAdministrator":this.localAdministrator.value,
          
        
    
        
          
            "recipient":this.recipient.value,
          
        
    
        
          
            "recipientProfile":this.recipientProfile.value,
          
        
    
        
          
            "hash":this.hash.value
          
        
    
    };

    return this.servicePersonalCertificate.updateAsset(form.get("certId").value,this.asset)
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

    return this.servicePersonalCertificate.deleteAsset(this.currentId)
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

    return this.servicePersonalCertificate.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "certId":null,
          
        
          
            "templateId":null,
          
        
          
            "localAdministrator":null,
          
        
          
            "recipient":null,
          
        
          
            "recipientProfile":null,
          
        
          
            "hash":null 
          
        
      };



      
        if(result.certId){
          
            formObject.certId = result.certId;
          
        }else{
          formObject.certId = null;
        }
      
        if(result.templateId){
          
            formObject.templateId = result.templateId;
          
        }else{
          formObject.templateId = null;
        }
      
        if(result.localAdministrator){
          
            formObject.localAdministrator = result.localAdministrator;
          
        }else{
          formObject.localAdministrator = null;
        }
      
        if(result.recipient){
          
            formObject.recipient = result.recipient;
          
        }else{
          formObject.recipient = null;
        }
      
        if(result.recipientProfile){
          
            formObject.recipientProfile = result.recipientProfile;
          
        }else{
          formObject.recipientProfile = null;
        }
      
        if(result.hash){
          
            formObject.hash = result.hash;
          
        }else{
          formObject.hash = null;
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
      
        
          "certId":null,
        
      
        
          "templateId":null,
        
      
        
          "localAdministrator":null,
        
      
        
          "recipient":null,
        
      
        
          "recipientProfile":null,
        
      
        
          "hash":null 
        
      
      });
  }

}
