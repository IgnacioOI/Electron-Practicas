const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startCapture: async () => {
    const sources = await ipcRenderer.invoke('GET_SOURCES'); // Solicita las fuentes de captura
    return sources;
  },
  saveRecording: (filePath, data) => {
    ipcRenderer.send('SAVE_VIDEO', { filePath, data }); // Envía los datos del archivo para ser guardados
  },
  showSaveDialog: () => {
    return ipcRenderer.invoke('SHOW_SAVE_DIALOG'); // Solicita mostrar el diálogo de guardado
  }
});
