export interface MaintenanceEntity {
    technician : string;
    machine : string;
    Scheduled: boolean;
    date: Date;
    AllowForUse: boolean;
}