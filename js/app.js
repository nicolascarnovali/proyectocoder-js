// Variables de JS necesarias
let nombreInput = document.getElementById("nombre");
let edadInput = document.getElementById("edad");

// Objetos de JS
let productos = [
    { nombre: "Cerveza Rubia Heineken", precio: 899.99 },
    { nombre: "Cerveza Rubia Corona", precio: 799.99 },
    { nombre: "Vodka Smirnoff", precio: 1499.99 },
    { nombre: "Vodka Sky", precio: 1199.99 },
    { nombre: "Gancia Americano", precio: 799.99 },
    { nombre: "Campari Aperitivo", precio: 1899.99 },
    { nombre: "Gin MG", precio: 5399.99 },
    { nombre: "Whisky Jack Daniels", precio: 15999.99 }
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
    { nombre: "Saavedra", direccion: "Ruiz Huidobro 4570, Ciudad", horario: "11:00 - 23:00" }
];

// Función para mostrar el listado de licorerías
function mostrarLicorerias(licoreriasMostradas) {
    let licoreriasUL = document.getElementById("licorerias-ul");
    licoreriasUL.innerHTML = "";

    for (let i = 0; i < licoreriasMostradas.length; i++) {
        let licoreria = licoreriasMostradas[i];
        let licoreriaItem = document.createElement("li");
        licoreriaItem.innerText = licoreria.nombre + " - " + licoreria.direccion + " (Horario: " + licoreria.horario + ")";
        licoreriasUL.appendChild(licoreriaItem);
    }
}

// Función para filtrar licorerías por horario
function filtrarPorHorario() {
    let horarioFiltro = prompt("Ingrese el horario para filtrar las licorerías:");
    let licoreriasFiltradas = licorerias.filter(function (licoreria) {
        return licoreria.horario.toLowerCase().includes(horarioFiltro.toLowerCase());
    });

    mostrarLicorerias(licoreriasFiltradas);
}

// Función para filtrar licorerías por dirección
function filtrarPorDireccion() {
    let direccionFiltro = prompt("Ingrese la dirección para filtrar las licorerías:");
    let licoreriasFiltradas = licorerias.filter(function (licoreria) {
        return licoreria.direccion.toLowerCase().includes(direccionFiltro.toLowerCase());
    });

    mostrarLicorerias(licoreriasFiltradas);
}

// Función para filtrar licorerías por nombre
function filtrarPorNombre() {
    let nombreFiltro = prompt("Ingrese el nombre para filtrar las licorerías:");
    let licoreriasFiltradas = licorerias.filter(function (licoreria) {
        return licoreria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase());
    });

    mostrarLicorerias(licoreriasFiltradas);
}

// Función para calcular el total de la compra
function calcularTotal(producto, cantidad) {
    let precio = producto.precio;
    return precio * cantidad;
}

// Función para verificar la edad
function verificarEdad(edad) {
    return edad >= 18;
}

// Función para filtrar productos por precio
function filtrarProductosPorPrecio(maxPrecio) {
    return productos.filter(function (producto) {
        return producto.precio <= maxPrecio;
    });
}

// Función para realizar la compra
function realizarCompra() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    if (verificarEdad(edad)) {
        let mensaje = "Hola, " + nombre + ". Puede realizar su compra:";
        for (let i = 0; i < productos.length; i++) {
            mensaje += "\n" + (i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio;
        }

        let opcion = parseInt(prompt(mensaje + "\nIngrese el número del producto que desea comprar:"));

        if (opcion >= 1 && opcion <= productos.length) {
            let cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));
            let productoSeleccionado = productos[opcion - 1];

            let total = calcularTotal(productoSeleccionado, cantidad);

            // Efectuar una salida por alert()
            alert("El total de su compra es: $" + total.toFixed(2));
        } else {
            alert("Opción inválida. Inténtelo de nuevo.");
        }
    } else {
        alert("Lo siento, debe ser mayor de edad para realizar una compra.");
    }

    // Prompt para elegir la licorería
    let opcionesLicorerias = "";
    for (let i = 0; i < licorerias.length; i++) {
        opcionesLicorerias += i + 1 + ". " + licorerias[i].nombre + "\n";
    }
    let opcionSeleccionada = parseInt(prompt("Seleccione una licorería para la entrega:\n" + opcionesLicorerias)) - 1;

    if (opcionSeleccionada >= 0 && opcionSeleccionada < licorerias.length) {
        let licoreriaSeleccionada = licorerias[opcionSeleccionada];
        alert("Licorería seleccionada para la entrega:\n\nNombre: " + licoreriaSeleccionada.nombre + "\nDirección: " + licoreriaSeleccionada.direccion + "\nHorario: " + licoreriaSeleccionada.horario);
    } else {
        alert("Opción inválida. No se ha seleccionado una licorería válida.");
    }
}

mostrarLicorerias(licorerias);