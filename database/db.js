//db.js, stores schema for sql datbase
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath,(err) => {
    if (err) {
        console.error('Error opening database', err.message);
    }else{
        console.log('Connected to SQLite database');
    }
});


const carTable = `
CREATE TABLE IF NOT EXISTS car (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    date_issued TEXT NOT NULL,
    curr_mileage INTEGER NOT NULL

);
`;

const servrepairTable = `
CREATE TABLE IF NOT EXISTS service (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id INTEGER,
    date TEXT NOT NULL,
    total_cost REAL NOT NULL,
    mileage INTEGER NOT NULL,
    location TEXT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES car(id)
);
`;

const repairTable =  `
CREATE TABLE IF NOT EXISTS repair (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    servrepair_id INTEGER,
    description TEXT NOT NULL,
    cost REAL NOT NULL,
    FOREIGN KEY (servrepair_id) REFERENCES servrepair(id)
);
`;
export default db;
export function setupSchema(db) {
    db.serialize(() => {
        db.run(carTable);
        db.run(servrepairTable);
        db.run(repairTable);
    });
}