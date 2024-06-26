const { ipcRenderer, remote } = require('electron');

// Listener para recibir mensajes del proceso principal y agregar un producto
ipcRenderer.on('producto:agregar', function(evento, nombreProducto) {
    // Guarda el producto en localStorage
    localStorage.setItem(nombreProducto, nombreProducto);
    // Recarga la lista de compras
    cargarListaCompras();
});

// Listener para recibir mensajes del proceso principal y eliminar todos los productos
ipcRenderer.on('productos:eliminar', () => {
    // Limpia el localStorage
    localStorage.clear();
    // Recarga la lista de compras
    cargarListaCompras();
});

// Función para cargar la lista de compras desde el localStorage
function cargarListaCompras() {
    // Genera el HTML de la lista de compras, incluyendo un botón de eliminación
    let html = Object.keys(localStorage).map(k => `
        <div class="list-group-item d-flex justify-content-between align-items-center">
            ${localStorage.getItem(k)}
            <button class="btn btn-danger btn-sm borrar-btn">Borrar</button>
        </div>`).join('');

    // Inserta el HTML generado en el contenedor de la lista de compras
    document.getElementById('listaCompras').innerHTML = html;

    // Añade event listeners a todos los botones de eliminar
    document.querySelectorAll('.borrar-btn').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });
}

// Función para manejar el evento de eliminar un producto
function eliminarProducto(evento) {
    // Obtiene el nombre del producto a eliminar
    let nombreProducto = evento.target.parentElement.firstChild.textContent.trim();
    // Elimina el producto del localStorage
    localStorage.removeItem(nombreProducto);
    // Recarga la lista de compras
    cargarListaCompras();
}

// Abre las herramientas de desarrollo al presionar F12
document.addEventListener('keydown', (e) => {
    if (e.which === 123) {
        remote.getCurrentWindow().webContents.openDevTools();
    }
});

// Carga la lista de compras al iniciar
cargarListaCompras();
