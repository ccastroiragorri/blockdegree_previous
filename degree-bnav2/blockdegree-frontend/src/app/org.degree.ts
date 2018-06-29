import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Badge} from './composer.blockcerts';
// export namespace org.degree{
   export class Administrator extends Person {
      email: string;
   }
   export class UserExternal extends Person {
      email: string;
   }
   export class CertificateTemplate extends Certificate {
      templateId: string;
      Global: Administrator;
   }
   export class PersonalCertificate extends Asset {
      certId: string;
      templateId: CertificateTemplate;
      localAdministrator: Administrator;
      recipient: Recipient;
      recipientProfile: RecipientProfile;
      hash: string;
   }
   export class AddRoster extends Transaction {
      templateId: CertificateTemplate;
      localAdministrator: Administrator;
      recipientsInfo: RecipientInfo[];
   }
   export class RecipientInfo {
      certId: string;
      recipient: Recipient;
      recipientProfile: RecipientProfile;
   }
   export class Recipient {
      hashed: boolean;
      email: string;
   }
   export class RecipientProfile {
      typen: string;
      name: string;
      publicKey: string;
   }
// }
