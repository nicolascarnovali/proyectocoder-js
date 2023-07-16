document.addEventListener("DOMContentLoaded", function () {
    let overlay = document.getElementById("overlay");
    let nombreOverlay = document.getElementById("nombre-overlay");
    let edadOverlay = document.getElementById("edad-overlay");

    let nombreGuardado = localStorage.getItem("nombre");
    let edadGuardada = localStorage.getItem("edad");

    if (
        nombreGuardado &&
        edadGuardada &&
        verificarEdad(edadGuardada) &&
        nombreGuardado.length >= 3
    ) {
        overlay.style.display = "none";
    } else {
        overlay.style.display = "flex";

        document
            .getElementById("verificar-btn")
            .addEventListener("click", function () {
                let nombre = nombreOverlay.value;
                let edad = edadOverlay.value;

                if (verificarEdad(edad) && nombre.length >= 3) {
                    overlay.style.display = "none";
                    localStorage.setItem("nombre", nombre);
                    localStorage.setItem("edad", edad);
                } else {
                    alert("Nombre inválido o edad insuficiente");
                }
            });
    }
});

let carrito = [];

// Objetos de JS
let productos = [
    { nombre: "Cerveza Rubia Heineken", precio: 899.99, imagen: "https://hiperlibertad.vteximg.com.br/arquivos/ids/158639-1000-1000/Cerveza-rubia-Heineken-710-Cc-C-HEINEKEN-LATA-710-CC-1-1561.jpg?v=637236252247400000" },
    { nombre: "Cerveza Rubia Corona", precio: 799.99, imagen: "https://d2izjnmtylvtfh.cloudfront.net/21873937-thickbox_default/cerveza-corona-rubia-269ml.jpg" },
    { nombre: "Vodka Smirnoff", precio: 1499.99, imagen: "https://d2r9epyceweg5n.cloudfront.net/stores/001/590/373/products/d_smirf1-aef2a6579975a035e916227587677140-1024-1024.jpg" },
    { nombre: "Vodka Sky", precio: 1199.99, imagen: "https://www.rossofinefood.com/2378-large_default/skyy-vodka-1-l.jpg" },
    { nombre: "Gancia Americano", precio: 799.99, imagen: "https://gobar.vtexassets.com/arquivos/ids/156378/GANICA.jpg?v=636716737494030000" },
    { nombre: "Campari Aperitivo", precio: 1899.99, imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/835/701/products/campari-aperitivo-750ml1-7cafead7a1f8a2358516661026421170-640-0.jpg" },
    { nombre: "Gin MG", precio: 5399.99, imagen: "https://gobar.vtexassets.com/arquivos/ids/159646/01031900031.jpg?v=638107905491330000" },
    { nombre: "Whisky Jack Daniels", precio: 15999.99, imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/384/985/products/whisky-jack-daniels-750-ml1-d9b2e5ecffb25327dd16203179065708-1024-1024.webp" },
];

// Variables de JS necesarias
let licorerias = [
    { nombre: "Palermo", direccion: "Av. Juan B. Justo 131, Ciudad", horario: "10:00 - 22:00" },
    { nombre: "Belgrano", direccion: "Av. Cabildo 2100, Ciudad", horario: "09:00 - 20:00" },
    { nombre: "Villa Urquiza", direccion: "Av. Triunvirato 2403, Ciudad", horario: "11:00 - 23:00" },
    { nombre: "Parque Patricios", direccion: "Av. Caseros 3029, Ciudad", horario: "10:00 - 23:00" },
    { nombre: "Boedo", direccion: "Constitución 3972, Ciudad", horario: "12:00 - 00:00" },
    { nombre: "Almagro", direccion: "Av. Medrano 26, Ciudad", horario: "13:00 - 22:00" },
    { nombre: "Nuñez", direccion: "Vilela 1930, Ciudad", horario: "9:00 - 21:00" },
    { nombre: "Saavedra", direccion: "Ruiz Huidobro 4570, Ciudad", horario: "11:00 - 23:00" },
];

// Función para verificar la edad
function verificarEdad(edad) {
    return edad >= 18;
}

function agregarAlCarrito(producto, cantidad) {
    let carritoData = localStorage.getItem("carrito");
    carrito = carritoData ? JSON.parse(carritoData) : [];

    let productoExistente = carrito.find((p) => p.nombre === producto.nombre);

    if (productoExistente) {
        let cantidadTotal = productoExistente.cantidad + cantidad;

        if (cantidadTotal <= 100) {
            productoExistente.cantidad = cantidadTotal;

            if (cantidadTotal < 5) {
                delete productoExistente.descuento;
            } else if (!productoExistente.descuento) {
                productoExistente.descuento = true;
            }
        } else {
            alert("No se pueden agregar más de 100 unidades del producto: " + producto.nombre);
            return;
        }
    } else {
        producto.cantidad = cantidad;
        carrito.push(producto);
    }

    // Guardar los datos del carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Se ha agregado " + cantidad + " unidad(es) del producto '" + producto.nombre + "' al carrito.");

    // Actualizar el carrito en la página del carrito.html (si está abierta)
    if (window.location.href.includes("carrito.html")) {
        mostrarCarrito();
    }

    mostrarCarrito();
}

function mostrarProductos() {
    let productosList = document.getElementById("productos-list");
    productosList.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        let imagenProducto = document.createElement("img");
        imagenProducto.src = producto.imagen;
        imagenProducto.classList.add("imagen-producto");

        let productoNombre = document.createElement("h1");
        productoNombre.innerText = producto.nombre;
        productoNombre.classList.add("nombre-producto");

        let productoPrecio = document.createElement("h3");
        productoPrecio.innerText = "Precio: $" + producto.precio.toFixed(2);
        productoPrecio.classList.add("precio-producto");

        let cantidadLabel = document.createElement("label");
        cantidadLabel.innerText = "Cantidad:";
        cantidadLabel.classList.add("cantidad-label");

        let cantidadSelect = document.createElement("input");
        cantidadSelect.type = "number";
        cantidadSelect.min = "1";
        cantidadSelect.max = "100";
        cantidadSelect.value = "1";
        cantidadSelect.classList.add("cantidad-select");
        cantidadSelect.id = "cantidad-select-" + i;

        let agregarCarritoButton = document.createElement("button");
        agregarCarritoButton.innerText = "Agregar al carrito";
        agregarCarritoButton.classList.add("boton-agregar");
        agregarCarritoButton.addEventListener("click", function () {
            let cantidad = parseInt(cantidadSelect.value);
            agregarAlCarrito(producto, cantidad);
        });

        productoDiv.appendChild(imagenProducto);
        productoDiv.appendChild(productoNombre);
        productoDiv.appendChild(productoPrecio);
        productoDiv.appendChild(cantidadLabel);
        productoDiv.appendChild(cantidadSelect);
        productoDiv.appendChild(agregarCarritoButton);
        productosList.appendChild(productoDiv);
    }
}

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito-container");
    let carritoList = document.getElementById("carrito-list");
    let totalCompra = document.getElementById("total-compra");
    carritoList.innerHTML = "";
    totalCompra.innerText = "";
    let carritoData = localStorage.getItem("carrito");
    let carrito = carritoData ? JSON.parse(carritoData) : [];

    if (carrito.length === 0) {
        carritoContainer.innerText = "El carrito está vacío.";
        carritoContainer.style.color = "white";
    } else {
        let subtotal = 0;
        let descuentoTotal = 0;

        for (let i = 0; i < carrito.length; i++) {
            let producto = carrito[i];
            let productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-carrito");

            let productoImagen = document.createElement("img");
            productoImagen.src = producto.imagen;
            productoImagen.alt = producto.nombre;
            productoImagen.classList.add("imagen-producto-carrito");

            let productoNombre = document.createElement("h4");
            productoNombre.innerText = producto.nombre;
            productoNombre.classList.add("nombre-producto");

            let cantidadLabel = document.createElement("label");
            cantidadLabel.innerText = "Cantidad:";
            cantidadLabel.classList.add("cantidad-label");

            let cantidadSelect = document.createElement("input");
            cantidadSelect.type = "number";
            cantidadSelect.min = "1";
            cantidadSelect.max = "100";
            cantidadSelect.value = producto.cantidad;
            cantidadSelect.classList.add("cantidad-select");
            cantidadSelect.addEventListener("change", function () {
                actualizarCantidad(i, parseInt(cantidadSelect.value));
            });

            let productoPrecio = document.createElement("p");
            let descuento = 0;

            if (producto.descuento) {
                descuento = producto.precio * producto.cantidad * 0.2;
                productoPrecio.innerText = "Precio: $" + producto.precio.toFixed(2) + " (Descuento: $" + descuento.toFixed(2) + ")";
                descuentoTotal += descuento;
            } else {
                productoPrecio.innerText = "Precio: $" + producto.precio.toFixed(2);
            }

            let subtotalProducto = producto.precio * producto.cantidad - descuento;
            subtotal += subtotalProducto;

            let productoSubtotal = document.createElement("p");
            productoSubtotal.innerText = "Subtotal: $" + subtotalProducto.toFixed(2);
            productoSubtotal.classList.add("subtotal-producto");

            let eliminarProductoButton = document.createElement("button");
            eliminarProductoButton.innerText = "Eliminar";
            eliminarProductoButton.classList.add("boton-eliminar");
            eliminarProductoButton.addEventListener("click", function () {
                eliminarProductoDelCarrito(i);
            });

            productoDiv.appendChild(productoImagen);
            productoDiv.appendChild(productoNombre);
            productoDiv.appendChild(cantidadLabel);
            productoDiv.appendChild(cantidadSelect);
            productoDiv.appendChild(productoPrecio);
            productoDiv.appendChild(productoSubtotal);
            productoDiv.appendChild(eliminarProductoButton);

            carritoList.appendChild(productoDiv);
        }

        let total = subtotal - descuentoTotal;

        totalCompra.innerText = "Total de la compra: $" + total.toFixed(2);
    }
}

