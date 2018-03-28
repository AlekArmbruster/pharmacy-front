import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.biznet{
   export class Medicine extends Asset {
      medicineId: string;
      description: string;
      quantity: number;
      isPrescription: boolean;
      pharmacy: Pharmacy;
   }
   export class Pharmacy extends Participant {
      pharmacyId: string;
      name: string;
      address: string;
   }
   export class Trade extends Transaction {
      medicine: Medicine;
      newPharmacy: Pharmacy;
   }
   export class TradeNotification extends Event {
      medicine: Medicine;
   }
   export class changePrescriptionStatus extends Transaction {
   }
   export class UpdateNotification extends Event {
      medicine: Medicine;
   }
// }
