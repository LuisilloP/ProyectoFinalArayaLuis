import { arregloJuegos, CargaArreglo, arregloPlataformas, arregloActual } from "./juegosCargaDatos";
let checkeados = [];
let arregloActualB = arregloActual;

const inputPalabraBuscar = document.querySelector("#inputNombre");
function EstaCheck() //sirve para identificar si estan check los input o si no lo estan 
{
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
            buscadorPrototipo(checkeados, 2, inputPalabraBuscar.value)
        })
    }
}
EstaCheck();

inputPalabraBuscar.addEventListener("input", (e) => {
    let InputRadio = document.querySelectorAll(".radio-filter .boxRadio .radio-class");
    if (inputPalabraBuscar.value) {

        buscadorPrototipo(checkeados, 2, inputPalabraBuscar.value)
    } else {
        for (let i = 0; i < arregloPlataformas.length; i++) {
            InputRadio[i].disabled = false;
        }
        buscadorPrototipo(checkeados, 2, inputPalabraBuscar.value)

    }

})

const buscadorPrototipo = (plataforma = [], accion = 0, input = "") => {//buscador el cual identifica los input o checks
    let arregloMoment = [];
    if (accion == 2) {
        if (input.length>0) {//si hay un input filtra primero por su input luego por su plataforma
            arregloActualB = [];
            if (plataforma.length == 0) {//si no hay una plataforma al momento de buscar
                arregloActualB = arregloJuegos.filter((juego) => juego.nombre.toLowerCase().includes(input.toLowerCase().trim()))
            }else
            {
                plataforma.forEach(tipo => {
                    arregloMoment = arregloJuegos.filter((juego) => juego.nombre.toLowerCase().includes(input.toLowerCase().trim()))
                    arregloMoment = arregloMoment.filter((juego) => juego.plataforma.includes(tipo));
                    arregloActualB = arregloActualB.concat(arregloMoment);
                });
            }
        } else if (plataforma.length == 0) {
            console.log("no estas buscando nada");
            arregloActualB = arregloJuegos;
            //EliminarCheckBox(arregloActualB);

        } else {
            arregloActualB = [];
            plataforma.forEach(tipo => {
                arregloMoment = arregloJuegos.filter((juego) => juego.plataforma.includes(tipo));
                arregloActualB = arregloActualB.concat(arregloMoment);
            });
        }
        console.log(arregloActualB);
    }
    CargaArreglo(arregloActualB);
}
