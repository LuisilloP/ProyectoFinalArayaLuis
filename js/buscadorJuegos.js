export { EstaCheck ,arregloActual,BuscaPorPalabra};
import{arregloJuegos,CargaArreglo} from "./juegos";
let arregloActual = [];
function EstaCheck() {
    let InputRadio = document.querySelectorAll(".radio-filter .boxRadio .radio-class");
    // let inputRadioActivo = document.querySelectorAll(".radio-filter .boxRadio .radio-class.Check");
    const checkboxes = document.querySelectorAll(".radio-class");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", () => {

            if (checkboxes[i].checked) {
                InputRadio[i].classList.add("Check");
                preparaDatos(InputRadio[i].value, 1);
            }
            else {
                InputRadio[i].classList.remove("Check")
                preparaDatos(InputRadio[i].value, 2);
            }
        })
    }
}
function preparaDatos(plataforma, accion) {
    console.log(arregloActual);
    const arregloFiltrado = arregloJuegos.filter((juego) => juego.plataforma.includes(plataforma));
    if (accion == 1) {
        arregloActual = arregloActual.concat(arregloFiltrado);
        console.log(arregloActual);
        CargaArreglo(arregloActual);
    } else if (accion == 2) {
        arregloActual = arregloActual.filter((juegoEliminar) => !juegoEliminar.plataforma.includes(plataforma));
        console.log(arregloActual);
        CargaArreglo(arregloActual);
    }
} 
const inputPalabraBuscar = document.querySelector("#inputNombre");
let guardapalabra = "";

async function BuscaPorPalabra(inputPalabraBuscar)
{
    

     inputPalabraBuscar.addEventListener("input",async (e)=>
    { 
        guardapalabra = inputPalabraBuscar.value;
        //console.log(guardapalabra)
        let promesa = new Promise((resolve,reject)=>
        {
            

            setTimeout(() => {
                
                resolve(inputPalabraBuscar.value)
            }, 5000);
        })
        let resultado = await promesa;
        console.log(guardapalabra);
        console.log(resultado);
    }) 
    
}

BuscaPorPalabra(inputPalabraBuscar);