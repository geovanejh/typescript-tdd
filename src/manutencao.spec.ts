import {Maintenance} from './Maintenance'
import { MaintenanceEntity } from './MaintenanceEntity';

describe('palindrome checker', () => {
  let maintenance: Maintenance;

  beforeEach(() => {
    maintenance = new Maintenance();
  })

  it('exists', () => {
    expect(maintenance).toBeDefined();
  })

  it('should return true when given valid parameters', () => {
    const prms: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date(Date.now() + 5*24*60*60*1000),
      status: "scheduled"
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeTruthy();
  })

  it('should return false given a date lower than today', () => {
    const prms: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date(Date.now() - 5*24*60*60*1000),
      status: "scheduled"
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeFalsy();
  })

  it('se a data for maior que 3 meses apartir de hoje deve retornar falso', () => {
    const prms: MaintenanceEntity = {
      technician: "João",
      machine: "001",
      date: new Date(Date.now() + 91*24*60*60*1000),
      status: "scheduled"
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeFalsy();
  })

  it('should return the total number of maintenances for a machine within a specific period', () => {
    const prms1: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date('2024-01-15'),
      status: "scheduled"
    };
  
    const prms2: MaintenanceEntity = {
      technician: "Ana",
      machine: "001",
      date: new Date('2024-03-10'),
      status: "scheduled"
    };
  
    const prms3: MaintenanceEntity = {
      technician: "João",
      machine: "001",
      date: new Date('2024-04-22'),
      status: "scheduled"
    };
  
    const prms4: MaintenanceEntity = {
      technician: "Carlos",
      machine: "002",
      date: new Date('2024-02-05'),
      status: "scheduled"
    };
  
    maintenance.scheduleMaintenance(prms1);
    maintenance.scheduleMaintenance(prms2);
    maintenance.scheduleMaintenance(prms3);
    maintenance.scheduleMaintenance(prms4);
  
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-05-01');
  
    expect(maintenance.getMaintenanceByMachineAndPeriod("001", startDate, endDate)).toBe(3);
  });

  it('should return 0 when given an invalid machine or date', () => {
    const prms1: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date('2024-01-15'),
      status: "scheduled"
    };
  
    const prms2: MaintenanceEntity = {
      technician: "Ana",
      machine: "001",
      date: new Date('2024-03-10'),
      status: "scheduled"
    };
  
    const prms3: MaintenanceEntity = {
      technician: "João",
      machine: "001",
      date: new Date('2024-04-22'),
      status: "scheduled"
    };
  
    const prms4: MaintenanceEntity = {
      technician: "Carlos",
      machine: "002",
      date: new Date('2024-02-05'),
      status: "scheduled"
    };
  
    maintenance.scheduleMaintenance(prms1);
    maintenance.scheduleMaintenance(prms2);
    maintenance.scheduleMaintenance(prms3);
    maintenance.scheduleMaintenance(prms4);
  
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-05-01');
  
    expect(maintenance.getMaintenanceByMachineAndPeriod("003", startDate, endDate)).toBe(0);
  });
  
})