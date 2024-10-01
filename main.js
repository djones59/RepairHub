import { app, BrowserWindow , ipcMain} from 'electron';
import { join } from 'path';
import { fileURLToPath } from 'url';
import db from './database/db.js';
import { 
  getAllServices,
  getAllRepairs,
  insertCar,
  getAllCars,
  addNewService,
  deleteRepair,
  deleteCar, 
} from './database/queries.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '../');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    frame: false,
    webPreferences: {
      preload: join(__dirname, 'src','preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  // In development, load React app
  //win.loadURL('http://localhost:3000');
  
  // Uncomment this for production build
  win.loadFile(join(__dirname, 'build/index.html'));

  // Open DevTools to check for errors
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// IPC HANDELERS -----
// ipc handeler for window functions
ipcMain.handle('toggle-maximize-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win.isMaximized()) {
      win.restore(); // Restore if the window is maximized
  } else {
      win.maximize(); // Maximize if the window is not maximized
  }
});
ipcMain.handle('minimize-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});
ipcMain.handle('close-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});
// ipc handle for insert-car
ipcMain.handle('insert-car', async (event, carData) => {
  return new Promise((resolve, reject) => {
    insertCar(db, carData.make, carData.model, carData.year, carData.dateIssued, carData.currMileage, (err, lastID) => {
      if (err) {
        reject(err);
      } else {
        resolve(lastID);
      }
    });
  });
});
// ipc handler for getAllCars
ipcMain.handle('get-all-cars',async (event) => {
  return new Promise((resolve,reject) => {
    getAllCars(db, (err,rows) => {
      if(err){
        reject(err);
      }else {
        resolve(rows);
      }
    });
  });
});

// ipc handler for getAllServices
ipcMain.handle('get-all-services', async (event) =>{
  return new Promise((resolve,reject) => {
    getAllServices(db, (err,rows) => {
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });
});

// ipc handler form getAllRepairs
ipcMain.handle('get-all-repairs', async (event,serviceID) =>{
  return new Promise((resolve,reject)=>{
    getAllRepairs(db,serviceID ,(err,rows) => {
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('delete-car', async (event,carID) => {
  return new Promise((resolve, reject) => {
    deleteCar(db,carID, (err) =>{
      if (err){
        reject(err);
      }else{
        resolve(carID);
      }
    });
  });
});

ipcMain.handle('add-service', async (event,serviceData) => {
  return new Promise((resolve, reject) => {
    addNewService(db,serviceData.carId,serviceData.date, serviceData.totalCost, serviceData.mileage, serviceData.location, serviceData.repairs, (err, lastID) =>{
      if (err){
        reject(err);
      }else{
        resolve(lastID);
      }
    });
  });
});




//END IPC HANDELERS ------





app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
