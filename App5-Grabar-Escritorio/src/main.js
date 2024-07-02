const { app, BrowserWindow, ipcMain, desktopCapturer, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Función para crear la ventana principal de la aplicación
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'js', 'preload.js'), // Ruta al script de preload
      contextIsolation: true, // Habilita el aislamiento de contexto para mayor seguridad
      enableRemoteModule: false // Deshabilita el módulo remoto para mayor seguridad
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')); // Carga el archivo HTML principal
  mainWindow.webContents.openDevTools(); // Abre las herramientas de desarrollo
};

app.whenReady().then(createWindow); // Crea la ventana cuando la aplicación está lista

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // Cierra la aplicación cuando todas las ventanas están cerradas, excepto en macOS
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) { // Crea una nueva ventana si no hay ninguna abierta y la aplicación es activada
    createWindow();
  }
});

// Maneja la solicitud para obtener las fuentes de captura de pantalla
ipcMain.handle('GET_SOURCES', async () => {
  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  return sources;
});

// Maneja la solicitud para mostrar el diálogo de guardado de archivo
ipcMain.handle('SHOW_SAVE_DIALOG', async () => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Guardar video',
    defaultPath: `video-${Date.now()}.webm`
  });
  return filePath;
});

// Maneja la solicitud para guardar el archivo de video
ipcMain.on('SAVE_VIDEO', async (event, { filePath, data }) => {
  if (filePath) {
    await fs.writeFile(filePath, Buffer.from(data)); // Guarda el archivo de video en el sistema de archivos
  }
});
