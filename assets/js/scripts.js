// Esperar a que el DOM esté completamente cargado
$(document).ready(function () {

    // Declaración de variables
    let productos = []; // Almacena los productos seleccionados
    let items = { id: 0 }; // Objeto que representa un ítem con una propiedad 'id' inicializada en 0

    // Llamada a la función mostrar(), que actualiza la cantidad de productos en el carrito
    mostrar();

    // Añadir la clase 'active' al enlace de la barra de navegación con la categoría 'all'
    $('.navbar-nav .nav-link[category="all"]').addClass('active');

    // Evento click para los enlaces de la barra de navegación
    $('.nav-link').click(function () {
        let productos = $(this).attr('category'); // Obtener la categoría del enlace clickeado

        // Remover la clase 'active' de todos los enlaces y añadirla al enlace clickeado
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        // Ocultar productos con una animación de escala
        $('.productos').css('transform', 'scale(0)');

        // Función para ocultar los productos después de cierto tiempo
        function ocultar() {
            $('.productos').hide();
        }
        setTimeout(ocultar, 400);

        // Función para mostrar los productos de la categoría seleccionada después de cierto tiempo
        function mostrar() {
            $('.productos[category="' + productos + '"]').show();
            $('.productos[category="' + productos + '"]').css('transform', 'scale(1)');
        }
        setTimeout(mostrar, 400);
    });

    // Evento click para el enlace de la categoría 'all'
    $('.nav-link[category="all"]').click(function () {

        // Función para mostrar todos los productos después de cierto tiempo
        function mostrarTodo() {
            $('.productos').show();
            $('.productos').css('transform', 'scale(1)');
        }
        setTimeout(mostrarTodo, 400);
    });

    // Evento click para el botón de agregar producto
    $('.agregar').click(function(e){
        e.preventDefault();
        const id = $(this).data('id');
        items = {
            id: id
        }
        // Agregar el producto al array y almacenarlo en el almacenamiento local
        productos.push(items);
        localStorage.setItem('productos', JSON.stringify(productos));
        // Llamar a la función mostrar()
        mostrar();
    })

    // Evento click para el botón del carrito
    $('#btnCarrito').click(function(e){
        // Cambiar la URL del botón del carrito
        $('#btnCarrito').attr('href','carrito.php');
    })

    // Evento click para el botón de vaciar el carrito
    $('#btnVaciar').click(function(){
        // Limpiar el almacenamiento local, la tabla del carrito y el total a pagar
        localStorage.removeItem("productos");
        $('#tblCarrito').html('');
        $('#total_pagar').text('0.00');
    })

    // Evento click para abrir el modal de categorías
    $('#abrirCategoria').click(function(){
        $('#categorias').modal('show');
    })

    // Evento click para abrir el modal de productos
    $('#abrirProducto').click(function () {
        $('#productos').modal('show');
    })

    // Evento click para los elementos con clase 'eliminar'
    $('.eliminar').click(function(e){
        e.preventDefault();
        // Confirmar la eliminación antes de enviar el formulario
        if (confirm('Esta seguro de eliminar?')) {
            this.submit();
        }
    })
});

// Función para mostrar la cantidad de productos en el carrito
function mostrar(){
    if (localStorage.getItem("productos") != null) {
        let array = JSON.parse(localStorage.getItem('productos'));
        if (array) {
            $('#carrito').text(array.length);
        }
    }
}
