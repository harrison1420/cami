document.addEventListener("DOMContentLoaded", function () {
    var fechaProgramada = new Date('2023-11-04T22:00:00');
    var fechaActual = new Date();
    var tiempoRestante;
    if (typeof fechaProgramada !== 'undefined') {
        tiempoRestante = fechaProgramada - fechaActual;
    } else {
        tiempoRestante = 7 * 24 * 60 * 60 * 1000;
    }
    function actualizarCuentaRegresiva() {
        var dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        var horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
        document.querySelector('.dias').textContent = dias;
        document.querySelector('.horas').textContent = horas;
        document.querySelector('.minutos').textContent = minutos;
        document.querySelector('.segundos').textContent = segundos;
        if (tiempoRestante <= 0) {
            clearInterval(cuentaRegresiva);
        }
        tiempoRestante -= 1000;
    }
    actualizarCuentaRegresiva();
    var cuentaRegresiva = setInterval(actualizarCuentaRegresiva, 1000);
    const myModal = new bootstrap.Modal(document.getElementById('modal-principal'))
    myModal.show();
    const btnPause = document.getElementById("botonPause");
    const miAudio = document.getElementById("miAudio");
    const btnPlay = document.getElementById("boton-play");
    const btnCerrar = document.getElementById("boton-cerrar");
    let isPlaying = false;
    btnPlay.addEventListener("click", () => {
        miAudio.play();
        myModal.hide();
    })
    btnCerrar.addEventListener("click", () => {
        myModal.hide();
    })
    btnPause.addEventListener("click", () => {
        if (isPlaying) {
            miAudio.pause();
            isPlaying = false;
        } else {
            miAudio.play();
            isPlaying = true;
        }
    })
    miAudio.addEventListener("ended", function () {
        isPlaying = false;
    });
    const btnAgendar = document.getElementById("btn-agendar");
    btnAgendar.addEventListener("click", function () {
        const fechaEvento = new Date("2023-11-04T22:00:00");
        const fechaFormateada = fechaEvento.toISOString().replace(/-|:|\.\d+/g, "");
        const nombreEvento = "Fiesta de 15 Flor";
        const direccionEvento = "C.Jorge Luis Borges 3091, Yerba Buena, Tucumán";
        const urlGoogleCalendar = `https://www.google.com/calendar/render?action=TEMPLATE&text=${nombreEvento}&dates=${fechaFormateada}/${fechaFormateada}&location=${direccionEvento}`;
        window.open(urlGoogleCalendar, "_blank");
    });
    const enviarCancion = document.getElementById('enviarCancion');
    enviarCancion.addEventListener("click", function () {
        const nombre = document.getElementById("nombre").value;
        const cancion = document.getElementById("cancion").value;
        const link = document.getElementById("link").value;
        const mensaje = `Hola, soy ${nombre}! Te recomiendo la canción "${cancion}". Escúchala aquí: ${link}`;
        const mensajeCodificado = encodeURIComponent(mensaje);
        const numeroDestino = '+5493814562955';
        const apiURL = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${mensajeCodificado}`;
        window.location.href = apiURL;
    });
    const enviarBtn = document.getElementById("enviar");
    enviarBtn.addEventListener("click", function () {
        const confirmo = document.querySelector('input[name="confirmo"]:checked').value;
        let mensaje = ''
        if (confirmo == 'si') {
            mensaje = 'Confirmo mi asistencia!';
        } else {
            mensaje = 'No podre asistir :( espero que pases una hermosa noche';
        }
        const nombre = document.getElementById("recipient-name").value;
        const detalle = document.getElementById("message-text").value;
        const apiURL = `https://api.whatsapp.com/send?phone=+5493816016292&text=Confirmación:${mensaje}%0A%0ANombre:${nombre}%0A%0ADetalle:${detalle}`;
        window.location.href = apiURL;
    });
});
