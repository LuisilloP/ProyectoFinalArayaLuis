import Swal from 'sweetalert2';
import { arregloJuegos } from './juegosCargaDatos';
export { alertaSweetToast, alertaSweetWide ,alertaCarritoVacio, alertConfigurable}
import { CargaArreglo } from './juegosCargaDatos';
const alertaSweetToast = (titulo, texto, icono, position, color) => {
  Swal.fire({
    title: titulo,
    position: position || "bottom-left",
    text: texto,
    color: color || '#fff',
    background: 'linear-gradient(180deg, rgb(38, 38, 38) 0%, rgba(0, 123, 105, 0.26) 76%)',
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    width: '23%',
    iconHtml: `<img src="${icono}">`,
    customClass: {
      icon: 'no-border'
    }
  })
}
const alertaSweetWide = (titulo, texto, icono, arr, arregloCarrito) => {
  Swal.fire({
    title: titulo,
    html: texto,
    color: '#fff',
    background: '#191919',
    showConfirmButton: true,
    icon: icono,
    confirmButtonText: "Comprar",
    denyButtonText: "Declinar",
    showDenyButton: true,
    confirmButtonColor: "#49d600"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        {
          color: '#fff',
          background: '#191919',
          title: "Gracias por tu Compra...",
          icon: "success"
        })
      arregloCarrito.forEach(Juego => {
        arr.filter(idCont => {
          if (idCont.id == Juego.id) {
            idCont.stock = idCont.stock - Juego.cantidad;
          }
        })
      });
      const Tabla = document.querySelector('.tbody-carrito');
      Tabla.innerHTML = "";
      CargaArreglo(arregloJuegos)
      arregloCarrito = arregloCarrito.splice(0, arregloCarrito.length);
      localStorage.removeItem("carrito");
    } else if (result.isDenied) {
      Swal.fire(
        {
          color: '#fff',
          background: '#191919',
          title: "No se Realizaran cargos...",
          icon: "info"

        })

    }
  })
  
}
const alertaCarritoVacio =()=>
  {
    Swal.fire({
      icon: 'error',
      title: 'El carrito esta vacio !!!!',
      text: 'Ingresa Juegos haciendo doble click en el juego que quieras para poder agregarlo !!!',
      background: '#191919',
      color:"#fff",
    })
  }
const alertConfigurable = (titulo,texto)=>
{
  Swal.fire({
    title: titulo,
    background: '#191919',
    color:"#fff",
    text:texto,
    
  })
}