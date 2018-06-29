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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for blockdegree-frontend', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be blockdegree-frontend', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('blockdegree-frontend');
    })
  });

  it('network-name should be degree@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('degree@0.0.1.bna');
    });
  });

  it('navbar-brand should be blockdegree-frontend',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('blockdegree-frontend');
    });
  });

  
    it('CertificateTemplate component should be loadable',() => {
      page.navigateTo('/CertificateTemplate');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CertificateTemplate');
      });
    });

    it('CertificateTemplate table should have 7 columns',() => {
      page.navigateTo('/CertificateTemplate');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('PersonalCertificate component should be loadable',() => {
      page.navigateTo('/PersonalCertificate');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('PersonalCertificate');
      });
    });

    it('PersonalCertificate table should have 7 columns',() => {
      page.navigateTo('/PersonalCertificate');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Administrator component should be loadable',() => {
      page.navigateTo('/Administrator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Administrator');
      });
    });

    it('Administrator table should have 5 columns',() => {
      page.navigateTo('/Administrator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('UserExternal component should be loadable',() => {
      page.navigateTo('/UserExternal');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UserExternal');
      });
    });

    it('UserExternal table should have 5 columns',() => {
      page.navigateTo('/UserExternal');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('AddRoster component should be loadable',() => {
      page.navigateTo('/AddRoster');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddRoster');
      });
    });
  

});