require('./styles/main.scss');

/* Función para sumar los dos últimos digitos */
function sumaNumeros(num) {
  num = num.toString();

  const ultimosNumeros = num.substr(-2);

  return parseInt(ultimosNumeros[0]) + parseInt(ultimosNumeros[1]);
}

/* Contador para el código de descuento */

let tiempo = 1200;
const contador = document.getElementById('contador');
let timer;

function formatContador() {
  const minutes = Math.floor(tiempo / 60);
  const seconds = tiempo % 60;
  contador.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

formatContador();

function initTimer() {
  timer = setInterval(() => {
    tiempo--;
    formatContador();
    if (tiempo < 0) {
      clearInterval(timer);
      document
        .getElementById('codigo-caducado')
        .classList.remove('color-activo');
      document
        .getElementById('codigo-caducado')
        .classList.add('color-caducado');
      document.getElementById('boton-reiniciar').style.display = 'block';
      document.getElementById('codigo-caducado-mensaje').style.display =
        'block';
      document.getElementById('contador').style.display = 'none';
    }
  }, 1000);
}

/* Vistas de los diferentes steps del formulario */

window.mostrarPagina1 = function () {
  document.getElementById('pagina3').style.display = 'none';
  document.getElementById('pagina2').style.display = 'none';
  document.getElementById('pagina1').style.display = 'block';
  document.getElementById('descripcion').style.display = 'block';

  document.getElementById('titulo').textContent = '¡Vamos allá!';
  document.getElementById('introduccion').textContent = 'Uso siroko desde...';
  document.getElementById('pasos').innerHTML = 'paso 1 de 2';
};

window.mostrarPagina2 = function () {
  document.getElementById('pagina1').style.display = 'none';
  document.getElementById('descripcion').style.display = 'none';
  document.getElementById('introduccion').textContent =
    'Por unas gafas Siroko, yo...';
  document.getElementById('pasos').innerHTML = 'paso 2 de 2';
  document.getElementById('pagina2').style.display = 'block';
  document.getElementById('titulo').textContent = 'Vamos, una más';
};

window.mostrarPagina3 = function () {
  document.getElementById('pagina2').style.display = 'none';
  document.getElementById('pagina3').style.display = 'block';
  document.getElementById('titulo').textContent = '¡Enhorabuena!';
  document.getElementById('introduccion').textContent = 'Lo prometido es deuda';
  document.getElementById('pasos').innerHTML = 'Tu premio está listo';
  const seleccionado1 = document.querySelector('input[name="años"]:checked');
  const valorSeleccionado1 = seleccionado1.value;
  const seleccionado2 = document.querySelector(
    'input[name="supuestos"]:checked'
  );
  const valorSeleccionado2 = seleccionado2.value;
  document.getElementById('codigo').textContent =
    sumaNumeros(valorSeleccionado1) +
    valorSeleccionado2
      .replace(/[a/A\s]/g, '')
      .substr(-4)
      .toUpperCase();
  initTimer();
};

/* Código para copiar al portapapeles el código de decuento */

const botonCopiar = document.querySelector('.boton-copiar');
const codigo = document.querySelector('#codigo');

botonCopiar.addEventListener('click', () => {
  Toastify({
    text: 'Copiado en el portapapeles',

    duration: 3000,
  }).showToast();
  navigator.clipboard.writeText(codigo.textContent).then(
    () => {},
    (err) => {
      console.error('Error al copiar al portapapeles: ', err);
    }
  );
});

window.onbeforeunload = function (e) {
  e = e || window.event;

  if (tiempo <= 0) {
    return null;
  }

  // For IE and Firefox prior to version 4
  if (e) {
    e.returnValue = '¿Seguro?';
  }

  // For Safari
  return '¿Seguro?';
};
