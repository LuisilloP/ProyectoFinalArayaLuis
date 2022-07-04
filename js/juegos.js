import { arregloJuegos,arregloPlataformas } from "./baseDatosJuegos";
import { Carrito } from "./carrito.class";
import { EstaCheck, arregloActual } from "./buscadorJuegos";
export { arregloJuegos, CargaArreglo,arregloPlataformas};

let arregloCarrito = [];

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

function agregaACarrito() {
  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("dblclick", function () {
      arregloJuegos.forEach((juegoi) => {

        if (juegoi.id == cJuego[i].querySelector('.id input ').value) {

          let ElementoCarrito = new Carrito(juegoi.id, juegoi.nombre, juegoi.precio, 1, juegoi.img);
          let existe = arregloCarrito.find((juego) => juego.id == ElementoCarrito.id)
          
          ConsultaExistencia(existe, ElementoCarrito);

        }
      })
      let carritoJson = JSON.stringify(arregloCarrito);
      localStorage.setItem("carrito", carritoJson);
     
    });
  }
}

const ConsultaExistencia = (existe,ElementoCarrito) =>
{
  let cantCarritoMod = document.querySelectorAll('.cantidad-carritoMod');
  let idCarrito = document.querySelectorAll('.id-carrito input');
  if (!existe) {
    console.log("no se encuentra el dato lo agregare");
    arregloCarrito.push(ElementoCarrito);
    cargaHtmlCarrito(ElementoCarrito);
    EliminaJuegoCarrito();
    
  } else {
    console.log("Solo agregare la cantidad");
    for (let e = 0; e < arregloCarrito.length; e++) {
      if (ElementoCarrito.id == idCarrito[e].value) {
        arregloCarrito[e]["cantidad"] = arregloCarrito[e]["cantidad"] + 1
        cantCarritoMod[e].innerHTML = parseInt(cantCarritoMod[e].innerHTML) + 1;
        console.log(arregloCarrito[e]["cantidad"]);
      }
    }
  }
}
// carga el Arreglo actual, en el caso de que sea 0 que es el inicio se cargara por defecto el arreglo de juegos, ademas de que al cargar cada arreglo
// se agregara la funccion de agregar al carrutito
const CargaArreglo = (arregloActual) => {
  arregloActual.length ==0 ? (LimpiarJuegos(),arregloActual = CreaContenedorJuego(arregloJuegos),
  agregaACarrito()
  ):(LimpiarJuegos(),CreaContenedorJuego(arregloActual),
  agregaACarrito())
}; 
CargaArreglo(arregloActual);//carga e,l arreglo por primera vez

const btnComprar = document.getElementById('botonComprar');

btnComprar.addEventListener("click", () => {

  if (arregloCarrito.length == 0) {
    alert("no hay nada en carro");
  } else {
    creaMensajeCompra()
    CargaArreglo(arregloActual)
    alert("no se eliminara el carrito local actual ")
    // let tbody=document.querySelector(".tbody-carrito");
    // console.log(tbody.firstChild);
    // while (tbody.firstChild)
    // {
    //   tbody.removeChild(tbody.firstChild)
    // }
    //location.reload();
  }
});

const creaMensajeCompra = () => {
  let mensaje = "";
  let total = 0;
  arregloCarrito.forEach(Juego => {
    mensaje += `Juego: ${Juego.nombre} Precio: $${Juego.precio} X ${Juego.cantidad}\n`;
    total += Juego.precio * Juego.cantidad;
    arregloJuegos.find(idCont => {

      if (idCont.id == Juego.id)
        idCont.stock = idCont.stock - Juego.cantidad;
      //console.log(idCont.stock);

    })
    console.log(arregloJuegos[Juego.id].stock);
  });

  mensaje += `\n Su total es de $${total} gracias por su compra`;
  alert(mensaje);
}

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

const preCarga = () =>  
{
  const carritoJso = localStorage.getItem("carrito");
  const newCarrito = JSON.parse(carritoJso);

  if(newCarrito ===null)
  {
    console.log("no hay nada en almacenamiento local");
  }else
  {
    arregloCarrito.push(...newCarrito);
    arregloCarrito.forEach(juegoCarrito => {
      cargaHtmlCarrito(juegoCarrito);
    });
  } 
}
preCarga();//carga el almacenamiento de storage hacia el arreglo de carrito y carga el carrito al html
//crea el htm del carrito
function cargaHtmlCarrito(ElementoCarrito) {
  const Tabla = document.querySelector('.tbody-carrito');

  let contenidoCarrito = `
    <td><img class="img-min-carrito" src="${ElementoCarrito.img}"></td>
      <td>${ElementoCarrito.nombre}</td>
      <td class="cantidad-carritoMod">${ElementoCarrito.cantidad}</td>
      <td>${ElementoCarrito.precio}</td>
      <td ><a class ="EliminaJuegoCarrito" >Eliminar</a></td>
      <div class="id-carrito"><input type ="hidden" value =${ElementoCarrito.id}></div>
      `
  const contenedor = document.createElement('tr');
  contenedor.classList.add("JuegoCarrito")
  contenedor.innerHTML = contenidoCarrito;
  Tabla.appendChild(contenedor);
}

const  EliminaJuegoCarrito = () => 
{
  const BtnJuegoAEliminar = document.querySelectorAll('.EliminaJuegoCarrito');
  let idCarrito = document.querySelectorAll('.JuegoCarrito');
  //console.log(BtnJuegoAEliminar);

  for (let i = 0;i<BtnJuegoAEliminar.length;i++)
  {
    //console.log(BtnJuegoAEliminar[i]);
    BtnJuegoAEliminar[i].addEventListener('click',()=>{
      
    idCarrito[i].remove();
    arregloCarrito= arregloCarrito.filter((juegoCarrito) => !juegoCarrito.id.toString().includes(idCarrito[i].querySelector('.id-carrito input').value));

      
  })
  }
}
EliminaJuegoCarrito();


