import { MaintenanceEntity } from "./MaintenanceEntity";

export class Maintenance {

  public scheduleMaintenance(params: MaintenanceEntity): boolean {
    console.log(params)
    return params.date < new Date(Date.now()) ? false : true
  }

  public allowForUse(params: MaintenanceEntity): boolean {
    return params.AllowForUse
  }

  public isScheduled(params: MaintenanceEntity): boolean {
    return params.Scheduled
  }
  
}