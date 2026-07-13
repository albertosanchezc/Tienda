describe('Pruebas de la caja sin post', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/caja')
    })

    context("Probar las modales y sus inputs", () => {
        describe("Si se presiona cualquier botón", () => {
            it("Abrir Modal Añadir", () => {
                cy.get(".añadircaja").click()
                cy.getByData('inputAniadir').type('200')
                cy.screenshot('Escribrir 200 en la modal de añadir', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it("Abrir Modal Añadir", () => {
                cy.get(".quitarcaja").click()
                cy.getByData('inputRetirar').type('2000')
                cy.screenshot('Escribrir 2000 en la modal de retirar', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

        })
    })


    context("Probar los filtros", () => {
        describe("Debe filtrar por fechas", () => {
            it('Filtrar por fecha inicial', () => {
                cy.getByData('inputFechaInicial').type('2025-02-05')
                cy.getByData('inputFechaFinal').click()
                cy.screenshot('Desde el 5 feb', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })

            })

            it('Filtrar por fecha final', () => {
                cy.getByData('inputFechaFinal').type('2025-02-03')
                cy.getByData('inputFechaInicial').click()
                cy.screenshot('Hasta el 3 feb', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar entre 2 fechas erroneamente', () => {
                cy.getByData('inputFechaInicial').type('2025-02-05')
                cy.getByData('inputFechaFinal').type('2025-02-03')
                cy.getByData('inputFechaInicial').click()
                cy.screenshot('De 5 al 3 feb', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar entre 2 fechas correctamente', () => {
                cy.getByData('inputFechaInicial').type('2025-02-04')
                cy.getByData('inputFechaFinal').type('2025-02-05')
                cy.getByData('inputFechaInicial').click()
                cy.screenshot('del 4 al 5 feb', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar por abonos', () => {
                cy.getByData('radioAbono').click()
                cy.screenshot('Solo Abonos', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar por retiros', () => {
                cy.getByData('radioRetiro').click()
                cy.screenshot('Solo Retiros', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })


            it('Filtrar por Recientes', () => {
                cy.getByData('radioAscendente').click()
                cy.screenshot('Recientes', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar por Antiguos', () => {
                cy.getByData('radioDescendente').click()
                cy.screenshot('Antiguos', {
                    capture: 'viewport',            // Define qué parte capturar
                    disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                    scale: true,                     // Escala la imagen en pantallas con alta resolución
                    timout: 500,                     // Espera hasta 5 segundos antes de 
                    overwrite: true
                    // capturar
                })
            })

            it('Filtrar completo', () => {
                describe('Filtrar por abonos recientes', () => {
                    cy.getByData('inputFechaInicial').type('2025-02-04')
                    cy.getByData('inputFechaFinal').type('2025-02-05')
                    cy.getByData('radioAbono').click()
                    cy.getByData('radioAscendente').click()
                    cy.screenshot('Comlpeta recientes abono', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 500,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })

                describe('Filtrar por abonos Antiguos', () => {
                    cy.getByData('inputFechaInicial').type('2025-02-04')
                    cy.getByData('inputFechaFinal').type('2025-02-05')
                    cy.getByData('radioRetiro').click()
                    cy.getByData('radioDescendente').click()
                    cy.screenshot('Completa antiguo retiros', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 500,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })

            })
            

            
        })
    })

})