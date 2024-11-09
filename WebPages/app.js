// Secciones y botones por roles
// Usuario
const seccionUsuario = document.getElementById("seccionUsuario");
const botonUsuario = document.getElementById("usuarioButton");

// Formularios de registro e inicio de sesión
const registerForm = document.getElementById("RegistroDeSesion");
const loginForm = document.getElementById("InicioDeSesion");

// Botones de registro, inicio y cerrar sesión
const registroButton = document.getElementById("registroButton");
const inicioButton = document.getElementById("inicioButton");
const cerrarSesionButton = document.getElementById("cerrarSesionButton");

// Contenedor QR
const contenedorQR = document.getElementById("contenedorQR");

let usuarios = [{id: 202457701, password: "1234", rol: 'usuario', name: 'Sergio'}];
let usuarioActual = null;

function ocultSections() {
    seccionUsuario.classList.add('hidden');
}

function showSectionByRol(rol) {
    ocultSections();

    switch (rol) {
        case 'usuario':
            // mostrar el nav button de usuario
            botonUsuario.style.display = 'inline-block';
            seccionUsuario.style.display = 'block';

            registroButton.style.display = 'none';
            inicioButton.style.display = 'none';

            cerrarSesionButton.style.display = 'inline-block';
            break;
        default:
            botonUsuario.style.display = 'none';
            seccionUsuario.style.display = 'none';

            registroButton.style.display = 'inline-block';
            inicioButton.style.display = 'inline-block';

            cerrarSesionButton.style.display = 'none';
    }
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        if (page.style.display === "block") {
            page.style.display = "none";
        }
    });

    showLoader();

    setTimeout(() => {
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = page.id === pageId ? "block" : "none";
        });
    }, 2000);
}

// Funcion de registro de usuario nueva
registerForm.addEventListener( "submit", (e) => {
    e.preventDefault();

    const matricula = document.getElementById("matriculaRegistro").value;
    const password = document.getElementById("passwordRegistro").value;
    const name = document.getElementById("name").value;

    if (usuarios.find(u => u.id === parseInt(matricula))) {
        alert('Usuario ya registrado');
        return;
    }

    usuarios.push({id: parseInt(matricula), password, rol: 'usuario', name});
    alert('Usuario registrado');
    registerForm.reset();
});


// Funcion de login de usuario nueva
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const matricula = document.getElementById("matriculaInicio").value;
    const password = document.getElementById("passwordInicio").value;

    const usuario = usuarios.find(u => u.id === parseInt(matricula) && u.password === password);

    if (!usuario) {
        alert('Usuario o contraseña incorrectos');
        return;
    }

    usuarioActual = usuario;
    showSectionByRol(usuarioActual.rol);
    showPage('seccionUsuario');
    loginForm.reset();
});

// Función para cerrar sesión
function cerrarSesion() {
    usuarioActual = null;
    showSectionByRol();
    showPage('main');
    alert('Sesión cerrada');
}

// Función para generar ficha de Examen Práctico (Usuario)
function generarFicha() {
    if (!usuarioActual || usuarioActual.rol !== 'usuario') {
        alert('No tienes permisos para generar la ficha');
        return;
    }

    alert('Ficha generada');
}

// Función para ver ubicaciones de estaciones (Usuario)

function verUbicaciones() {
    if (!usuarioActual || usuarioActual.rol !== 'usuario') {
        alert('No tienes permisos para ver las ubicaciones');
        return;
    }

    alert('Ubicaciones mostradas');
}

// Función para generar un QR temporal (Usuario)
function solicitarQR() {
    if (!usuarioActual || usuarioActual.rol !== 'usuario') {
        alert('No tienes permisos para solicitar un QR');
        return;
    }

    alert('QR generado, caduca en 10 minutos');
    // Hacer un array de los datos del usuario y desplegarlo en el QR a excepcion de la contraseña
    const usuarioSinPassword = { ...usuarioActual };
    delete usuarioSinPassword.password;

    new QRCode(contenedorQR, JSON.stringify(usuarioSinPassword));

    contenedorQR.style.display = 'block';
    contenedorQR.style.display = 'flex';
    contenedorQR.scrollIntoView();

    setTimeout(() => {
        contenedorQR.style.display = 'none';
        alert('El QR ha caducado');
    }, 10 * 60 * 1000);
}

// Funcion para mostrar la animacion de carga entre paginas
function showLoader() {
    const loader = document.getElementById("contenedor-load");
    loader.style.display = "block";
    loader.scrollIntoView();
    setTimeout(() => {
        loader.style.display = "none";
    }, 2000);
}