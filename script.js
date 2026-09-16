//==================================================
// MALLA CURRICULAR INTERACTIVA
// Medicina Veterinaria USS
//==================================================

//==================================================
// CONFIGURACIÓN
//==================================================

let viaSeleccionada =
localStorage.getItem("viaSeleccionada") || "tesina";

//==================================================
// RAMO SELECCIONADO
//==================================================

let ramoSeleccionado = null;

let ramoExplorado = null;

//==================================================
// BUSCAR RAMO POR ID
//==================================================

function buscarRamo(id) {

    // Semestres 1 al 9
    for (let i = 1; i <= 9; i++) {

        const semestre =
            malla["semestre" + i];

        const ramo =
            semestre.find(r => r.id === id);

        if (ramo) return ramo;

    }

    // Semestre 10
    for (const via of [
        "practica",
        "internado",
        "tesina"
    ]) {

        const ramo =
            malla.semestre10[via]
                .find(r => r.id === id);

        if (ramo) return ramo;

    }

    return null;

}


//==================================================
// OBTENER BOTÓN DEL RAMO
//==================================================

function obtenerBotonRamo(id){

    return document.querySelector(
        `.subject[data-id="${id}"]`
    );

}


//==================================================
// CENTRO DERECHA
//==================================================

function centroDerecha(elemento){

    const svg =
        document.getElementById("arrowLayer");

    const r =
        elemento.getBoundingClientRect();

    const s =
        svg.getBoundingClientRect();

    return {

        x: r.right - s.left,

        y:
            r.top -
            s.top +
            r.height / 2

    };

}


//==================================================
// CENTRO IZQUIERDA
//==================================================

function centroIzquierda(elemento){

    const svg =
        document.getElementById("arrowLayer");

    const r =
        elemento.getBoundingClientRect();

    const s =
        svg.getBoundingClientRect();

    return {

        x: r.left - s.left,

        y:
            r.top -
            s.top +
            r.height / 2

    };

}


//==================================================
// CENTRO DE COLUMNA
//==================================================

function obtenerCentroColumna(contenedorID){

    const columna =
        document.getElementById(contenedorID);

    if(!columna) return null;

    const svg =
        document.getElementById("arrowLayer");

    const r =
        columna.getBoundingClientRect();

    const s =
        svg.getBoundingClientRect();

    return {

        izquierda:
            r.left - s.left,

        derecha:
            r.right - s.left,

        centro:
            r.left -
            s.left +
            r.width / 2

    };

}


//==================================================
// DIBUJAR LÍNEA CORTA
//==================================================

//==================================================
// DIBUJAR LÍNEA CORTA
//==================================================

function dibujarLinea(x1, y1, x2, y2){

    const svg =
        document.getElementById("arrowLayer");

    if(!svg) return;


    //==================================================
    // DISTANCIA REAL ENTRE LOS PUNTOS
    //==================================================

    const distancia =
        Math.abs(x2 - x1);


    // La separación nunca puede ser
    // mayor que la mitad del espacio disponible.

    const separacion =
        Math.min(
            20,
            distancia / 2
        );


    //==================================================
    // PUNTOS INTERMEDIOS
    //==================================================

    const salidaX =
        x1 + separacion;

    const entradaX =
        x2 - separacion;


    //==================================================
    // CREAR LÍNEA
    //==================================================

    const path =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    //==================================================
    // DESTINO A LA DERECHA
    //==================================================

    if(x2 > x1){

        const diferencia =
            y2 - y1;

        const mitad =
            y1 + diferencia / 2;


        path.setAttribute(
            "d",
            `
            M ${x1} ${y1}

            L ${salidaX} ${y1}

            L ${salidaX} ${mitad}

            L ${entradaX} ${mitad}

            L ${entradaX} ${y2}

            L ${x2} ${y2}
            `
        );

    }


    //==================================================
    // DESTINO A LA IZQUIERDA
    //==================================================

    else{

        const desplazamiento =
            y2 >= y1
                ? 35
                : -35;

        const pasilloY =
            y1 + desplazamiento;


        path.setAttribute(
            "d",
            `
            M ${x1} ${y1}

            L ${salidaX} ${y1}

            L ${salidaX} ${pasilloY}

            L ${entradaX} ${pasilloY}

            L ${entradaX} ${y2}

            L ${x2} ${y2}
            `
        );

    }


    //==================================================
    // ESTILO
    //==================================================

    path.setAttribute(
        "fill",
        "none"
    );

    path.setAttribute(
        "stroke",
        "#003C71"
    );

    path.setAttribute(
        "stroke-width",
        "3"
    );

    path.setAttribute(
        "stroke-linejoin",
        "round"
    );

    path.setAttribute(
        "stroke-linecap",
        "round"
    );


    svg.appendChild(path);


    //==================================================
    // PUNTA DE FLECHA
    //==================================================

    const largo = 8;


    const punta =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    punta.setAttribute(
        "d",
        `
        M ${x2-largo}
          ${y2-largo/2}

        L ${x2}
          ${y2}

        L ${x2-largo}
          ${y2+largo/2}
        `
    );


    punta.setAttribute(
        "stroke",
        "#003C71"
    );

    punta.setAttribute(
        "stroke-width",
        "3"
    );

    punta.setAttribute(
        "fill",
        "none"
    );

    punta.setAttribute(
        "stroke-linejoin",
        "round"
    );

    punta.setAttribute(
        "stroke-linecap",
        "round"
    );


    svg.appendChild(punta);

}


//==================================================
// BUSCAR DEPENDIENTES
//==================================================

function buscarDependientes(idRamo) {

    const dependientes = [];


    // Semestres normales

    for (let i = 1; i <= 9; i++) {

        malla["semestre" + i].forEach(ramo => {

            if (
                ramo.requisitos &&
                ramo.requisitos.includes(idRamo)
            ) {

                dependientes.push(ramo);

            }

        });

    }


    // Semestre 10

    [
        "practica",
        "internado",
        "tesina"
    ].forEach(via => {

        malla.semestre10[via].forEach(ramo => {

            if (
                ramo.requisitos &&
                ramo.requisitos.includes(idRamo)
            ) {

                dependientes.push(ramo);

            }

        });

    });


    return dependientes;

}


//==================================================
// OBTENER ELEMENTO RAMO
//==================================================

function obtenerElementoRamo(id){

    const botones =
        document.querySelectorAll(".subject");


    for(const boton of botones){

        const nombre =
            boton.textContent
                .replace("🔒 ","")
                .trim();


        const ramo =
            buscarRamo(id);


        if(
            ramo &&
            nombre === ramo.nombre
        ){

            return boton;

        }

    }


    return null;

}


