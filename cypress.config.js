const { defineConfig } = require("cypress");
const mysql = require("mysql2/promise");

module.exports = defineConfig({
    e2e: {

        viewportWidth: 1280,
        viewportHeight: 720,

        setupNodeEvents(on, config) {

            on("task", {

                async queryDb(query) {

                    const connection = await mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        password: "root",
                        database: "tienda_pruebas"
                    });

                    const [rows] = await connection.execute(query);

                    await connection.end();

                    return rows;
                }

            });

        }

    }
});