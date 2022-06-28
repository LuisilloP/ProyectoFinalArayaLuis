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
    const arregloFiltrado = arregloJuegos.filter((juego) => juego.plataforma.includes(plataforma));
    if (accion == 1) {
        arregloActual = arregloActual.concat(arregloFiltrado);    
        CargaArreglo(arregloActual);
        
    } else if (accion == 2) {
        arregloActual = arregloActual.filter((juegoEliminar) => !juegoEliminar.plataforma.includes(plataforma)); 
        CargaArreglo(arregloActual);
    }
} 
const inputPalabraBuscar = document.querySelector("#inputNombre");

console.log("aca 2")
function BuscaPorPalabra(Buscar)
{
    if(arregloActual,length ===0)
    {
     
    }
     Buscar.addEventListener("input",(e)=>
    { 
        CargaArreglo(arregloActual);
        
      if(Buscar.value)
      {
        console.log(Buscar.value); 
        arregloActual = arregloActual.filter((juego) => juego.nombre.toLowerCase().includes(Buscar.value.toLowerCase().trim()));
        console.log(arregloActual)
        if(arregloActual.length==0)
        {
            alert("No existen juegos con estas Caracteristicas")
        }
        CargaArreglo(arregloActual);
      }else{
        arregloActual = arregloJuegos;
        CargaArreglo(arregloActual);
        
        }
    }) 
}

BuscaPorPalabra(inputPalabraBuscar)

//console.log(guardapalabra)
        // let promesa = new Promise((resolve,reject)=>
        // {
        //     setTimeout(() => {
                
        //         resolve(inputPalabraBuscar.value)
        //     }, 5000);
        // })
        // let resultado = await promesa;
        
        // console.log(resultado);