import { Juego } from "./juego.class"; //importe de clase
import { EstaCheck,arregloActual,BuscaPorPalabra} from "./buscadorJuegos";
export {arregloJuegos,CargaArreglo};
const arregloJuegosPs4 = []; // creaccion de arreglos
const arregloJuegosSwitch = [];
const arregloXbox = []
const arregloPlataformas = ["PS4", "Nintendo Switch", "Xbox"];
const creaArregloPS4 = () => { // poblar arreglos
  const juegodbz = new Juego(0, "God of War", "./Img/ps4/godJuego.jpg", 50000, arregloPlataformas[0], 7);
  const juegogta = new Juego(1, "GTA V", "./Img/ps4/gtaJuego.jpg", 40000, arregloPlataformas[0], 3);
  const juegounc = new Juego(2, "Uncharted", "./Img/ps4/unchar.png", 30000, arregloPlataformas[0], 5);
  const juegogod = new Juego(3, "Dragon Ball kakarot", "./Img/ps4/dbzJuego.jpg", 30000, arregloPlataformas[0], 2);
  arregloJuegosPs4.push(juegodbz, juegogta, juegounc, juegogod);
  JSON.stringify(arregloJuegosPs4);
}
const crearArregloSwitch = () => {// poblar arreglos
  const juegomarioOdyssey = new Juego(4, "Super Mario Odyssey", "./Img/nintendoSwitch/marioO.jpg", 10000, arregloPlataformas[1], 2);
  const juegoSmash = new Juego(5, "Super Smash Ultimate", "./Img/nintendoSwitch/superSmash.jpg", 70000, arregloPlataformas[1], 4);
  const juegoPokemonPika = new Juego(6, "Pokemon let's Go Pikachu", "./Img/nintendoSwitch/pokemonPika.jpg", 15000, arregloPlataformas[1], 6);
  const juegozelda = new Juego(7, "Zelda Breath of the wild", "./Img/nintendoSwitch/zelda.jpg", 50000, arregloPlataformas[1], 5);

  arregloJuegosSwitch.push(juegomarioOdyssey, juegoSmash, juegoPokemonPika, juegozelda);
}
const crearArregloXbox = () => {// poblar arreglos
  const halo = new Juego(8, "Halo 5", "./Img/xbox/xbox.jpg", 35000, arregloPlataformas[2], 2);
  const minecraft = new Juego(9, "Minecraft", "./Img/xbox/minecraft.jpg", 20000, arregloPlataformas[2], 10);
  arregloXbox.push(halo,minecraft);
}

creaArregloPS4();//iniciar arreglos
crearArregloSwitch();
crearArregloXbox();
let arregloJuegos = arregloJuegosPs4.concat(arregloJuegosSwitch);
arregloJuegos = arregloJuegos.concat(arregloXbox);
const CreaContenedorJuego = (arreglo) => {
  const contenedorJuegos = document.getElementById('contenedorJuegos');
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
const CargaArreglo = (arregloActual) => {

  if (arregloActual.length == 0) {
    LimpiarJuegos();
    CreaContenedorJuego(arregloJuegos);
    console.log(arregloActual);
   
  } else {
    LimpiarJuegos();
    CreaContenedorJuego(arregloActual);
  }
  Destacador();
};
CargaArreglo(arregloActual);

function Destacador() {
  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("click", function () {
      cJuego[i].classList.toggle("seleccionado");

    });
  }
}

///////////////////////////////////////////////
const btnComprar = document.getElementById('botonComprar');

btnComprar.addEventListener("click", () => {

  let total = 0;
  let arregloMomentanio = [];
  const compras = document.querySelectorAll('.contenedorJuego.seleccionado .id input ');
  const stock = document.querySelectorAll('.contenedorJuego.seleccionado .txtContenedor .content .stock');
  const confirmador = confirm("Esta seguro de su compra ?");
  if (!confirmador) {
    alert("No se realizara la compra...");
  } else {
    alert("Felicidades Por su Compra");
    for (let i = 0; i < compras.length; i++) {
      console.log(arregloActual);
      arregloJuegos.forEach((juegoi) => {
        if (juegoi.id == compras[i].value) {
          juegoi.stock == 0 ? stock[i].innerHTML = "Agotado" : (total += juegoi.precio, arregloMomentanio.push(juegoi.nombre + " :" + juegoi.precio),
            stock[i].innerHTML = juegoi.descontarStock(1),
            juegoi.stock == 0 ? stock[i].innerHTML = "Agotado" : ""
          );
          console.log(juegoi.stock);
        }
      });
    }
    const arregloFinal = arregloMomentanio.join("\n");
    alert("Los items fueron:\n\n" + arregloFinal + "\nLa totalidad es: " + total);
  }
});

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

EstaCheck()

function LimpiarJuegos() {
  let contJuegos = document.querySelector('.contenedorJuegos');
  let hijos = contJuegos.lastElementChild;
  while (hijos) {
    contJuegos.removeChild(hijos);
    hijos = contJuegos.lastElementChild;
  }
}
