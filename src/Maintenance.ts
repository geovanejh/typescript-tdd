import { MaintenanceEntity } from "./MaintenanceEntity";

export class Maintenance {
  private maintenances: MaintenanceEntity[] = [];

  public scheduleMaintenance(params: MaintenanceEntity): boolean {
    console.log(params)
    this.maintenances.push(params);
    return params.date < new Date(Date.now()) ? false : true
  }

  public getMaintenanceByMachineAndPeriod(machine: string, startDate: Date, endDate: Date): number {
    return this.maintenances.filter(m => 
      m.machine === machine &&
      m.date >= startDate &&
      m.date <= endDate
    ).length;
  }
}