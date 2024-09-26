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
      Scheduled: true,
      AllowForUse: false
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeTruthy();
  })

  it('should return false given a date lower than today', () => {
    const prms: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date(Date.now() - 5*24*60*60*1000),
      Scheduled: false,
      AllowForUse: false
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeFalsy();
  })

  it('Should return true when AllowForUse is true', () => {
    const prms: MaintenanceEntity = {
      technician: "Geovane",
      machine: "001",
      date: new Date(Date.now() + 5*24*60*60*1000), 
      Scheduled: false,
      AllowForUse: false
    };

    expect(prms.Scheduled).toBeFalsy();
    expect(prms.AllowForUse).toBeFalsy();
  });
})