//==================================================
// DESAPROBAR RAMOS DEPENDIENTES
//==================================================

function desaprobarDependientes(idRamo) {

    const dependientes =
        buscarDependientes(idRamo);


    dependientes.forEach(ramo => {

        ramo.aprobado = false;

        desaprobarDependientes(
            ramo.id
        );

    });

}


//==================================================
// VERIFICAR DESBLOQUEO
//==================================================

function estaDesbloqueado(ramo) {

    if (
        !ramo.requisitos ||
        ramo.requisitos.length === 0
    ) {

        return true;

    }


    return ramo.requisitos.every(id => {

        const requisito =
            buscarRamo(id);

        return (
            requisito &&
            requisito.aprobado
        );

    });

}


//==================================================
// DIBUJAR UN SEMESTRE
//==================================================

function dibujarSemestre(
    ramos,
    contenedorID
){

    const contenedor =
        document.getElementById(
            contenedorID
        );

    if(!contenedor) return;


    contenedor.innerHTML = "";


    ramos.forEach(ramo => {

        //==========================================
        // CONTENEDOR DEL RAMO
        //==========================================

        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add(
            "subject-container"
        );


        //==========================================
        // BOTÓN PRINCIPAL
        //==========================================

        const boton =
            document.createElement("button");

        boton.classList.add(
            "subject"
        );


        boton.dataset.id =
            ramo.id;

        boton.dataset.semestre =
            contenedorID;


        if(
            ramoSeleccionado === ramo.id
        ){

            boton.classList.add(
                "selected"
            );

        }


        const desbloqueado =
            estaDesbloqueado(ramo);


        if(ramo.aprobado){

            boton.classList.add(
                "approved"
            );

        }

        else if(ramo.cursando){

            boton.classList.add(
                "current"
            );

        }

        else if(desbloqueado){

            boton.classList.add(
                "pending"
            );

        }

        else{

            boton.classList.add(
                "locked"
            );

        }


        boton.textContent =
            desbloqueado
                ? ramo.nombre
                : "🔒 " + ramo.nombre;


        //==========================================
        // BOTÓN LUPA
        //==========================================

        const lupa =
            document.createElement("button");

        lupa.classList.add(
            "subject-search"
        );

        lupa.type = "button";

        lupa.textContent = "🔍";

        lupa.title =
            "Mostrar u ocultar prerrequisitos";

        lupa.setAttribute(
            "aria-label",
            "Mostrar u ocultar prerrequisitos de " + ramo.nombre
        );


        lupa.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();


                if(
                    ramoExplorado === ramo.id
                ){

                    ramoExplorado =
                        null;

                }

                else{

                    ramoExplorado =
                        ramo.id;

                }


                actualizarInterfaz();

            }
        );


        //==========================================
        // CLICK NORMAL DEL RAMO
        //==========================================

        boton.addEventListener(
            "click",
            () => {

                // Al pulsar un ramo se muestran sus conexiones de
                // prerrequisito. Esto también permite consultar ramos
                // bloqueados sin modificar su estado académico.
                ramoExplorado =
                    ramo.id;

                if(
                    !estaDesbloqueado(ramo)
                ){

                    actualizarInterfaz();

                    return;

                }


                if(ramo.aprobado){

                    ramo.aprobado =
                        false;

                    ramo.cursando =
                        false;


                    desaprobarDependientes(
                        ramo.id
                    );

                }

                else if(ramo.cursando){

                    ramo.cursando =
                        false;

                    ramo.aprobado =
                        true;

                }

                else{

                    ramo.cursando =
                        true;

                }


                actualizarInterfaz();

            }
        );


        //==========================================
        // TOOLTIP
        //==========================================

        const tooltip =
            document.getElementById(
                "tooltip"
            );


        boton.addEventListener(
            "mousemove",
            (e) => {

                tooltip.style.display =
                    "block";


                const margen = 20;

                const anchoTooltip =
                    tooltip.offsetWidth;

                const altoTooltip =
                    tooltip.offsetHeight;


                let x =
                    e.clientX + margen;

                let y =
                    e.clientY + margen;


                if(
                    x + anchoTooltip >
                    window.innerWidth
                ){

                    x =
                        e.clientX -
                        anchoTooltip -
                        margen;

                }


                if(
                    y + altoTooltip >
                    window.innerHeight
                ){

                    y =
                        e.clientY -
                        altoTooltip -
                        margen;

                }


                tooltip.style.left =
                    x + "px";

                tooltip.style.top =
                    y + "px";


                tooltip.innerHTML = `
                    <strong>${ramo.nombre}</strong><br><br>
                    <b>Código:</b> ${ramo.id}<br>
                    <b>Créditos:</b> ${ramo.creditos} SCT
                `;

            }
        );


        boton.addEventListener(
            "mouseleave",
            () => {

                tooltip.style.display =
                    "none";

            }
        );


        tarjeta.appendChild(
            boton
        );

        tarjeta.appendChild(
            lupa
        );


        contenedor.appendChild(
            tarjeta
        );

    });

}

//==================================================
// DIBUJAR TODA LA MALLA
//==================================================

function dibujarMalla() {

    // Semestres 1 al 9

    for (let i = 1; i <= 9; i++) {

        dibujarSemestre(

            malla["semestre" + i],

            "semester" + i

        );

    }

    // Semestre 10

    dibujarSemestre(

        malla.semestre10[viaSeleccionada],

        "semester10"

    );

}

//==================================================
// ACTUALIZAR PROGRESO
//==================================================

function actualizarProgreso() {

    let totalRamos = 0;
    let ramosAprobados = 0;

    let creditosTotales = 0;
    let creditosAprobados = 0;

    // Semestres normales

    for (let i = 1; i <= 9; i++) {

        malla["semestre" + i].forEach(ramo => {

            totalRamos++;

            creditosTotales += ramo.creditos;

            if (ramo.aprobado) {

                ramosAprobados++;

                creditosAprobados += ramo.creditos;

            }

        });

    }

    // Sólo la vía seleccionada

    malla.semestre10[viaSeleccionada].forEach(ramo => {

        totalRamos++;

        creditosTotales += ramo.creditos;

        if (ramo.aprobado) {

            ramosAprobados++;

            creditosAprobados += ramo.creditos;

        }

    });

    const porcentaje =

        Math.round(

            (ramosAprobados / totalRamos) * 100

        );

    document.getElementById("progressText").textContent =

        porcentaje + "%";

    document.getElementById("progressFill").style.width =

        porcentaje + "%";

    document.getElementById("creditosAprobados").textContent =

        creditosAprobados;

    document.getElementById("creditosTotales").textContent =

        creditosTotales;

}

