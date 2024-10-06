// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose API to frontend (React)
contextBridge.exposeInMainWorld('electronAPI', {
  //window manager functions
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  toggleMaximizeWindow: () => ipcRenderer.invoke('toggle-maximize-window'), // New maximize/restore function
  closeWindow: () => ipcRenderer.invoke('close-window'),
  //sql data CRUD functions
  getAllCars: () => ipcRenderer.invoke('get-all-cars'),  
  insertCar: (carData) => ipcRenderer.invoke('insert-car', carData),  
  getAllServices: () => ipcRenderer.invoke('get-all-services'),
  getAllRepairs: (serviceId) => ipcRenderer.invoke('get-all-repairs',serviceId),
  deleteCar: (carID) => ipcRenderer.invoke('delete-car', carID),
  addService: (serviceData) => ipcRenderer.invoke('add-service', serviceData),
  deleteService: (serviceId) => ipcRenderer.invoke('delete-service',serviceId),
  updateMileage: (carId,newMileage) => ipcRenderer.invoke('update-car-mileage',carId,newMileage)
});