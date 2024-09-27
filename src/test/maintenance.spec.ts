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
      technician: technician,
      machine: "001",
      date: new Date("2024-12-15"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      technician: technician,
      machine: "001",
      date: new Date("2024-12-10"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      technician: technician,
      machine: "001",
      date: new Date("2024-12-22"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
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
      technician: technician,
      machine: "001",
      date: new Date("2024-12-15"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      technician: technician,
      machine: "001",
      date: new Date("2024-12-10"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
      technician: technician,
      machine: "001",
      date: new Date("2024-12-22"),
      status: "scheduled",
    });
    maintenance.scheduleMaintenance({
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

describe("emergencial maintenance checks", () => {
  let maintenance: Maintenance;
  beforeEach(() => {
    maintenance = new Maintenance();
  });

  it("should return true when give the correct status to the Maintenance: emergency", () => {
    const prms: MaintenanceEntity = {
      technician: technician,
      machine: "002",
      date: new Date(Date.now()),
      status: "emergency",
    };

    expect(maintenance.createEmergencialMaintenance(prms)).toBeTruthy();
  });
});
