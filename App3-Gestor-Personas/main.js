const {app, BrowserWindow, Menu} = require('electron');
let ventanaPrincipal;
let menuAplicacionPlantilla = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar producto',
                click() {
                    crearVentanaAgregarProducto()
                }
            }
        ]
    }
];
function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    ventanaPrincipal.loadFile('index.html');
    let menu= Menu.buildFromTemplate(menuAplicacionPlantilla);
    ventanaPrincipal.setMenu(menu)
}
app.whenReady().then(crearVentanaPrincipal);
