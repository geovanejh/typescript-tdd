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

  it('se os campos tecnico e maquina for invalido deve retornar falso', () => {
    const prms: MaintenanceEntity = {
      technician: "",
      machine: "",
      date: new Date(Date.now() + 91*24*60*60*1000),
      status: "scheduled"
    };

    expect(maintenance.scheduleMaintenance(prms)).toBeFalsy();
  });
})