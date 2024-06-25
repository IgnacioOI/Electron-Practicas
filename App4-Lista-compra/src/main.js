const {app, BrowserWindow, Menu, icpMain, View}=require('electron')
let ventanaPrincipal;
let ventanaNuevoProducto;
let menuPrincipalPLantilla=[
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'Agregar producto',
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
function crearVentanaAgregarProducto(){
    ventanaNuevoProducto=new BrowserWindow({
        //se dice que el padre es ventana principal
        parent:ventanaPrincipal,
        //no permite actuar con la ventana principal
        modal:true,
        width: 800,
        heigth: 600,
        title: 'Agregar producto',
        webPreferences:{
            nodeIntegration:true
        }
    });
    ventanaNuevoProducto.loadFile('src/agregar-producto.html');
    ventanaNuevoProducto.on('close', function(){
        ventanaNuevoProducto=null;
    });
}
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
