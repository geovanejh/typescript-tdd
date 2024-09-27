import { MaintenanceEntity, UserEntity } from "./Entity";

export class Maintenance {
  private maintenances: MaintenanceEntity[] = [];

  private isUserAlowedToScheduleMaintenance(user: UserEntity): boolean {
    console.log(user.role);
    return user.role !== "Technician";
  }

  private isMaintenanceDateValid(date: Date): boolean {
    return date < new Date(Date.now());
  }

  public scheduleMaintenance(params: MaintenanceEntity): string {
    if (this.isMaintenanceDateValid(params.date)) {
      return "Error - Invalid Date";
    }

    if (this.isUserAlowedToScheduleMaintenance(params.technician)) {
      return "Error - Unauthorized";
    } else {
      this.maintenances.push(params);
      return "Maintenance scheduled";
    }
  }

  public getMaintenanceByMachineAndPeriod(
    machine: string,
    startDate: Date,
    endDate: Date
  ): number {
    return this.maintenances.filter(
      (m) => m.machine === machine && m.date >= startDate && m.date <= endDate
    ).length;
  }

  public finnishMaintenance(params: MaintenanceEntity): string {
    if (this.isUserAlowedToScheduleMaintenance(params.technician)) {
      return "Error - Unauthorized";
    } else {
      return "Success!";
    }
  }

  public createEmergencialMaintenance(params: MaintenanceEntity): boolean {
    if (params.status != "emergency") {
      return false;
    } else {
      this.maintenances.push(params);
      return true;
    }
  }
}
