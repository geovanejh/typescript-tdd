export interface MaintenanceEntity {
    technician : UserEntity;
    machine : string;
    status: string;
    date: Date;
}

export interface UserEntity {
    name: string;
    role: string;
 }