const { ipcRenderer } = require('electron');

// Función para manejar el evento de envío del formulario de agregar producto
function agregarProducto(evento) {
    evento.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    // Obtiene el valor del campo de entrada de nombre del producto
    let nombreProducto = document.querySelector('#nombreProducto').value;
    
    if (nombreProducto) {
        // Limpia el campo de entrada después de obtener su valor
        document.querySelector('#nombreProducto').value = '';
        // Envía un mensaje al proceso principal con el nombre del producto
        ipcRenderer.send('producto:agregar', nombreProducto);
    }
}

// Agrega un listener al formulario para manejar el evento de envío
document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);
