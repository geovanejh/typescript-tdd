import { Maintenance } from "../Maintenance";
import { MaintenanceEntity, UserEntity } from "../Entity";

const technician: UserEntity = {
  name: "Mr. Maintenance Technician",
  role: "Technician",
};

describe("Maintenance schedule checks", () => {
  let maintenance: Maintenance;

  beforeEach(() => {
    maintenance = new Maintenance();
  });

  it("exists", () => {
    expect(maintenance).toBeDefined();
  });

  it('should return "Error - Invalid Date" when given a date lower than today', () => {
    expect(
      maintenance.scheduleMaintenance({
        id: 1,
        technician: technician,
        machine: "00222",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "scheduled",
      })
    ).toEqual("Error - Invalid Date");
  });

  it('should return "Error - Unauthorized" when user doesnt has the technician role', () => {
    const user: UserEntity = {
      name: "Geovane",
      role: "Machine Operator",
    };

    expect(
      maintenance.scheduleMaintenance({
        id: 1,
        technician: user,
        machine: "00222",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "scheduled",
      })
    ).toEqual("Error - Unauthorized");
  });

  it('should return "Maintenance scheduled" when given valid parameters', () => {
    expect(
      maintenance.scheduleMaintenance({
        id: 1,
        technician: technician,
        machine: "001",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "Maintenance scheduled",
      })
    ).toBeTruthy();
  });
});

describe("Maintenance conclusion checks", () => {
  let maintenance: Maintenance;

  beforeEach(() => {
    maintenance = new Maintenance();
  });

  it('should return "Error - Unauthorized" when user doesnt has the technician role', () => {
    const user: UserEntity = {
      name: "Geovane",
      role: "Machine Operator",
    };

    expect(
      maintenance.finnishMaintenance({
        id: 1,
        technician: user,
        machine: "01",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "done",
      })
    ).toEqual("Error - Unauthorized");
  });

  it('should return "Success!" when given valid parameters', () => {
    expect(
      maintenance.finnishMaintenance({
        id: 1,
        technician: technician,
        machine: "01",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "done",
      })
    ).toEqual("Success!");
  });
});

describe("maintenance reports check", () => {
  let maintenance: Maintenance;
  beforeEach(() => {
    maintenance = new Maintenance();
  });

  it("should return the total number of maintenances for a machine within a specific period", () => {
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-15"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-10"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-22"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "002",
      date: new Date("2024-12-05"),
      status: "scheduled",
    });

    const startDate = new Date("2024-12-01");
    const endDate = new Date("2024-12-30");

    expect(
      maintenance.getMaintenanceByMachineAndPeriod("001", startDate, endDate)
    ).toBe(3);
  });

  it("should return 0 when given an invalid machine or date", () => {
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-15"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-10"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date("2024-12-22"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      id: 1,
      technician: technician,
      machine: "002",
      date: new Date("2024-12-05"),
      status: "scheduled",
    });

    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-05-01");
    expect(
      maintenance.getMaintenanceByMachineAndPeriod("003", startDate, endDate)
    ).toBe(0);
  });
});

describe('Should delete the appointment', () =>{
  let maintenance: Maintenance;

  beforeEach(() => {
    maintenance = new Maintenance();
  })

  it('Should delete valid', () => {
    const prms1: MaintenanceEntity = {
      id: 1,
      technician: technician,
      machine: "001",
      date: new Date('2024-01-15'),
      status: "scheduled"
    };
  
    const prms2: MaintenanceEntity = {
      id: 2,
      technician: technician,
      machine: "001",
      date: new Date('2024-03-10'),
      status: "scheduled"
    };
  
    maintenance.scheduleMaintenance(prms1);
    maintenance.scheduleMaintenance(prms2);

    expect(maintenance.removeMaintenance(1)).toBeTruthy()
  });

  it('Should return invalid if maintenance is not found', () => {
  
    const prms2: MaintenanceEntity = {
      id: 5,
      technician: technician,
      machine: "001",
      date: new Date('2024-03-10'),
      status: "scheduled"
    };

    maintenance.scheduleMaintenance(prms2);

    expect(maintenance.removeMaintenance(10)).toBeFalsy()
  });
});
