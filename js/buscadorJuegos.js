import { arregloJuegos, CargaArreglo, arregloPlataformas,arregloActual } from "./juegosCargaDatos";

 let checkeados = [];
 let noEliminar = [];
let arregloActualB = arregloActual;

const inputPalabraBuscar = document.querySelector("#inputNombre");
function EstaCheck() {
    let InputRadio = document.querySelectorAll(".radio-filter .boxRadio .radio-class");
    const checkboxes = document.querySelectorAll(".radio-class");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", () => {

            if (checkboxes[i].checked) {
                InputRadio[i].classList.add("Check");

                checkeados.push(InputRadio[i].value);//agrega al arreglo que plataforma esta check
            }
            else {
                InputRadio[i].classList.remove("Check")
                checkeados = checkeados.filter((elimina) => !elimina.includes(InputRadio[i].value));//elimina del arreglo lo que esta check;

            }

            buscadorPrototipo(checkeados, 0, inputPalabraBuscar.value)
        })
    }
}
EstaCheck();
inputPalabraBuscar.addEventListener("input", (e) => {

    if (inputPalabraBuscar.value) {

        buscadorPrototipo([], 0, inputPalabraBuscar.value)

    } else {
        let InputRadio = document.querySelectorAll(".radio-filter .boxRadio .radio-class");
        for (let i = 0; i < arregloPlataformas.length; i++) {
            InputRadio[i].disabled = false;
        }
        CargaArreglo(arregloJuegos);
    }
})

const buscadorPrototipo = (plataforma = [], accion = 0, input = "") => {
    //debugger;
    if (!plataforma.length == 0 || !accion == 0 || !input.length == 0) {
      
        if (input.length > 0)//si no estan completos pregunta  si es solo input
        {
            console.log(arregloActualB)
            arregloActualB = arregloJuegos.filter((juego) => juego.nombre.toLowerCase().includes(input.toLowerCase().trim()));
            //filtra las plataformas para no eliminarlas
            noEliminar = arregloActualB.map((juego) => { return juego.plataforma })
            noEliminar = [... new Set(noEliminar)]
            EliminarCheckBox(noEliminar);
        } else//si no es input y no esta completo por defecto es plataforma 
        {
            let arregloMoment = [];
            arregloActualB = [];
            plataforma.forEach(tipo => {
                arregloMoment = arregloJuegos.filter((juego) => juego.plataforma.includes(tipo));
                arregloActualB = arregloActualB.concat(arregloMoment);
            });
            
        }
    } else {
        console.log("no estas buscando nada");
        arregloActualB = arregloJuegos;


    }
    CargaArreglo(arregloActualB);
}

const EliminarCheckBox = (noEliminar) => {
    const checkboxes = document.querySelectorAll(".radio-class");
    let InputRadio = document.querySelectorAll(".radio-filter .boxRadio .radio-class");

    let arregloEliminar = comparaArreglosDescarta(arregloPlataformas, noEliminar)//compara arreglos, y descarta los que no estan en la comparacion

    for (let i = 0; i < arregloPlataformas.length; i++) {
        InputRadio[i].disabled = false;
        for (let e = 0; e < arregloEliminar.length; e++) {

            if (InputRadio[i].value == arregloEliminar[e]) {
                console.log("eliminamos");
                InputRadio[i].disabled = true;
            }
        }
    }

}
const comparaArreglosDescarta = (arr1, arr2) => { return arr1.sort().filter(element => !arr2.sort().includes(element)) }
