const {ipcRenderer} = require('electron');

function agregarProducto(evento){
    //Hace una solicitud de tipo get o post
    evento.preventDefault();

    let nombreProducto = document.querySelector('#nombreProducto').value;
    
    if (nombreProducto){
        document.querySelector('#nombreProducto').value = '';
        ipcRenderer.send('producto:agregar', nombreProducto);
    }
}

document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);