//==================================================
// GUARDAR PROGRESO
//==================================================

function guardarProgreso() {

    localStorage.setItem(

        "mallaVeterinariaUSS",

        JSON.stringify(malla)

    );

}

//==================================================
// CARGAR PROGRESO
//==================================================

function cargarProgreso() {

    const datos = localStorage.getItem(

        "mallaVeterinariaUSS"

    );

    if (!datos) return;

    const progreso = JSON.parse(datos);

    //==============================
    // SEMESTRES 1 AL 9
    //==============================

    for (let i = 1; i <= 9; i++) {

        const nombreSemestre =
            "semestre" + i;

        if (!progreso[nombreSemestre]) continue;

        malla[nombreSemestre].forEach(
            (ramo, indice) => {

                if (
                    progreso[nombreSemestre][indice]
                ) {

                    ramo.aprobado =
                        progreso[nombreSemestre][indice].aprobado;

                    ramo.cursando =
                        progreso[nombreSemestre][indice].cursando || false;

                }

            }
        );

    }

    //==============================
    // SEMESTRE 10
    //==============================

    if (progreso.semestre10) {

        [
            "practica",
            "internado",
            "tesina"
        ].forEach(via => {

            if (
                !progreso.semestre10[via]
            ) return;

            malla.semestre10[via].forEach(
                (ramo, indice) => {

                    if (
                        progreso.semestre10[via][indice]
                    ) {

                        ramo.aprobado =
                            progreso.semestre10[via][indice].aprobado;

                        ramo.cursando =
                            progreso.semestre10[via][indice].cursando || false;

                    }

                }
            );

        });

    }

}

//==================================================
// ACTUALIZAR VÍA ACTIVA
//==================================================

document.querySelectorAll(".via").forEach(b => {

    b.classList.remove("active");

    if (
        b.dataset.via ===
        viaSeleccionada
    ) {

        b.classList.add("active");

    }

});

//==================================================
// ACTUALIZAR INTERFAZ
//==================================================

function actualizarInterfaz() {

    guardarProgreso();

    dibujarMalla();

    actualizarProgreso();

    actualizarFlechas();

}

//==================================================
// CREAR MARCADOR DE FLECHA
//==================================================

function crearMarcadorFlecha(){

    const svg =
        document.getElementById("arrowLayer");

    const defs =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );

    const marker =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "marker"
        );

    marker.setAttribute(
        "id",
        "punta"
    );

    marker.setAttribute(
        "viewBox",
        "0 0 10 10"
    );

    marker.setAttribute(
        "refX",
        "9"
    );

    marker.setAttribute(
        "refY",
        "5"
    );

    marker.setAttribute(
        "markerWidth",
        "7"
    );

    marker.setAttribute(
        "markerHeight",
        "7"
    );

    marker.setAttribute(
        "orient",
        "auto"
    );

    const path =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

    path.setAttribute(
        "d",
        "M 1 1 L 9 5 L 1 9"
    );

    path.setAttribute(
        "fill",
        "none"
    );

    path.setAttribute(
        "stroke",
        "#003C71"
    );

    path.setAttribute(
        "stroke-width",
        "2"
    );

    path.setAttribute(
        "stroke-linecap",
        "round"
    );

    marker.appendChild(path);

    defs.appendChild(marker);

    svg.appendChild(defs);

}


//==================================================
// INICIALIZACIÓN
//==================================================

cargarProgreso();

actualizarInterfaz();
//==================================================
// ACTUALIZAR FLECHAS
//==================================================