function mostrarTotalCompra() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito && carrito.length > 0) {
        let subtotal = 0;
        let descuento = 0;
        let productosUnicos = new Set();

        for (let i = 0; i < carrito.length; i++) {
            let producto = carrito[i];
            subtotal += producto.precio * producto.cantidad;
            productosUnicos.add(producto.nombre);

            if (producto.descuento) {
                descuento += producto.precio * producto.cantidad * 0.2;
            }
        }

        let total = subtotal - descuento;
        let totalCompra = document.getElementById("total-compra");
        totalCompra.innerText = "Total de la compra: $" + total.toFixed(2);

        document.getElementById("finalizar-compra-btn").style.display = "block";
        mostrarSeleccionLicoreria();
    } else {
        alert("El carrito está vacío. Agregue productos antes de finalizar la compra.");
    }
}

function actualizarCantidad(index, cantidad) {
    let carritoData = localStorage.getItem("carrito");
    carrito = carritoData ? JSON.parse(carritoData) : [];

    if (index >= 0 && index < carrito.length) {
        let producto = carrito[index];
        producto.cantidad = cantidad;

        if (cantidad >= 5) {
            producto.descuento = true;
        } else {
            delete producto.descuento;
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}


function mostrarSeleccionLicoreria() {
    let licoreriasSelect = document.createElement("select");
    licoreriasSelect.id = "licorerias-select";

    for (let i = 0; i < licorerias.length; i++) {
        let option = document.createElement("option");
        option.value = i.toString();
        option.text = licorerias[i].nombre;
        licoreriasSelect.appendChild(option);
    }

    let licoreriaSeleccionada = document.getElementById("licoreria-seleccionada");
    licoreriaSeleccionada.innerHTML = "";
    licoreriaSeleccionada.appendChild(licoreriasSelect);

    let siguienteBtn = document.createElement("button");
    siguienteBtn.innerText = "Siguiente";
    siguienteBtn.addEventListener("click", function () {
        let licoreriaIndex = licoreriasSelect.value;
        if (licoreriaIndex !== "") {
            let licoreria = licorerias[licoreriaIndex];
            vaciarCarrito();
            mostrarDatosLicoreria(licoreria);
        } else {
            alert("Seleccione una licorería válida.");
        }
    });

    licoreriaSeleccionada.appendChild(siguienteBtn);
}

// Función para mostrar los datos de la licorería seleccionada
function mostrarDatosLicoreria(licoreria) {
    let datosLicoreria = document.createElement("div");
    datosLicoreria.innerHTML = `
        <h3>Licorería seleccionada para la entrega:</h3>
        <p><strong>Nombre:</strong> ${licoreria.nombre}</p>
        <p><strong>Dirección:</strong> ${licoreria.direccion}</p>
        <p><strong>Horario:</strong> ${licoreria.horario}</p>
    `;

    let licoreriaSeleccionada = document.getElementById("licoreria-seleccionada");
    licoreriaSeleccionada.innerHTML = "";
    licoreriaSeleccionada.appendChild(datosLicoreria);
}

function eliminarProductoDelCarrito(index) {
    let carritoData = localStorage.getItem("carrito");
    carrito = carritoData ? JSON.parse(carritoData) : [];

    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function borrarProductosDelCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    document.getElementById("licoreria-seleccionada").innerHTML = "";
    document.getElementById("total-compra").innerText = "";
}

// Mostrar el carrito al cargar la página
window.addEventListener("load", function () {
    mostrarCarrito();
    document.getElementById("finalizar-compra-btn").addEventListener("click", function () {
        mostrarTotalCompra();
        document.getElementById("licoreria-seleccionada").style.display = "block";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("vaciar-carrito-btn").addEventListener("click", function () {
        vaciarCarrito();
    });
});

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    document.getElementById("licoreria-seleccionada").innerHTML = "";
    document.getElementById("total-compra").innerText = "";
}

mostrarProductos();
