import { agregaACarrito } from "./juegosCarritoCarga";
export{arregloJuegos,arregloActual,CargaArreglo,arregloPlataformas};

const arregloPlataformas = ["PS4", "Nintendo Switch", "Xbox"];
let datos =[]
let arregloJuegos = []
let arregloActual=[];
const obtieneDatos = async (url) =>
{
  try
  {
    const response = await fetch(url)
    const data = await response.json()
    datos = data;
  }catch(err)
  {
    console.log(err);
  }finally
  {
    await CargaArreglo(datos);
    arregloJuegos = datos;
    
    arregloActual=arregloJuegos;
  }
}
obtieneDatos("https://62cd8ae9066bd2b69927f916.mockapi.io/Juegos")

//carga de Plataformas en Juegos 
const CargaRadioButons = (arregloPlataformas) => {
  let contenedorRadio = document.querySelector(".radio-filter");
  arregloPlataformas.forEach((tipoPlataforma) => {
    const createDiv = document.createElement("DIV");
    const createInput = document.createElement("input");
    const createlabel = document.createElement("label");
    createInput.type = "checkbox";
    createDiv.classList.add("boxRadio");
    createInput.classList.add("radio-class");
    createInput.value = tipoPlataforma;
    createlabel.textContent = tipoPlataforma;
    createDiv.appendChild(createInput);
    createDiv.appendChild(createlabel);
    contenedorRadio.appendChild(createDiv);

  })
}
CargaRadioButons(arregloPlataformas);

const CreaContenedorJuego = (arreglo) => {
  const contenedorJuegos = document.querySelector('#contenedorJuegos');
  arreglo.forEach(juego => {
    let contenidoJuego = `
        <img src="${juego['img']}" class="img">
        <p class="nombreJuego">${juego['nombre']}</p>
        <div class="txtContenedor">
          <div class ="content">
            <p>Precio</p> <p class="precios" >${juego['precio']}</p>
          </div>
          <div class="content"> 
            <p>Stock </p><p class="stock">${juego['stock']}</p>
          </div>
       </div>
       <div class="id"><input type ="hidden" value =${juego['id']}></div>
        `;
    var contenedor = document.createElement('div');
    contenedor.setAttribute('class', 'contenedorJuego');
    contenedor.innerHTML = contenidoJuego;
    contenedorJuegos.appendChild(contenedor);
  });
  return arreglo;
}
//limpia todos los juegos de div
function LimpiarJuegos() {
  let contJuegos = document.querySelector('.contenedorJuegos');
  let hijos = contJuegos.lastElementChild;
  while (hijos) {
    contJuegos.removeChild(hijos);
    hijos = contJuegos.lastElementChild;
  }
}
//carga el arreglo para mostrar los juegos 
const CargaArreglo = (arregloActual) => {
  arregloActual.length ==0 ? (LimpiarJuegos(),agregaACarrito()
  ):(LimpiarJuegos(),CreaContenedorJuego(arregloActual),agregaACarrito())
}; 