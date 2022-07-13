import Swal from 'sweetalert2';
import { arregloJuegos } from './juegosCargaDatos';
export { alertaSweetToast, alertaSweetWide }
import { CargaArreglo } from './juegosCargaDatos';
const alertaSweetToast = (titulo, texto, icono,position,color) => {
  Swal.fire({
    title: titulo,
    position: position||"bottom-right",
    text: texto,
    color: color||'#fff',
    background: '#191919',
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
        arr.find(idCont => {
          if (idCont.id == Juego.id)
            idCont.stock = idCont.stock - Juego.cantidad;
        })
        const Tabla = document.querySelector('.tbody-carrito');
        Tabla.innerHTML="";
        CargaArreglo(arregloJuegos)
      });
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