const {app, BrowserWindow, Menu, icpMain, View}=require('electron')
let ventanaPrincipal;
let ventanaNuevoProducto;
let menuPrincipalPLantilla=[
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'Acerca de',
                click: () => {
                    crearVentanaAgregarProducto();
                }
            },
                        {
                label: 'Eliminar producto',
                click: () => {
                    ventanaPrincipal.webContents.send('productos:eleminar')
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform==='darwin' ? 'Command+Q' : 'Ctrl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];
function crearVentanaPrincipal(){
    ventanaPrincipal= new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences:{
            nodeIntegration:true
        }
    });
    ventanaPrincipal.loadFile('src/index.html');
    let menuPrincipal=Menu.buildFromTemplate(menuPrincipalPLantilla);
    ventanaPrincipal.setMenu(menuPrincipal);
}
app.whenReady().then(crearVentanaPrincipal);
