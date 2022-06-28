import { Juego } from "./juego.class"; //importe de clase
import { Carrito } from "./carrito.class";
import { EstaCheck, arregloActual, BuscaPorPalabra } from "./buscadorJuegos";
export { arregloJuegos, CargaArreglo };
const arregloJuegosPs4 = []; // creaccion de arreglos
const arregloJuegosSwitch = [];
const arregloXbox = []
const arregloPlataformas = ["PS4", "Nintendo Switch", "Xbox"];
let arregloCarrito = [];
const creaArregloPS4 = () => { // poblar arreglos
  const juegodbz = new Juego(0, "God of War", "./Img/ps4/godJuego.jpg", 50000, arregloPlataformas[0], 100);
  const juegogta = new Juego(1, "GTA V", "./Img/ps4/gtaJuego.jpg", 40000, arregloPlataformas[0], 200);
  const juegounc = new Juego(2, "Uncharted", "./Img/ps4/unchar.png", 30000, arregloPlataformas[0], 100);
  const juegogod = new Juego(3, "Dragon Ball kakarot", "./Img/ps4/dbzJuego.jpg", 30000, arregloPlataformas[0], 100);
  arregloJuegosPs4.push(juegodbz, juegogta, juegounc, juegogod);
  JSON.stringify(arregloJuegosPs4);
}
const crearArregloSwitch = () => {// poblar arreglos
  const juegomarioOdyssey = new Juego(4, "Super Mario Odyssey", "./Img/nintendoSwitch/marioO.jpg", 10000, arregloPlataformas[1], 100);
  const juegoSmash = new Juego(5, "Super Smash Ultimate", "./Img/nintendoSwitch/superSmash.jpg", 70000, arregloPlataformas[1], 100);
  const juegoPokemonPika = new Juego(6, "Pokemon let's Go Pikachu", "./Img/nintendoSwitch/pokemonPika.jpg", 15000, arregloPlataformas[1], 200);
  const juegozelda = new Juego(7, "Zelda Breath of the wild", "./Img/nintendoSwitch/zelda.jpg", 50000, arregloPlataformas[1], 100);

  arregloJuegosSwitch.push(juegomarioOdyssey, juegoSmash, juegoPokemonPika, juegozelda);
}
const crearArregloXbox = () => {// poblar arreglos
  const halo = new Juego(8, "Halo 5", "./Img/xbox/xbox.jpg", 35000, arregloPlataformas[2], 200);
  const minecraft = new Juego(9, "Minecraft", "./Img/xbox/minecraft.jpg", 20000, arregloPlataformas[2], 100);
  arregloXbox.push(halo, minecraft);
}

creaArregloPS4();//iniciar arreglos
crearArregloSwitch();
crearArregloXbox();
let carritoJson;
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
  LimpiarJuegos();
  if (arregloActual.length == 0) {
    arregloActual = CreaContenedorJuego(arregloJuegos);
    console.log(arregloActual);

  } else {
    CreaContenedorJuego(arregloActual);
  }
};
CargaArreglo(arregloActual);
const inputPalabraBuscar = document.querySelector("#inputNombre");

BuscaPorPalabra(inputPalabraBuscar)

const btnComprar = document.getElementById('botonComprar');

btnComprar.addEventListener("click", () => {
  
  if(arregloCarrito.length==0)
  {
    alert("no hay nada en carro");
  }else
  {
    
    let mensaje ="";
    let total = 0;
    arregloCarrito.forEach(Juego => {
       mensaje += `Juego: ${Juego.nombre} Precio: $${Juego.precio} X ${Juego.cantidad}\n`;
       total += Juego.precio*Juego.cantidad;
       arregloJuegos.find(idCont=>
       {
        
        if(idCont.id ==Juego.id)
        idCont.stock =idCont.stock-Juego.cantidad;
          //console.log(idCont.stock);
          
       })
       console.log(arregloJuegos[Juego.id].stock);
    });
    
    mensaje += `\n Su total es de $${total} gracias por su compra`;
   
    CargaArreglo(arregloActual)
    //alert(mensaje);
    //alert("no se eliminara el carrito local actual ")
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
function agregaACarrito() {
  const cJuego = document.querySelectorAll('.contenedorJuego');
  console.log(cJuego.length)
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("dblclick", function () {
      console.log("hola");
      let cantCarritoMod = document.querySelectorAll('.cantidad-carritoMod');
      let idCarrito = document.querySelectorAll('.id-carrito input');
      arregloJuegos.forEach((juegoi) => {
        console.log("hola")
        if (juegoi.id == cJuego[i].querySelector('.id input ').value) {
          console.log("hola")
          let ElementoCarrito = new Carrito(juegoi.id, juegoi.nombre, juegoi.precio, 1, juegoi.img);
          if (arregloCarrito.length == 0) {
          
            arregloCarrito.push(ElementoCarrito);
            cargaHtmlCarrito(ElementoCarrito);
          } else {
            
           let Existe =arregloCarrito.find((juego)=>juego.id ==ElementoCarrito.id)
           if(!Existe)
           {
            console.log("no se encuentra el dato lo agregare");
            arregloCarrito.push(ElementoCarrito);
            cargaHtmlCarrito(ElementoCarrito);
           }else
           {
            console.log("Solo agregare la cantidad");
            //ElementoCarrito.sumaUnidad(1);
           
            for(let e = 0 ;e<arregloCarrito.length;e++)
            {
              if(ElementoCarrito.id ==idCarrito[e].value)
              {               
                arregloCarrito[e]["cantidad"] = arregloCarrito[e]["cantidad"]+1
                cantCarritoMod[e].innerHTML = parseInt(cantCarritoMod[e].innerHTML)+1;
                console.log(arregloCarrito[e]["cantidad"]);
                
              }
              
            }
           }
          }

        }
      })
      console.log(arregloCarrito);
      carritoJson = JSON.stringify(arregloCarrito);
      localStorage.setItem("carrito",carritoJson);
    });
  }
 
  
}
agregaACarrito();

const preCarga = () =>  
{

  const carritoJso = localStorage.getItem("carrito");
  const newCarrito = JSON.parse(carritoJso);

  if(newCarrito ===null)
  {
    console.log("wit");
  }else
  {
    arregloCarrito = newCarrito;
    newCarrito.forEach(juegoCarrito => {
      cargaHtmlCarrito(juegoCarrito);
    });
  }
 
  
}
preCarga();
function cargaHtmlCarrito(ElementoCarrito) {
  const Tabla = document.querySelector('.tbody-carrito');

  let contenidoCarrito = `
    <td><img class="img-min-carrito" src="${ElementoCarrito.img}"></td>
      <td>${ElementoCarrito.nombre}</td>
      <td class="cantidad-carritoMod">${ElementoCarrito.cantidad}</td>
      <td>${ElementoCarrito.precio}</td>
      <td>Eliminar</td>
      <div class="id-carrito"><input type ="hidden" value =${ElementoCarrito.id}></div>
      `
  const contenedor = document.createElement('tr');
  contenedor.classList.add("JuegoCarrito")
  contenedor.innerHTML = contenidoCarrito;
  Tabla.appendChild(contenedor);
}
