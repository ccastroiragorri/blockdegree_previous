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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { CertificateTemplateComponent } from './CertificateTemplate/CertificateTemplate.component';
import { PersonalCertificateComponent } from './PersonalCertificate/PersonalCertificate.component';


  import { AdministratorComponent } from './Administrator/Administrator.component';
  import { UserExternalComponent } from './UserExternal/UserExternal.component';


  import { AddRosterComponent } from './AddRoster/AddRoster.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'CertificateTemplate', component: CertificateTemplateComponent},
    
		{ path: 'PersonalCertificate', component: PersonalCertificateComponent},
    
    
      { path: 'Administrator', component: AdministratorComponent},
      
      { path: 'UserExternal', component: UserExternalComponent},
      
      
        { path: 'AddRoster', component: AddRosterComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
