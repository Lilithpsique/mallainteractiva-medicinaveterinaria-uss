//==================================================
// MALLA CURRICULAR
// Medicina Veterinaria USS
//==================================================

const malla = {

    semestre1: [

        {
            id: "MEVEAA01",
            nombre: "Introducción a la Medicina Veterinaria",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 5
        },

        {
            id: "DBIO1084",
            nombre: "Biología Celular",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 5
        },

        {
            id: "FORI0001",
            nombre: "Antropología",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 3
        },

        {
            id: "MEVEAA02",
            nombre: "Conservación de la Vida Silvestre",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 5
        },

        {
            id: "MEVEAA03",
            nombre: "Zoología Veterinaria",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 5
        },

        {
            id: "DQUI1050",
            nombre: "Química General y Orgánica",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 7
        }

    ],

    semestre2: [

        {
            id: "MEVEBA01",
            nombre: "Embrio-Histología Veterinaria",
            aprobado: false,
            cursando: false,
            requisitos: ["DBIO1084"],
            creditos: 6
        },

        {
            id: "MEVEBA02",
            nombre: "Bioquímica Veterinaria",
            aprobado: false,
            cursando: false,
            requisitos: ["DQUI1050", "DBIO1084"],
            creditos: 5
        },

        {
            id: "FORI0002",
            nombre: "Ética",
            aprobado: false,
            cursando: false,
            requisitos: ["FORI0001"],
            creditos: 3
        },

        {
            id: "MEVEBA03",
            nombre: "Anatomía Veterinaria General",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 5
        },

        {
            id: "DCEX0027",
            nombre: "Física Médica",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 7
        },

        {
            id: "MEVEBB01",
            nombre: "Una Salud",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 4
        }

    ],

   semestre3: [

    {
        id: "MEVECA01",
        nombre: "Inmunología Veterinaria",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 5
    },

    {
        id: "MEVECA02",
        nombre: "Fisiología Veterinaria",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEBA02"],
        creditos: 6
    },

    {
        id: "MEVECA03",
        nombre: "Microbiología y Virología",
        aprobado: false,
        cursando: false,
        requisitos: ["DBIO1084"],
        creditos: 6
    },

    {
        id: "MEVECA04",
        nombre: "Reproducción y Mejoramiento Genético",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEBA02", "MEVEBA03"],
        creditos: 5
    },

    {
        id: "MEVECA05",
        nombre: "Anatomía Veterinaria Comparada",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEBA03"],
        creditos: 4
    },

    {
        id: "ELECGDEE01",
        nombre: "Gestión Personal y Habilidades para la Vida",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 4
    }

    ],
    semestre4: [
       
    {
        id: "MEVEDB01",
        nombre: "Fisiopatología Veterinaria",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVECA02"],
        creditos: 4
    }, 
    
    {
        id: "MEVEDA02",
        nombre: "Enfermedades infecciosas",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVECA03"],
        creditos: 4
    },
    
    {
        id: "MEVEDA03",
        nombre: "Enfermedades Parasitarias",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 5
    },

    {
        id: "MEVEDA04",
        nombre: "Gineco-Obstetricia y Andrología Veterinaria",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVECA04"],
        creditos: 6
    },
    
    {
        id: "MEVEDB02",
        nombre: "Ecología y Evolución Animal",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 7
    },
    
    {
        id: "MEVEDA05",
        nombre: "Hito Evaluativo Integrativo",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEBA01", "MEVEBA02", "FORI0002", "MEVEBA03", "DCEX0027", "MEVEBB01", "MEVECA01", "MEVECA02", "MEVECA03", "MEVECA04", "MEVECA05", "ELECGDEE01"],
        creditos: 4
    },

    ],

    semestre5: [
      {
        id: "MEVEEB01",
        nombre: "Patología General",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEDB01"],
        creditos: 6
    },  

    {
        id: "MEVEEB02",
        nombre: "Farmacología Veterinaria",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEDB01"],
        creditos: 7
    },

    {
        id: "MEVEEA03",
        nombre: "Nutrición y Aliemantación Animal",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 5
    },

    {
        id: "MEVEEB03",
        nombre: "Metodología de la Investigación y Estadística",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 5
    },

    {
        id: "MEVEEB04",
        nombre: "Emprendimiento y Formación en Negocios",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 4
    },

    {
        id: "FORI0003",
        nombre: "Persona y Sociedad",
        aprobado: false,
        cursando: false,
        requisitos: ["FORI0002"],
        creditos: 3
    },
    ],

    semestre6: [
        {
        id: "MEVEFA01",
        nombre: "Patología Especial de Sistemas",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEEB01"],
        creditos: 6
    },

    {
        id: "MEVEFB01",
        nombre: "Exploración Clínica",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 7
    },

    {
        id: "MEVEFA04",
        nombre: "Práctica Inicial",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEDB01", "MEVEDA02", "MEVEDA03", "MEVEDA04", "MEVEDB02", "MEVEDA05", "MEVEEB01", "MEVEEB02", "MEVEEA03", "MEVEEB03", "MEVEEB04", "FORI0003"],
        creditos: 4
    },

    {
        id: "MEVEFA03",
        nombre: "Bienestar Animal",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 4
    },

    {
        id: "MEVEFB02",
        nombre: "Patología Clínica",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEDB01"],
        creditos: 6
    },

    {
        id: "ELECFORI01",
        nombre: "Electivo I: Formación Integral",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 3
    },
    ],

    semestre7: [
        {
        id: "MEVEGA01",
        nombre: "Ganadería de Rumiantes",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEEA03"],
        creditos: 5
    },

    {
        id: "MEVEGA02",
        nombre: "Producción de Monogástricos",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEEA03"],
        creditos: 5
    },

    {
        id: "MEVEGB01",
        nombre: "Acuicultura",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEEA03"],
        creditos: 5
    },

    {
        id: "MEVEGA04",
        nombre: "Cirugía General",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEFA01"],
        creditos: 5
    },

    {
        id: "MEVEGB02",
        nombre: "Medicina Interna",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEFB01"],
        creditos: 7
    },

    {
        id: "ELECFORI02",
        nombre: "Electivo II: Formación Integral",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 3
    },
    ],

    semestre8: [

    {
        id: "MEVEHB01",
        nombre: "Diagnóstico por Imágenes",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEFB01"],
        creditos: 8
    },

    {
        id: "MEVEHA02",
        nombre: "Fundamentos de la Ciencia de Datos",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 4
    },

    {
        id: "MEVEHB02",
        nombre: "Cirugía Especial",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEGA04"],
        creditos: 5
    },

    {
        id: "MEVEHB03",
        nombre: "Salud Pública y Epidemiología",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 5
    },

    {
        id: "MEVEHA05",
        nombre: "Práctica Intermedia",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEFA04"],
        creditos: 4
    },

    {
        id: "MEVEHA06",
        nombre: "Hito Evaluativo Integrativo Interprofesional",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEFA01", "MEVEFB01", "MEVEFA03", "MEVEFA04", "MEVEFB02", "ELECFORI01", "MEVEGA01", "MEVEGA02", "MEVEGB01", "MEVEGA04", "MEVEGB02", "ELECFORI02"],
        creditos: 4
    }

    ],

    semestre9: [

    {
        id: "MEVEIA01",
        nombre: "Clínica de Animales Mayores",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEGB02"],
        creditos: 4
    },

    {
        id: "MEVEIA02",
        nombre: "Clínica de Animales Menores",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEGB02"],
        creditos: 5
    },

    {
        id: "MEVEIA03",
        nombre: "Inocuidad de los Alimentos",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEHB03"],
        creditos: 3
    },

    {
        id: "MEVEIA04",
        nombre: "Clínica de Animales Silvestres y Exóticos",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEGB02"],
        creditos: 5
    },

    {
        id: "ELECFORI03",
        nombre: "Electivo III: Formación Integral",
        aprobado: false,
        cursando: false,
        requisitos: [],
        creditos: 3
    },

    {
        id: "MEVEIB01",
        nombre: "Internado Integrador",
        aprobado: false,
        cursando: false,
        requisitos: ["MEVEGB02"],
        creditos: 10
    }

],

    semestre10: {

    practica: [

        {
            id: "MEVEJB01",
            nombre: "Actividad Integradora de Titulación: Práctica Avanzada",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 16
        },

        {
            id: "ELECDGEE03",
            nombre: "Gestión de Carrera y Desarrollo Profesional",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 4
        },

        {
            id: "MEVEELECMEVE01",
            nombre: "Electivo I",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        },

        {
            id: "ELECMEVE02",
            nombre: "Electivo II",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        }

    ],

    internado: [

        {
            id: "MEVEJB02",
            nombre: "Actividad Integradora de Titulación: Internado Clínico",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 16
        },

        {
            id: "ELECDGEE03",
            nombre: "Gestión de Carrera y Desarrollo Profesional",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 4
        },

        {
            id: "MEVEELECMEVE01",
            nombre: "Electivo I",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        },

        {
            id: "ELECMEVE02",
            nombre: "Electivo II",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        }

    ],

    tesina: [

        {
            id: "MEVEJB03",
            nombre: "Actividad Integradora de Titulación: Tesina",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 16
        },

        {
            id: "ELECDGEE03",
            nombre: "Gestión de Carrera y Desarrollo Profesional",
            aprobado: false,
            cursando: false,
            requisitos: [],
            creditos: 4
        },

        {
            id: "MEVEELECMEVE01",
            nombre: "Electivo I",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        },

        {
            id: "ELECMEVE02",
            nombre: "Electivo II",
            aprobado: false,
            cursando: false,
            requisitos: ["MEVEIA01", "MEVEIA02", "MEVEIA03", "MEVEIA04", "ELECFORI03", "MEVEIB01"],
            creditos: 5
        }

    ]

}

};