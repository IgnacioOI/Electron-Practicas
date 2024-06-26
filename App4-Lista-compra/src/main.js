const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let ventanaPrincipal;
let ventanaNuevoProducto;

// Plantilla del menú principal de la aplicación
let menuPrincipalPlantilla = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar producto',
                click() {
                    crearVentanaAgregarProducto();
                }
            },
            {
                label: 'Eliminar productos',
                click() {
                    ventanaPrincipal.webContents.send('productos:eliminar');
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// Función para crear la ventana de agregar producto
function crearVentanaAgregarProducto() {
    ventanaNuevoProducto = new BrowserWindow({
        parent: ventanaPrincipal,
        modal: true,
        width: 300,
        height: 200,
        title: 'Agregar producto',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Asegúrate de que contextIsolation esté deshabilitado para nodeIntegration
        }
    });

    ventanaNuevoProducto.loadFile('src/agregar-producto.html');
    //ventanaNuevoProducto.webContents.openDevTools(); // Abrir DevTools automáticamente

    ventanaNuevoProducto.setMenu(null);

    ventanaNuevoProducto.on('close', function () {
        ventanaNuevoProducto = null;
    });
}

// Función para crear la ventana principal
function crearVentanaPrincipal() {
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Asegúrate de que contextIsolation esté deshabilitado para nodeIntegration
        }
    });

    ventanaPrincipal.loadFile('src/index.html');
    //ventanaPrincipal.webContents.openDevTools(); // Abrir DevTools automáticamente

    let menuPrincipal = Menu.buildFromTemplate(menuPrincipalPlantilla);
    Menu.setApplicationMenu(menuPrincipal);
    ventanaPrincipal.setMenu(menuPrincipal);
}

// Crear la ventana principal cuando la aplicación esté lista
app.whenReady().then(crearVentanaPrincipal);

// Listener para manejar el evento de agregar producto desde el proceso principal
ipcMain.on('producto:agregar', function (evento, nombreProducto) {
    ventanaPrincipal.webContents.send('producto:agregar', nombreProducto);
});

// Cierra la aplicación cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Vuelve a crear la ventana principal si la aplicación es activada y no hay ventanas abiertas (solo en macOS)
app.on('activate', () => {
    if (ventanaPrincipal === null) {
        crearVentanaPrincipal();
    }
});
