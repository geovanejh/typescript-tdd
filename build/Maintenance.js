"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
var Maintenance = /** @class */ (function () {
    function Maintenance() {
        this.maintenances = [];
    }
    Maintenance.prototype.isUserAlowedToScheduleMaintenance = function (user) {
        console.log(user.role);
        return user.role !== "Technician";
    };
    Maintenance.prototype.isMaintenanceDateValid = function (date) {
        return date < new Date(Date.now());
    };
    Maintenance.prototype.scheduleMaintenance = function (params) {
        if (this.isMaintenanceDateValid(params.date)) {
            return "Error - Invalid Date";
        }
        if (this.isUserAlowedToScheduleMaintenance(params.technician)) {
            return "Error - Unauthorized";
        }
        else {
            this.maintenances.push(params);
            return "Maintenance scheduled";
        }
    };
    Maintenance.prototype.getMaintenanceByMachineAndPeriod = function (machine, startDate, endDate) {
        return this.maintenances.filter(function (m) { return m.machine === machine && m.date >= startDate && m.date <= endDate; }).length;
    };
    Maintenance.prototype.finnishMaintenance = function (params) {
        if (this.isUserAlowedToScheduleMaintenance(params.technician)) {
            return "Error - Unauthorized";
        }
        else {
            return "Success!";
        }
    };
    Maintenance.prototype.removeMaintenance = function (id) {
        console.log(this.maintenances);
        var maintenance = this.maintenances.findIndex(function (m) { return m.id === id; });
        console.log(maintenance);
        if (maintenance !== -1) {
            this.maintenances.splice(maintenance, 1);
            return true;
        }
        return false;
    };
    return Maintenance;
}());
exports.Maintenance = Maintenance;
