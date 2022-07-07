import { arregloJuegos }  from './juegosCargaDatos';
import { Carrito} from './carrito.class';
import{alertaSweetToast,alertaSweetWide} from './sweetAlert'
export{agregaACarrito}
let arregloCarrito = [];
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
    console.log(ElementoCarrito.img);
  
    alertaSweetToast("Se ha agregado al carrito",ElementoCarrito.nombre,ElementoCarrito.img)
    arregloCarrito.push(ElementoCarrito);
    cargaHtmlCarrito(ElementoCarrito);
    EliminaJuegoCarrito();
    
  } else {
   let stockMuestra =0;
    for (let e = 0; e < arregloCarrito.length; e++) {
      if (ElementoCarrito.id == idCarrito[e].value) {
        arregloCarrito[e]["cantidad"] = arregloCarrito[e]["cantidad"] + 1
        cantCarritoMod[e].innerHTML = parseInt(cantCarritoMod[e].innerHTML) + 1;
        //console.log(arregloCarrito[e]["cantidad"]);
        stockMuestra =arregloCarrito[e]["cantidad"];
      }
    }
    alertaSweetToast("Se ha agregado un nuevo stock. ",ElementoCarrito.nombre+" Stock Actual : "+stockMuestra,ElementoCarrito.img)
  }
}
const EliminaJuegoCarrito = () => {
    const BtnJuegoAEliminar = document.querySelectorAll('.EliminaJuegoCarrito');
    let idCarrito = document.querySelectorAll('.JuegoCarrito');
    console.log(BtnJuegoAEliminar);

    for (let i = 0; i < BtnJuegoAEliminar.length; i++) {
        //console.log(BtnJuegoAEliminar[i]);
        BtnJuegoAEliminar[i].addEventListener('click', () => {
          
            idCarrito[i].remove();
            let nombre = idCarrito[i].querySelector('#nombreJuegoCarrito').innerHTML;
            let img =idCarrito[i].querySelector(".img-min-carrito").getAttribute('src');
            alertaSweetToast("Se ha Eliminado del carrito",nombre,img,"bottom-left","red");
            arregloCarrito = arregloCarrito.filter((juegoCarrito) => !juegoCarrito.id.toString().includes(idCarrito[i].querySelector('.id-carrito input').value));
        })
    }
}
const cargaHtmlCarrito =(ElementoCarrito)=> {
  const Tabla = document.querySelector('.tbody-carrito');

  let contenidoCarrito = `
    <td><img class="img-min-carrito" src="${ElementoCarrito.img}"></td>
      <td id ="nombreJuegoCarrito">${ElementoCarrito.nombre}</td>
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
const btnComprar = document.getElementById('botonComprar');

btnComprar.addEventListener("click", () => {

  if (arregloCarrito.length == 0) {
    alert("no hay nada en carro");
  } else {
      creaMensajeCompra()
   
    
    //CargaArreglo(arregloActual)
  }
});

const creaMensajeCompra = () => {
  let mensaje = "";
  let total = 0;
  arregloCarrito.forEach(Juego => {
    mensaje += `<br>Juego: ${Juego.nombre} Precio: $${Juego.precio}*${Juego.cantidad}`;
    total += Juego.precio * Juego.cantidad;
    //console.log(arregloJuegos[Juego.id].stock);
  });

  mensaje += `<br>Su total es de $${total}`;
  let respuesta = alertaSweetWide("Detalle Compra",mensaje,"question",arregloJuegos,arregloCarrito)
  console.log(respuesta);
}
///recuerda llamar
const descuentaStock = ()=>
{
  arregloJuegos.find(idCont => {

    if (idCont.id == Juego.id)
      idCont.stock = idCont.stock - Juego.cantidad;

  })
}

preCarga();//carga el almacenamiento de storage hacia el arreglo de carrito y carga el carrito al html
EliminaJuegoCarrito();
agregaACarrito();