function actualizarFlechas(){

    const svg =
        document.getElementById("arrowLayer");

    svg.innerHTML = "";

    // actualizarFlechas limpia el SVG en cada renderizado; restauramos la
    // definición de la punta antes de agregar los nuevos trayectos.
    crearMarcadorFlecha();

    if(!ramoExplorado) return;

    const ramo =
        buscarRamo(ramoExplorado);

    if(!ramo) return;

    const botonCentral =
        obtenerBotonRamo(ramo.id);

    if(!botonCentral) return;

    const svgActual =
        document.getElementById("arrowLayer");

    const cajaSvg =
        svgActual.getBoundingClientRect();

    const pasillosUsados = new Set();

    function semestreDeBoton(boton) {

        return Number(
            boton.dataset.semestre.replace("semester", "")
        );

    }

    // Devuelve alturas que están libres de tarjetas en todas las columnas que
    // la flecha necesita atravesar. Así los tramos horizontales van entre los
    // ramos, nunca por encima de ellos.
    function buscarPasillos(semestreOrigen, semestreDestino, referenciaY) {

        const inicio = Math.min(semestreOrigen, semestreDestino) + 1;
        const termino = Math.max(semestreOrigen, semestreDestino) - 1;
        const candidatos = new Set([
            14,
            svgActual.clientHeight - 14,
            referenciaY
        ]);
        const columnas = [];

        for(let semestre = inicio; semestre <= termino; semestre++) {

            const columna =
                document.getElementById("semester" + semestre);

            if(!columna) continue;

            const tarjetas = Array.from(
                columna.querySelectorAll(".subject")
            ).map(tarjeta => {

                const caja = tarjeta.getBoundingClientRect();

                candidatos.add(caja.top - cajaSvg.top - 9);
                candidatos.add(caja.bottom - cajaSvg.top + 9);

                return {
                    arriba: caja.top - cajaSvg.top - 7,
                    abajo: caja.bottom - cajaSvg.top + 7
                };

            });

            columnas.push(tarjetas);

        }

        return [...candidatos]
            .filter(y => y > 8 && y < svgActual.clientHeight - 8)
            .filter(y => columnas.every(tarjetas =>
                tarjetas.every(tarjeta =>
                    y < tarjeta.arriba || y > tarjeta.abajo
                )
            ))
            .sort((a, b) =>
                Math.abs(a - referenciaY) - Math.abs(b - referenciaY)
            );

    }

    function dibujarConexion(origenBoton, destinoBoton) {

        const origen = centroDerecha(origenBoton);
        const destino = centroIzquierda(destinoBoton);
        const referenciaY = (origen.y + destino.y) / 2;
        const opciones = buscarPasillos(
            semestreDeBoton(origenBoton),
            semestreDeBoton(destinoBoton),
            referenciaY
        );

        const pasilloY =
            opciones.find(y => !pasillosUsados.has(Math.round(y)))
            ?? opciones[0]
            ?? referenciaY;

        pasillosUsados.add(Math.round(pasilloY));

        const salidaX = origen.x + 14;
        const entradaX = destino.x - 14;
        const puntaX = destino.x - 23;
        const trayecto = document.createElementNS(
            "http://www.w3.org/2000/svg", "path"
        );

        trayecto.setAttribute(
            "d",
            `M ${origen.x} ${origen.y}
             L ${salidaX} ${origen.y}
             L ${salidaX} ${pasilloY}
             L ${entradaX} ${pasilloY}
             L ${entradaX} ${destino.y}
             L ${puntaX} ${destino.y}`
        );
        trayecto.setAttribute("fill", "none");
        trayecto.setAttribute("stroke", "#003C71");
        trayecto.setAttribute("stroke-width", "3");
        trayecto.setAttribute("stroke-linecap", "round");
        trayecto.setAttribute("stroke-linejoin", "round");
        trayecto.setAttribute("marker-end", "url(#punta)");

        svgActual.appendChild(trayecto);

    }

    function dibujarTrayecto(d, punta = false) {

        const trayecto = document.createElementNS(
            "http://www.w3.org/2000/svg", "path"
        );

        trayecto.setAttribute("d", d);
        trayecto.setAttribute("fill", "none");
        trayecto.setAttribute("stroke", "#003C71");
        trayecto.setAttribute("stroke-width", "3");
        trayecto.setAttribute("stroke-linecap", "round");
        trayecto.setAttribute("stroke-linejoin", "round");

        if(punta) {
            trayecto.setAttribute("marker-end", "url(#punta)");
        }

        svgActual.appendChild(trayecto);

    }

    // Entradas: agrupamos los requisitos que están en un mismo semestre.
    // En vez de muchas líneas atravesando la malla, cada grupo se une en el
    // borde de su columna y viaja por un único pasillo libre hasta el ramo
    // seleccionado. Esto aplica a cualquier ramo con varios requisitos.
    const requisitosPorSemestre = new Map();

    (ramo.requisitos || []).forEach(id => {

        const requisito = buscarRamo(id);
        const botonRequisito = requisito && obtenerBotonRamo(requisito.id);

        if(!botonRequisito) return;

        const semestre = semestreDeBoton(botonRequisito);
        const grupo = requisitosPorSemestre.get(semestre) || [];

        grupo.push(botonRequisito);
        requisitosPorSemestre.set(semestre, grupo);

    });

    const destinoCentral = centroIzquierda(botonCentral);
    // El colector queda separado de la tarjeta; la flecha conserva su punta
    // junto al ramo, pero el último tramo horizontal respira mejor.
    const colectorX = destinoCentral.x - 36;
    const gruposEntrantes = [];

    requisitosPorSemestre.forEach((botones, semestre) => {

        const origenes = botones.map(boton => centroDerecha(boton));
        const referenciaY = (
            origenes.reduce((suma, origen) => suma + origen.y, 0)
            / origenes.length + destinoCentral.y
        ) / 2;
        const opciones = buscarPasillos(
            semestre,
            semestreDeBoton(botonCentral),
            referenciaY
        );
        const pasilloY =
            opciones.find(y => !pasillosUsados.has(Math.round(y)))
            ?? opciones[0]
            ?? referenciaY;

        pasillosUsados.add(Math.round(pasilloY));

        // Este punto queda en el espacio a la derecha de la columna de
        // origen, por lo que las ramas verticales no cubren ninguna tarjeta.
        const espinaX = Math.max(
            ...origenes.map(origen => origen.x)
        ) + 14;

        origenes.forEach(origen => {

            dibujarTrayecto(
                `M ${origen.x} ${origen.y}
                 L ${espinaX} ${origen.y}
                 L ${espinaX} ${pasilloY}`
            );

        });

        gruposEntrantes.push({
            semestre,
            espinaX,
            pasilloY
        });

    });

    // Conectamos los grupos en orden. Por ejemplo, el tronco de semestre II
    // llega primero a la espina de semestre III, se suma a sus ramos y solo
    // entonces continúa hacia el ramo seleccionado.
    gruposEntrantes.sort((a, b) => a.semestre - b.semestre);

    gruposEntrantes.forEach((grupo, indice) => {

        const siguiente = gruposEntrantes[indice + 1];

        if(siguiente) {

            dibujarTrayecto(
                `M ${grupo.espinaX} ${grupo.pasilloY}
                 L ${siguiente.espinaX} ${grupo.pasilloY}
                 L ${siguiente.espinaX} ${siguiente.pasilloY}`
            );

            return;

        }

        dibujarTrayecto(
            `M ${grupo.espinaX} ${grupo.pasilloY}
             L ${colectorX} ${grupo.pasilloY}
             L ${colectorX} ${destinoCentral.y}
             L ${destinoCentral.x - 23} ${destinoCentral.y}`,
            true
        );

    });

    // Salidas: aplicamos el mismo criterio a los ramos que se habilitan. Las
    // conexiones se agrupan por semestre de destino antes de ramificarse a
    // cada ramo, para no repetir líneas largas sobre la malla.
    const salidasPorSemestre = new Map();

    buscarDependientes(ramo.id).forEach(dependiente => {

        const botonDependiente = obtenerBotonRamo(dependiente.id);

        if(!botonDependiente) return;

        const semestre = semestreDeBoton(botonDependiente);
        const grupo = salidasPorSemestre.get(semestre) || [];

        grupo.push(botonDependiente);
        salidasPorSemestre.set(semestre, grupo);

    });

    const gruposSalientes = [];
    const ultimoSemestreSalida = Math.max(
        ...salidasPorSemestre.keys()
    );

    salidasPorSemestre.forEach((botones, semestre) => {

        const destinos = botones.map(boton => centroIzquierda(boton));
        const referenciaY = (
            destinos.reduce((suma, destino) => suma + destino.y, 0)
            / destinos.length + centroDerecha(botonCentral).y
        ) / 2;
        const opciones = buscarPasillos(
            semestreDeBoton(botonCentral),
            ultimoSemestreSalida,
            referenciaY
        );
        const pasilloY =
            opciones.find(y => !pasillosUsados.has(Math.round(y)))
            ?? opciones[0]
            ?? referenciaY;

        pasillosUsados.add(Math.round(pasilloY));

        gruposSalientes.push({
            semestre,
            pasilloY,
            espinaX: Math.min(
                ...destinos.map(destino => destino.x)
            ) - 34,
            destinos
        });

    });

    gruposSalientes.sort((a, b) => a.semestre - b.semestre);

    let salidaActual = {
        x: centroDerecha(botonCentral).x + 14,
        y: centroDerecha(botonCentral).y
    };

    gruposSalientes.forEach(grupo => {

        // El tronco avanza hasta el margen izquierdo de la columna destino.
        dibujarTrayecto(
            `M ${salidaActual.x} ${salidaActual.y}
             L ${grupo.espinaX} ${salidaActual.y}
             L ${grupo.espinaX} ${grupo.pasilloY}`
        );

        // Desde la espina, cada rama entra solo al ramo que habilita.
        grupo.destinos.forEach(destino => {

            dibujarTrayecto(
                `M ${grupo.espinaX} ${grupo.pasilloY}
                 L ${grupo.espinaX} ${destino.y}
                 L ${destino.x - 23} ${destino.y}`,
                true
            );

        });

        salidaActual = {
            x: grupo.espinaX,
            y: grupo.pasilloY
        };

    });

    return;


    //==================================================
    // OBTENER NÚMERO DE SEMESTRE
    //==================================================

    function obtenerNumeroSemestre(id){

        // Semestres 1 al 9

        for(let i = 1; i <= 9; i++){

            const lista =
                malla["semestre" + i];

            if(
                lista.some(
                    r => r.id === id
                )
            ){

                return i;

            }

        }

        // Semestre 10

        for(
            const via of [
                "practica",
                "internado",
                "tesina"
            ]
        ){

            if(
                malla.semestre10[via].some(
                    r => r.id === id
                )
            ){

                return 10;

            }

        }

        return null;

    }


    //==================================================
    // CONECTAR DOS RAMOS
    //==================================================

    function conectarRamos(origen, destino){

        if(!origen || !destino) return;


        const semestreOrigen =
            obtenerNumeroSemestre(
                origen.id
            );

        const semestreDestino =
            obtenerNumeroSemestre(
                destino.id
            );


        if(
            semestreOrigen === null ||
            semestreDestino === null
        ){

            return;

        }


        const botonOrigen =
            obtenerBotonRamo(
                origen.id
            );

        const botonDestino =
            obtenerBotonRamo(
                destino.id
            );


        if(
            !botonOrigen ||
            !botonDestino
        ){

            return;

        }


        //==================================================
        // COORDENADAS
        //==================================================

        const inicio =
            centroDerecha(
                botonOrigen
            );

        const fin =
            centroIzquierda(
                botonDestino
            );


        const svg =
            document.getElementById(
                "arrowLayer"
            );


        //==================================================
        // MISMO SEMESTRE
        //==================================================

        if(
            semestreDestino === semestreOrigen
        ){

            dibujarLinea(
                inicio.x,
                inicio.y,
                fin.x,
                fin.y
            );

            return;

        }


        //==================================================
        // SEMESTRE SIGUIENTE
        //==================================================

        if(
            semestreDestino === semestreOrigen + 1
        ){

            dibujarLinea(
                inicio.x,
                inicio.y,
                fin.x,
                fin.y
            );

            return;

        }


        //==================================================
// BUSCAR PASILLO ENTRE RAMOS
//==================================================

function buscarPasilloEntreRamos(columna){

    const ramos =
        Array.from(
            columna.querySelectorAll(
                ".subject-container"
            )
        );

    if(ramos.length < 2){
        return null;
    }

    const posiciones =
        ramos
            .map(ramo => {

                const r =
                    ramo.getBoundingClientRect();

                return {
                    top: r.top,
                    bottom: r.bottom
                };

            })
            .sort(
                (a,b) =>
                    a.top - b.top
            );


    // Buscar espacios entre tarjetas

    const espacios = [];

    for(
        let i = 0;
        i < posiciones.length - 1;
        i++
    ){

        const espacio =
            posiciones[i + 1].top -
            posiciones[i].bottom;

        if(espacio > 4){

            espacios.push({
                y:
                    (
                        posiciones[i].bottom +
                        posiciones[i + 1].top
                    ) / 2,

                tamaño:
                    espacio
            });

        }

    }

    if(espacios.length === 0){
        return null;
    }


    // Elegir el espacio más grande

    espacios.sort(
        (a,b) =>
            b.tamaño - a.tamaño
    );

    return espacios[0].y;
}

        //==================================================
        // CONEXIONES HACIA ADELANTE
        //==================================================

if(
    semestreDestino > semestreOrigen
){

    const columnaOrigen =
        document.getElementById(
            "semester" +
            semestreOrigen
        );

    const columnaDestino =
        document.getElementById(
            "semester" +
            semestreDestino
        );

    if(
        !columnaOrigen ||
        !columnaDestino
    ){

        return;

    }

    const svg =
        document.getElementById(
            "arrowLayer"
        );

    const rSvg =
        svg.getBoundingClientRect();

    const rOrigen =
        columnaOrigen.getBoundingClientRect();

    const rDestino =
        columnaDestino.getBoundingClientRect();


    //==================================================
    // SALIDA
    //==================================================

    const espacioInicio =
        rOrigen.right -
        rSvg.left +
        15;


    //==================================================
    // ENTRADA
    //==================================================

    const espacioFinal =
        rDestino.left -
        rSvg.left -
        15;


    const y1 =
        inicio.y;

    const y2 =
        fin.y;


    //==================================================
    // SI SOLO AVANZA UN SEMESTRE
    //==================================================

    if(
        semestreDestino === semestreOrigen + 1
    ){

        dibujarLinea(
            inicio.x,
            inicio.y,
            fin.x,
            fin.y
        );

        return;

    }

    //==================================================
// SALTA UNO O MÁS SEMESTRES
//==================================================

//--------------------------------------------------
// BUSCAR ESPACIOS ENTRE LOS RAMOS
//--------------------------------------------------

const semestresAtravesados = [];

for(
    let i = semestreOrigen + 1;
    i < semestreDestino;
    i++
){

    const columna =
        document.getElementById(
            "semester" + i
        );

    if(!columna) continue;

    const ramosColumna =
        Array.from(
            columna.querySelectorAll(
                ".subject-container"
            )
        );


    // Ordenar de arriba hacia abajo
    ramosColumna.sort(
        (a,b) =>
            a.getBoundingClientRect().top -
            b.getBoundingClientRect().top
    );


    const espacios = [];


    //==================================================
    // ESPACIO ENTRE RAMOS
    //==================================================

    for(
        let j = 0;
        j < ramosColumna.length - 1;
        j++
    ){

        const actual =
            ramosColumna[j]
                .getBoundingClientRect();

        const siguiente =
            ramosColumna[j + 1]
                .getBoundingClientRect();


        const abajoActual =
            actual.bottom -
            rSvg.top;

        const arribaSiguiente =
            siguiente.top -
            rSvg.top;


        if(
            arribaSiguiente >
            abajoActual
        ){

            espacios.push({

                arriba:
                    abajoActual,

                abajo:
                    arribaSiguiente

            });

        }

    }


    semestresAtravesados.push(
        espacios
    );

}


//==================================================
// BUSCAR UN ESPACIO COMÚN
//==================================================

let pasilloY = null;


if(
    semestresAtravesados.length > 0
){

    let candidatos =
        semestresAtravesados[0];


    for(
        let i = 1;
        i < semestresAtravesados.length;
        i++
    ){

        const espaciosActuales =
            semestresAtravesados[i];

        const nuevosCandidatos = [];


        candidatos.forEach(
            espacioA => {

                espaciosActuales.forEach(
                    espacioB => {

                        const arriba =
                            Math.max(
                                espacioA.arriba,
                                espacioB.arriba
                            );

                        const abajo =
                            Math.min(
                                espacioA.abajo,
                                espacioB.abajo
                            );


                        if(
                            abajo >= arriba
                        ){

                            nuevosCandidatos.push({

                                arriba:
                                    arriba,

                                abajo:
                                    abajo

                            });

                        }

                    }
                );

            }
        );


        candidatos =
            nuevosCandidatos;

    }


    //==================================================
    // ELEGIR EL PASILLO MÁS CERCANO AL CENTRO
    //==================================================

    if(
        candidatos.length > 0
    ){

        const referencia =
            (
                y1 +
                y2
            ) / 2;


        candidatos.sort(
            (a,b) => {

                const centroA =
                    (
                        a.arriba +
                        a.abajo
                    ) / 2;

                const centroB =
                    (
                        b.arriba +
                        b.abajo
                    ) / 2;


                return (
                    Math.abs(
                        centroA -
                        referencia
                    )
                    -
                    Math.abs(
                        centroB -
                        referencia
                    )
                );

            }
        );


        const mejor =
            candidatos[0];


        pasilloY =
            (
                mejor.arriba +
                mejor.abajo
            ) / 2;

    }

}


//==================================================
// SI NO HAY UN ESPACIO COMÚN
//==================================================

if(
    pasilloY === null
){

    // Último recurso:
    // usar el espacio entre los ramos
    // del primer semestre atravesado.

    const primerSemestre =
        semestresAtravesados[0];

    if(
        primerSemestre &&
        primerSemestre.length > 0
    ){

        const referencia =
            (
                y1 +
                y2
            ) / 2;

        primerSemestre.sort(
            (a,b) => {

                const centroA =
                    (
                        a.arriba +
                        a.abajo
                    ) / 2;

                const centroB =
                    (
                        b.arriba +
                        b.abajo
                    ) / 2;

                return (
                    Math.abs(
                        centroA -
                        referencia
                    )
                    -
                    Math.abs(
                        centroB -
                        referencia
                    )
                );

            }
        );

        const mejor =
            primerSemestre[0];

        pasilloY =
            (
                mejor.arriba +
                mejor.abajo
            ) / 2;

    }
    else{

        pasilloY =
            (
                y1 +
                y2
            ) / 2;

    }

}


    //==================================================
    // CREAR RUTA
    //==================================================


const path =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );


let d =
    `M ${inicio.x} ${y1}`;


//==================================================
// 1. SALIR HORIZONTALMENTE
//==================================================

d +=
    ` L ${espacioInicio} ${y1}`;


//==================================================
// 2. IR AL PASILLO ENTRE LOS RAMOS
//==================================================

d +=
    ` L ${espacioInicio} ${pasilloY}`;


//==================================================
// 3. CRUZAR POR EL PASILLO
//==================================================

d +=
    ` L ${espacioFinal} ${pasilloY}`;


//==================================================
// 4. SUBIR HASTA EL RAMO DESTINO
//==================================================

d +=
    ` L ${espacioFinal} ${y2}`;


//==================================================
// 5. ENTRAR AL RAMO
//==================================================

d +=
    ` L ${fin.x} ${y2}`;


//==================================================
// ESTILO
//==================================================

path.setAttribute(
    "d",
    d
);

path.setAttribute(
    "fill",
    "none"
);

path.setAttribute(
    "stroke",
    "#003C71"
);

path.setAttribute(
    "stroke-width",
    "3"
);

path.setAttribute(
    "stroke-linejoin",
    "round"
);

path.setAttribute(
    "stroke-linecap",
    "round"
);

svg.appendChild(
    path
);


    //==================================================
    // PUNTA DE FLECHA
    //==================================================

    const largo = 8;

    const punta =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    punta.setAttribute(
        "d",
        `
        M ${fin.x - largo}
          ${fin.y - largo / 2}

        L ${fin.x}
          ${fin.y}

        L ${fin.x - largo}
          ${fin.y + largo / 2}
        `
    );


    punta.setAttribute(
        "stroke",
        "#003C71"
    );

    punta.setAttribute(
        "stroke-width",
        "3"
    );

    punta.setAttribute(
        "fill",
        "none"
    );

    punta.setAttribute(
        "stroke-linejoin",
        "round"
    );

    punta.setAttribute(
        "stroke-linecap",
        "round"
    );


    svg.appendChild(
        punta
    );

    return;

}


        //==================================================
        // CONEXIÓN HACIA ATRÁS
        //==================================================

        dibujarLinea(
            inicio.x,
            inicio.y,
            fin.x,
            fin.y
        );

    }


    //==================================================
    // PRERREQUISITOS
    //==================================================

