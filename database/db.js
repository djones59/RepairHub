//db.js, stores schema for sql datbase
import sqlite3 from 'sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';
// Set up database path
// Variable to store the database path
let dbPath;

if (process.env.NODE_ENV === 'development') {
  // Development mode: Use the local path in your project
  dbPath = path.resolve(__dirname, 'database.sqlite');
} else {
  // Production mode: Use the 'resources' directory provided by Electron
  const userDataPath = app.getPath('userData'); // This is a path where you have write permissions.
  const dbOriginalPath = path.join(process.resourcesPath, 'database', 'database.sqlite');
  const dbDestinationPath = path.join(userDataPath, 'database.sqlite');

  // Copy the database file from original path to user data path if it doesn't already exist
  if (!fs.existsSync(dbDestinationPath)) {
    try {
      fs.copyFileSync(dbOriginalPath, dbDestinationPath);
    } catch (err) {
      console.error('Failed to copy database:', err);
    }
  }

  dbPath = dbDestinationPath;
}

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
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
    FOREIGN KEY (car_id) REFERENCES car(id) ON DELETE CASCADE
);
`;

const repairTable =  `
CREATE TABLE IF NOT EXISTS repair (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    servrepair_id INTEGER,
    description TEXT NOT NULL,
    cost REAL NOT NULL,
    FOREIGN KEY (servrepair_id) REFERENCES servrepair(id) ON DELETE CASCADE
);
`;

export function setupSchema() {
    db.serialize(() => {
        db.run(carTable);
        db.run(servrepairTable);
        db.run(repairTable);
    });
}
export default db;