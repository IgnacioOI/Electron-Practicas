const {app,BrowserWindow}=require('electron')
const path= require('path')

function crearVentanaPrincipar(){
    let ventanaPrincipal=new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname,'preload.js')
        }
    });
    ventanaPrincipal.loadFile('index.html');
}
app.whenReady().then(crearVentanaPrincipar)

app.on('window-all-closed', function(){
    if(process.platform==='darwin'){
        app.quit();
    }
});
app.on('activate',function(){
    if(BrowserWindow.getAllWindows.length === 0){
        crearVentanaPrincipar();
    }
})