if(
    ramo.requisitos &&
    ramo.requisitos.length > 0
){

    //==================================================
    // UN SOLO PRERREQUISITO
    //==================================================

    if(ramo.requisitos.length === 1){

        const requisito =
            buscarRamo(
                ramo.requisitos[0]
            );

        if(requisito){

            conectarRamos(
                requisito,
                ramo
            );

        }

    }

    //==================================================
// VARIOS PRERREQUISITOS
//==================================================

else{

    const requisitos =
        ramo.requisitos
            .map(id => buscarRamo(id))
            .filter(r => r);

    const botonDestino =
        obtenerBotonRamo(ramo.id);

    if(
        requisitos.length > 1 &&
        botonDestino
    ){

        const svg =
            document.getElementById(
                "arrowLayer"
            );

        const rSvg =
            svg.getBoundingClientRect();

        const fin =
            centroIzquierda(
                botonDestino
            );

        //==================================================
        // SEMESTRE DEL DESTINO
        //==================================================

        const semestreDestino =
            obtenerNumeroSemestre(
                ramo.id
            );

        //==================================================
        // POSICIÓN DEL PASILLO VERTICAL
        //==================================================

        const columnaDestino =
            document.getElementById(
                "semester" +
                semestreDestino
            );

        if(!columnaDestino) return;

        const rDestino =
            columnaDestino.getBoundingClientRect();

        const pasilloX =
            rDestino.left -
            rSvg.left -
            25;


        //==================================================
        // BUSCAR LAS POSICIONES DE LOS PRERREQUISITOS
        //==================================================

        const posiciones = [];

        requisitos.forEach(
            requisito => {

                const botonOrigen =
                    obtenerBotonRamo(
                        requisito.id
                    );

                if(!botonOrigen) return;

                const inicio =
                    centroDerecha(
                        botonOrigen
                    );

                posiciones.push({

                    x: inicio.x,

                    y: inicio.y,

                    semestre:
                        obtenerNumeroSemestre(
                            requisito.id
                        )

                });

            }
        );

        if(posiciones.length === 0) return;


        //==================================================
        // BUSCAR HASTA DÓNDE BAJAR
        //==================================================

       //==================================================
// BUSCAR UN PASILLO ENTRE LOS RAMOS
//==================================================

const semestreMinimo =
    Math.min(
        ...posiciones.map(
            p => p.semestre
        )
    );

const semestresAtravesados = [];

for(
    let i = semestreMinimo + 1;
    i < semestreDestino;
    i++
){

    const columna =
        document.getElementById(
            "semester" + i
        );

    if(!columna) continue;

    const ramosColumna =
        Array.from(
            columna.querySelectorAll(
                ".subject-container"
            )
        );

    const espacios = [];

    // ------------------------------------------
    // ORDENAR RAMOS DE ARRIBA HACIA ABAJO
    // ------------------------------------------

    ramosColumna.sort(
        (a,b) =>
            a.getBoundingClientRect().top -
            b.getBoundingClientRect().top
    );


    // ------------------------------------------
    // ESPACIO ANTES DEL PRIMER RAMO
    // ------------------------------------------

    if(ramosColumna.length > 0){

        const primero =
            ramosColumna[0]
                .getBoundingClientRect();

        espacios.push({

            arriba:
                primero.top -
                rSvg.top,

            abajo:
                primero.top -
                rSvg.top

        });

    }


    // ------------------------------------------
    // ESPACIOS ENTRE RAMOS
    // ------------------------------------------

    for(
        let j = 0;
        j < ramosColumna.length - 1;
        j++
    ){

        const actual =
            ramosColumna[j]
                .getBoundingClientRect();

        const siguiente =
            ramosColumna[j + 1]
                .getBoundingClientRect();

        const abajoActual =
            actual.bottom -
            rSvg.top;

        const arribaSiguiente =
            siguiente.top -
            rSvg.top;

        if(
            arribaSiguiente >
            abajoActual
        ){

            espacios.push({

                arriba:
                    abajoActual,

                abajo:
                    arribaSiguiente

            });

        }

    }


    // ------------------------------------------
    // ESPACIO DESPUÉS DEL ÚLTIMO RAMO
    // ------------------------------------------

    if(ramosColumna.length > 0){

        const ultimo =
            ramosColumna[
                ramosColumna.length - 1
            ].getBoundingClientRect();

        espacios.push({

            arriba:
                ultimo.bottom -
                rSvg.top,

            abajo:
                ultimo.bottom -
                rSvg.top

        });

    }


    semestresAtravesados.push(
        espacios
    );

}


//==================================================
// ENCONTRAR UN ESPACIO COMÚN
//==================================================

let pasilloY = null;


// Si no hay semestres intermedios,
// no necesitamos buscar pasillo.
if(
    semestresAtravesados.length > 0
){

    let candidatos =
        semestresAtravesados[0];


    // ------------------------------------------
    // INTERSECCIÓN DE LOS ESPACIOS
    // ------------------------------------------

    for(
        let i = 1;
        i < semestresAtravesados.length;
        i++
    ){

        const espaciosActuales =
            semestresAtravesados[i];

        const nuevosCandidatos = [];


        candidatos.forEach(
            espacioA => {

                espaciosActuales.forEach(
                    espacioB => {

                        const arriba =
                            Math.max(
                                espacioA.arriba,
                                espacioB.arriba
                            );

                        const abajo =
                            Math.min(
                                espacioA.abajo,
                                espacioB.abajo
                            );

                        if(
                            abajo >= arriba
                        ){

                            nuevosCandidatos.push({

                                arriba:
                                    arriba,

                                abajo:
                                    abajo

                            });

                        }

                    }
                );

            }
        );


        candidatos =
            nuevosCandidatos;

    }


    // ------------------------------------------
    // ELEGIR EL MEJOR PASILLO
    // ------------------------------------------

    if(candidatos.length > 0){

        const referencia =
            (
                posiciones.reduce(
                    (s,p) => s + p.y,
                    0
                )
                +
                fin.y
            )
            /
            (
                posiciones.length + 1
            );


        candidatos.sort(
            (a,b) => {

                const centroA =
                    (
                        a.arriba +
                        a.abajo
                    ) / 2;

                const centroB =
                    (
                        b.arriba +
                        b.abajo
                    ) / 2;

                return (
                    Math.abs(
                        centroA -
                        referencia
                    )
                    -
                    Math.abs(
                        centroB -
                        referencia
                    )
                );

            }
        );


        const mejor =
            candidatos[0];


        // Dejamos 2 px de margen
        // dentro del espacio disponible.

        pasilloY =
            (
                mejor.arriba +
                mejor.abajo
            ) / 2;

    }

}


//==================================================
// SI NO EXISTE UN HUECO COMÚN
//==================================================

if(pasilloY === null){

    const referencia =
        (
            posiciones.reduce(
                (s,p) => s + p.y,
                0
            )
            +
            fin.y
        )
        /
        (
            posiciones.length + 1
        );


    let mejorEspacio =
        null;


    let mejorPuntaje =
        Infinity;


    semestresAtravesados.forEach(
        espacios => {

            espacios.forEach(
                espacio => {

                    const centro =
                        (
                            espacio.arriba +
                            espacio.abajo
                        ) / 2;


                    const altura =
                        espacio.abajo -
                        espacio.arriba;


                    // Preferimos espacios
                    // suficientemente amplios.

                    if(
                        altura < 8
                    ){

                        return;

                    }


                    const distancia =
                        Math.abs(
                            centro -
                            referencia
                        );


                    // Penalizamos espacios
                    // demasiado pequeños.

                    const puntaje =
                        distancia -
                        Math.min(
                            altura,
                            40
                        ) * 0.25;


                    if(
                        puntaje <
                        mejorPuntaje
                    ){

                        mejorPuntaje =
                            puntaje;

                        mejorEspacio =
                            espacio;

                    }

                }
            );

        }
    );


    if(mejorEspacio){

        pasilloY =
            (
                mejorEspacio.arriba +
                mejorEspacio.abajo
            ) / 2;

    }

}


        //==================================================
        // DIBUJAR CADA PRERREQUISITO
        //==================================================

        posiciones.forEach(
            posicion => {

                const columnaOrigen =
                    document.getElementById(
                        "semester" +
                        posicion.semestre
                    );

                if(!columnaOrigen) return;

                const rOrigen =
                    columnaOrigen.getBoundingClientRect();

                const salidaX =
                    rOrigen.right -
                    rSvg.left +
                    15;


                const path =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );


                path.setAttribute(
                    "d",
                    `
                    M ${posicion.x}
                      ${posicion.y}

                    L ${salidaX}
                      ${posicion.y}

                    L ${salidaX}
                      ${pasilloY}

                    L ${pasilloX}
                      ${pasilloY}
                    `
                );


                path.setAttribute(
                    "fill",
                    "none"
                );

                path.setAttribute(
                    "stroke",
                    "#003C71"
                );

                path.setAttribute(
                    "stroke-width",
                    "3"
                );

                path.setAttribute(
                    "stroke-linecap",
                    "round"
                );

                path.setAttribute(
                    "stroke-linejoin",
                    "round"
                );

                svg.appendChild(
                    path
                );

            }
        );


        //==================================================
        // TRONCO VERTICAL
        //==================================================

        const ys =
            posiciones.map(
                p => p.y
            );

        ys.push(fin.y);


        const yMin =
            Math.min(...ys);

        const tronco =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );


        tronco.setAttribute(
            "d",
            `
            M ${pasilloX}
              ${pasilloY}

            L ${pasilloX}
              ${fin.y}
            `
        );


        tronco.setAttribute(
            "fill",
            "none"
        );

        tronco.setAttribute(
            "stroke",
            "#003C71"
        );

        tronco.setAttribute(
            "stroke-width",
            "3"
        );

        tronco.setAttribute(
            "stroke-linecap",
            "round"
        );

        svg.appendChild(
            tronco
        );

        //==================================================
// CONEXIÓN FINAL AL RAMO
//==================================================

// Punto donde termina el tronco vertical
const entradaX =
    fin.x - 15;


//--------------------------------------------------
// TRAMO HORIZONTAL DESDE EL TRONCO
//--------------------------------------------------

const finalPath =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

finalPath.setAttribute(
    "d",
    `
    M ${pasilloX}
      ${fin.y}

    L ${entradaX}
      ${fin.y}

    L ${fin.x}
      ${fin.y}
    `
);

finalPath.setAttribute(
    "fill",
    "none"
);

finalPath.setAttribute(
    "stroke",
    "#003C71"
);

finalPath.setAttribute(
    "stroke-width",
    "3"
);

finalPath.setAttribute(
    "stroke-linecap",
    "round"
);

finalPath.setAttribute(
    "stroke-linejoin",
    "round"
);

svg.appendChild(
    finalPath
);


        //==================================================
        // PUNTA DE FLECHA
        //==================================================

        const largo = 8;

        const punta =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );


        punta.setAttribute(
            "d",
            `
            M ${fin.x - largo}
              ${fin.y - largo / 2}

            L ${fin.x}
              ${fin.y}

            L ${fin.x - largo}
              ${fin.y + largo / 2}
            `
        );


        punta.setAttribute(
            "stroke",
            "#003C71"
        );

        punta.setAttribute(
            "stroke-width",
            "3"
        );

        punta.setAttribute(
            "fill",
            "none"
        );

        punta.setAttribute(
            "stroke-linejoin",
            "round"
        );

        punta.setAttribute(
            "stroke-linecap",
            "round"
        );

        svg.appendChild(
            punta
        );

    }

}

}

    //==================================================
    // DEPENDIENTES
    //==================================================

    const dependientes =
        buscarDependientes(
            ramo.id
        );


    dependientes.forEach(
        dependiente => {

            conectarRamos(
                ramo,
                dependiente
            );

        }
    );

}
//==================================================
// CREAR MARCADOR DE FLECHA
//==================================================

