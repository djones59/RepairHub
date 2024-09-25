//test file to test query functions
import { expect } from 'chai'; // Destructure expect from chai
import queries from '../queries.js';
import sqlite3 from 'sqlite3';
import { setupSchema } from '../db.js'; 
// Helper function to reset the in-memory database
function setupInMemoryDatabase(callback) {
    const db = new sqlite3.Database(':memory:');  // Use in-memory SQLite database

    db.serialize(() => {
        setupSchema(db);  // Use the schema from db.js
        db.get('SELECT name FROM sqlite_master WHERE type="table"', [], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // Schema setup is complete, call the callback (done)
            callback();
        });
    });
    return db;
}

describe('Car Repair App', function () {
    let testDb;

    // Before each test, set up the in-memory database
    beforeEach(function (done) {
        testDb = setupInMemoryDatabase(done);  // Pass done to wait for table creation
    });

    afterEach(function () {
        testDb.close();
    });

    it('should insert a new car', function (done) {
        queries.insertCar(testDb,'Toyota', 'Camry', 2020, '2023-01-15', 10000, (err,lastID) => {
            expect(err).to.be.null;
            // Query the car to check if it was inserted
            testDb.get('SELECT * FROM car WHERE make = ?', ['Toyota'], (err, row) => {
                expect(err).to.be.null;
                expect(row).to.include({
                    make: 'Toyota',
                    model: 'Camry',
                    year: 2020,
                    date_issued: '2023-01-15',
                    curr_mileage: 10000
                });
                done();
            });
        });
    });
    
    it('should retrieve all cars', function (done) {
        // Insert sample data
        queries.insertCar(testDb,'Honda', 'Accord', 2021, '2023-06-01', 5000, function (err) {
            queries.getAllCars(testDb,function (err, rows) {
                expect(err).to.be.null;
                expect(rows).to.have.lengthOf(1);
                expect(rows[0]).to.include({
                    make: 'Honda',
                    model: 'Accord',
                    year: 2021
                });
                done();
            });
        });
    });

    it('should insert a new service', function (done) {
        queries.insertCar(testDb,'Ford', 'Fusion', 2019, '2022-09-10', 25000, function (err,lastId) {
            testDb.get('SELECT id FROM car WHERE make = ?', ['Ford'], (err, row) => {
                const carId = row.id;
                const repairs = [
                    { description: 'Brake replacement', cost: 150 },
                    { description: 'Oil change', cost: 50 },
                    { description: 'Tire rotation', cost: 30 }
                ];
                queries.addNewService(testDb,carId, '2023-07-01', 300.50, 25500, 'Ford Service Center', repairs, function (err) {
                    expect(err).to.be.null;
                    // Query the service to check if it was inserted
                    testDb.get('SELECT * FROM service WHERE car_id = ?', [carId], (err, row) => {
                        expect(err).to.be.null;
                        expect(row).to.include({
                            total_cost: 300.50,
                            mileage: 25500,
                            location: 'Ford Service Center'
                        });
                        done();
                    });
                });
            });
        });
    });

    it('should delete a car',  (done) => {
        queries.insertCar(testDb,'Nissan', 'Altima', 2022, '2023-08-01', 3000, (err) => {
            testDb.get('SELECT id FROM car WHERE make = ?', ['Nissan'], (err, row) => {
                const carId = row.id;
                queries.deleteCar(testDb,carId, (err) => {
                    expect(err).to.be.null;
                    // Check if the car was deleted
                    testDb.get('SELECT * FROM car WHERE id = ?', [carId], (err, row) => {
                        expect(row).to.be.undefined; // Should be undefined since the car was deleted
                        done();
                    });
                });
            });
        });
    });
});
