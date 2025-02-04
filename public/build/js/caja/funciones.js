
import { h1EfectivoCaja } from "./selectores.js";
function imprimirActualCaja(caja) {
    const { cantidad_caja } = caja;

    h1EfectivoCaja.innerHTML = `$ ${cantidad_caja}`;
}
export {
    imprimirActualCaja
}