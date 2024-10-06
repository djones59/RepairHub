// queries.js, this file contains the quries to retrive data from the database created.
// Functions all include ways to retrive diffrent data

// Function to add a new Car
export function insertCar(db,make, model, year, dateIssued, currMileage,callback) {
    const sql = `INSERT INTO car (make, model, year, date_issued, curr_mileage) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [make, model, year, dateIssued, currMileage], function (err)  {
        if (err) {
            console.error('Error inserting new car:', err.message);
        } else {
            console.log(`A new car has been inserted with rowid ${this.lastID}`);
            callback(null,this.lastID);
        }
    });
}

// SQL query to select all cars
export function getAllCars(db,callback) {
    const sql = `SELECT * FROM car`;
    // Execute the query
    db.all(sql, [], (err, rows) => {
        if (err) {
            // If there's an error, pass the error to the callback
            callback(err, null);
        } else {
            // If successful, pass the retrieved rows to the callback
            callback(null, rows);
        }
    });
}

// SQL query to select all services 
export function getAllServices(db,callback) {
    const sql = `
    SELECT service.*, car.model, car.year 
    FROM service 
    JOIN car ON service.car_id = car.id
    `;
    // Execute the query
    db.all(sql, [], (err, rows) => {
        if (err) {
            // If there's an error, pass the error to the callback
            callback(err, null);
        } else {
            // If successful, pass the retrieved rows to the callback
            callback(null, rows);
        }
    });
}

// SQL query to update car mileage when service as been added
export function updateCarMileage(db, carID, newMileage, callback) {
    const sql = `UPDATE car SET curr_mileage = ? WHERE id = ?`;

    db.run(sql, [newMileage, carID], function (err) {
        if (err) {
            console.error('Error updating mileage:', err);
            callback(err);
        } else {
            console.log(`Mileage updated for car ID: ${carID}, New Mileage: ${newMileage}`);
            callback(null, { updatedID: carID });
        }
    });
}
// SQL query to select all repairs
export function getAllRepairs(db,serviceid,callback) {
    
    const sql = `SELECT * FROM repair WHERE servrepair_id = ${serviceid};`;
    // Execute the query
    db.all(sql, [], (err, rows) => {
        if (err) {
            // If there's an error, pass the error to the callback
            callback(err, null);
        } else {
            // If successful, pass the retrieved rows to the callback
            callback(null, rows);
        }
    });
}

// Function to add a new service repair with multiple repairs
export function addNewService(db,carId, date, totalCost, mileage, location, repairs, callback) {
    const insertServiceRepairSQL = `INSERT INTO service (car_id, date, total_cost, mileage, location) VALUES (?, ?, ?, ?, ?)`;

    // Insert a new service repair entry
    db.run(insertServiceRepairSQL, [carId, date, totalCost, mileage, location], function (err) {
        if (err) {
            console.error('Error inserting new service repair:', err.message);
        } else {
            console.log(`A new service repair has been inserted with rowid ${this.lastID}`);
            
            const servrepairId = this.lastID; // The ID of the newly inserted service repair
            let repairsInserted = 0;
            const totalRepairs = repairs.length;
            // Insert each repair detail associated with this service repair
            repairs.forEach((repair) => {
                const insertRepairSQL = `INSERT INTO repair (servrepair_id, description, cost) VALUES (?, ?, ?)`;

                db.run(insertRepairSQL, [servrepairId, repair.description, repair.cost], function(err) {
                    if (err) {
                        console.error('Error inserting repair detail:', err.message);
                    } else {
                        console.log(`A repair has been inserted with rowid ${this.lastID}`);
                        repairsInserted += 1;
                        if (repairsInserted === totalRepairs) {
                            callback(null);  // All repairs inserted, now call the callback
                        }
                    }
                });
            });
        }
    });
}

// Function to delete a repair
export function deleteRepair(db,repairId, callback){
    const sql = 'DELETE FROM repair WHERE id = ?'
    db.run(sql,[repairId], (err) => {
        if (err) {
            console.error('Error deleting repair:', err.message);
            callback(err);
        }else {
            console.log('Repair deleted successfully');
            callback(null);
        }       
    });
}
// Function to delete a service
export function deleteCar(db,carId, callback){
    console.log('Deleting car');
    const sql = 'DELETE FROM car WHERE id = ?';
    db.run(sql,[carId], (err) => {
        if (err) {
            console.error('Error deleting Car:', err.message);
            callback(err);
        }else {
            console.log('Car deleted successfully');
            callback(null);
        }       
    });
}

// Function to delete a service
export function deleteService(db,serviceId,callback){
    const sql = 'DELETE FROM service WHERE id = ?'
    db.run(sql,[serviceId], err =>{
        if (err) {
            console.error('Error deleting service:' , err.message);
            callback(err);
        } else {
            console.log('Service deleted successfully');
            callback(null);
        }
    });
}
export default{
    getAllCars,
    getAllServices,
    getAllRepairs,
    insertCar,
    addNewService,
    deleteRepair,
    deleteCar,
    deleteService,
}
