// Variables globales
        let amigos = [];
        let amigosRestantes = [];
        let juegoTerminado = false;

        // Funciones de botones INICIO
        function agregarAmigo() {
            let nombreAmigo = document.getElementById("txtAmigo").value;
            if(validarNombreAmigo(nombreAmigo)) {
                nombreAmigo = darFormatoAmigo(nombreAmigo);
                limpiarResultado();
                if(validarNombreUnico(nombreAmigo)) {
                    amigos.push(nombreAmigo);
                    document.getElementById("txtAmigo").value = "";
                    mostrarEnLista();
                    // Actualizamos la lista de amigos restantes
                    amigosRestantes = [...amigos];
                    actualizarEstadoBotones();
                    mostrarResultado(`✅ ${nombreAmigo} agregado correctamente.`);
                } else {
                    mostrarResultado("⚠️ Este nombre ya está registrado. Inserta uno nuevo.", "warning");
                }
            } else {
                mostrarResultado("⚠️ Por favor, inserte un nombre válido.", "warning");
            }
            document.getElementById("txtAmigo").focus();
        }

        function sortearAmigo() {
            if(amigos.length < 2) {
                mostrarResultado("⚠️ Necesitas al menos 2 amigos para sortear.", "warning");
                return;
            }

            if(amigosRestantes.length === 0) {
                // Mostrar mensaje de fin de sorteo
                mostrarResultado("🎉 Todos los amigos fueron sorteados. ¡El juego ha terminado!", "success");
                juegoTerminado = true;
                document.getElementById("sortearBtn").style.display = "none";
                document.getElementById("reiniciarBtn").style.display = "block";
                return;
            }

            let elegido = generarNumeroRandomRestantes();
            let amigoElegido = amigosRestantes[elegido];
            mostrarResultado(`🎯 El amigo secreto es: ${amigoElegido}`, "success");

            // Eliminamos al amigo sorteado de la lista de restantes
            amigosRestantes.splice(elegido, 1);
            
            // Actualizamos el estado de los botones
            actualizarEstadoBotones();
        }

        // Funciones de validación INICIO
        function darFormatoAmigo(amigo) {
            amigo = amigo.trim();
            return amigo.charAt(0).toUpperCase() + amigo.slice(1).toLowerCase();
        }

        function validarNombreAmigo(amigo) {
            return amigo && amigo.trim() !== "" && amigo.trim().length >= 2;
        }

        function validarNombreUnico(amigo) {
            return !amigos.some(nombre => nombre.toLowerCase() === amigo.toLowerCase());
        }
        // Funciones de validación FIN

        // Funciones secundarias INICIO
        function generarNumeroRandomRestantes() {
            return Math.floor(Math.random() * amigosRestantes.length);
        }

        function mostrarEnLista() {
            let lista = document.getElementById("listaAmigos");
            if(amigos.length === 0) {
                lista.innerHTML = "<li>No hay amigos agregados aún...</li>";
                return;
            }
            
            lista.innerHTML = "";
            amigos.forEach((elem, index) => {
                const isRemaining = amigosRestantes.includes(elem);
                lista.innerHTML += `<li style="${!isRemaining ? 'opacity: 0.5; text-decoration: line-through;' : ''}">${index + 1}. ${elem} ${!isRemaining ? '(sorteado)' : ''}</li>`;
            });
        }

        function mostrarResultado(texto, tipo = "normal") {
            let lista = document.getElementById("resultado");
            lista.className = `result-list ${tipo}`;
            lista.innerHTML = texto;
        }

        function limpiarResultado() {
            document.getElementById("resultado").innerHTML = "";
            document.getElementById("resultado").className = "result-list";
        }

        function actualizarEstadoBotones() {
            const sortearBtn = document.getElementById("sortearBtn");
            const reiniciarBtn = document.getElementById("reiniciarBtn");
            
            if(amigos.length < 2) {
                sortearBtn.disabled = true;
                sortearBtn.textContent = "🎲 Necesitas al menos 2 amigos";
            } else if(amigosRestantes.length === 0 && !juegoTerminado) {
                sortearBtn.disabled = false;
                sortearBtn.textContent = "🎲 Finalizar juego";
            } else {
                sortearBtn.disabled = false;
                sortearBtn.textContent = `🎲 Sortear amigo (${amigosRestantes.length} restantes)`;
            }
        }

        function reiniciarJuego() {
            amigos = [];
            amigosRestantes = [];
            juegoTerminado = false;
            document.getElementById("listaAmigos").innerHTML = "<li>No hay amigos agregados aún...</li>";
            limpiarResultado();
            document.getElementById("txtAmigo").value = "";
            document.getElementById("sortearBtn").style.display = "block";
            document.getElementById("reiniciarBtn").style.display = "none";
            actualizarEstadoBotones();
            document.getElementById("txtAmigo").focus();
            mostrarResultado("🔄 Juego reiniciado. ¡Agrega nuevos amigos!");
        }

        // Event listeners
        document.getElementById("txtAmigo").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                agregarAmigo();
            }
        });

        // Inicialización
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("txtAmigo").focus();
            mostrarEnLista();
            actualizarEstadoBotones();
            mostrarResultado("👋 ¡Bienvenido! Agrega nombres para comenzar el sorteo.");
        });