function crearMarcadorFlecha(){

    const svg =
        document.getElementById("arrowLayer");

    if(!svg) return;


    //==================================================
    // DEFINICIÓN
    //==================================================

    const defs =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );


    //==================================================
    // MARCADOR
    //==================================================

    const marker =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "marker"
        );

    marker.setAttribute(
        "id",
        "punta"
    );

    marker.setAttribute(
        "viewBox",
        "0 0 10 10"
    );

    marker.setAttribute(
        "refX",
        "0"
    );

    marker.setAttribute(
        "refY",
        "5"
    );

    marker.setAttribute(
        "markerWidth",
        "7"
    );

    marker.setAttribute(
        "markerHeight",
        "7"
    );

    marker.setAttribute(
        "orient",
        "auto"
    );


    //==================================================
    // FORMA DE LA PUNTA
    //==================================================

    const path =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

    path.setAttribute(
        "d",
        "M 0 0 L 10 5 L 0 10 z"
    );

    path.setAttribute(
        "fill",
        "#003C71"
    );


    marker.appendChild(path);

    defs.appendChild(marker);

    svg.appendChild(defs);

}
//==================================================
// CAMBIAR VÍA DE TITULACIÓN
//==================================================

const botonesVia =
    document.querySelectorAll(".via");

botonesVia.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesVia.forEach(b =>
            b.classList.remove("active")
        );

        boton.classList.add("active");

        viaSeleccionada =
            boton.dataset.via;

        localStorage.setItem(
            "viaSeleccionada",
            viaSeleccionada
        );

        actualizarInterfaz();

    });

});

//==================================================
// CARGAR PROGRESO
//==================================================

cargarProgreso();


//==================================================
// CREAR MARCADOR
//==================================================

crearMarcadorFlecha();


//==================================================
// ACTUALIZAR INTERFAZ
//==================================================

actualizarInterfaz();

//==================================================
// MANTENER FLECHAS ALINEADAS DURANTE EL SCROLL
//==================================================

window.addEventListener(
    "scroll",
    () => {

        if (ramoExplorado) {

            actualizarFlechas();

        }

    },
    true
);
