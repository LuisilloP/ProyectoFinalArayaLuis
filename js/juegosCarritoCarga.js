import { arregloJuegos }  from './juegosCargaDatos';
import { Carrito} from './carrito.class';
import{alertaSweetToast,alertaSweetWide,alertaCarritoVacio} from './sweetAlert'
export{agregaACarrito}
let arregloCarrito = [];
const codigosDescuento = {CODERHOUSE: 0.3,APROVADO:0};
const inputDescuento = document.querySelector('.codigoDescuento');
function agregaACarrito() {//agrega juegos al carrito al hacer doble click ademas de cargar los datos locales  
  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("dblclick", function () {
      arregloJuegos.forEach((juegoi) => {

        if (juegoi.id == cJuego[i].querySelector('.id input ').value) {

          let ElementoCarrito = new Carrito(juegoi.id, juegoi.nombre, juegoi.precio, 1, juegoi.img);
          let existe = arregloCarrito.find((juego) => juego.id == ElementoCarrito.id)
          
            ConsultaExistencia(existe, ElementoCarrito,juegoi.stock);
        }
      })
      localStorage.setItem("carrito",JSON.stringify(arregloCarrito));
     
    });
  }
}
const ConsultaExistencia = (existe,ElementoCarrito,stockActual) =>// consula si es que existe el stock actual y si existe el juefo dentro del carrito

{
  let cantCarritoMod = document.querySelectorAll('.cantidad-carritoMod');
  let idCarrito = document.querySelectorAll('.id-carrito input');
  if(stockActual)//wtf  
  if (!existe) {

    alertaSweetToast("Se ha agregado al carrito",ElementoCarrito.nombre,ElementoCarrito.img)
    arregloCarrito.push(ElementoCarrito);
    cargaHtmlCarrito(ElementoCarrito);
    EliminaJuegoCarrito();
    
  } else {
   let stockMuestra =0;
    for (let e = 0; e < arregloCarrito.length; e++) {
      if(stockActual<=arregloCarrito[e]["cantidad"])
      {
        stockMuestra = "Max"
      }else
      {
        if (ElementoCarrito.id == idCarrito[e].value) {
          arregloCarrito[e]["cantidad"] = arregloCarrito[e]["cantidad"] + 1
          cantCarritoMod[e].innerHTML = parseInt(cantCarritoMod[e].innerHTML) + 1;
          //console.log(arregloCarrito[e]["cantidad"]);
          stockMuestra =arregloCarrito[e]["cantidad"];
        }
      }
      
    }
    alertaSweetToast("Se ha agregado un nuevo stock. ",ElementoCarrito.nombre+" Stock Actual : "+stockMuestra,ElementoCarrito.img)
  }
}
const EliminaJuegoCarrito = () => {//elimina juego del carrito al darle click 
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
            localStorage.removeItem("carrito");
            localStorage.setItem("carrito",JSON.stringify(arregloCarrito));
        })
    }
}
const cargaHtmlCarrito =(ElementoCarrito)=> {//crea el html del carrito y lo carga
  const Tabla = document.querySelector('.tbody-carrito');
  let {id,nombre,precio,cantidad,img} = ElementoCarrito;
  let contenidoCarrito = `
    <td><img class="img-min-carrito" src="${img}"></td>
      <td id ="nombreJuegoCarrito">${nombre}</td>
      <td class="cantidad-carritoMod">${cantidad}</td>
      <td>${precio}</td>
      <td ><a class ="EliminaJuegoCarrito" >Eliminar</a></td>
      <div class="id-carrito"><input type ="hidden" value =${id}></div>
      `
  const contenedor = document.createElement('tr');
  contenedor.classList.add("JuegoCarrito")
  contenedor.innerHTML = contenidoCarrito;
  Tabla.appendChild(contenedor);
}
const preCarga = () =>  //verifica si hay juegos en el local storage y los carga en el caso de que no muestra console.log
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
    alertaCarritoVacio();
  } else {
      creaMensajeCompra()
      console.log(arregloCarrito);
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

  if(inputDescuento.value.length>0)
  {
    let noexisteCode = false;
    for (const nombre in codigosDescuento)
    {
     
      if(nombre==inputDescuento.value.toUpperCase())
      {
        noexisteCode =true;
        mensaje += `<br><br>Su total es de <del>$${total}</del>`;
        mensaje += `<br>Su total con descuento es de : $${total*codigosDescuento[nombre]}`;
      }
    }
    noexisteCode==false? mensaje += `<br><br>Su total es de $${total}`:""
  }else
  {
    mensaje += `<br><br>Su total es de $${total}`;
  }
  
  alertaSweetWide("Detalle Compra",mensaje,"question",arregloJuegos,arregloCarrito)

}
// llama a las funciones por primera vez para poder ejecutarse correctamente
preCarga();
EliminaJuegoCarrito();
agregaACarrito(); 