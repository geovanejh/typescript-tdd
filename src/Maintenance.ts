import { MaintenanceEntity } from "./MaintenanceEntity";

export class Maintenance {

  public scheduleMaintenance(params: MaintenanceEntity): boolean {
    if(this.isValidTechnician(params.technician) || this.isValidMachine(params.machine)){
      return false;
    }
    
    console.log(params)
    return params.date < new Date(Date.now()) ? false : true
  }

  public isValidTechnician(technician: string) : boolean {
    return technician === "" || technician == undefined || technician == null;
   }

  public isValidMachine(machine: string) : boolean {
    return machine === "" || machine == undefined || machine == null;
  }
}