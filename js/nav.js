import{alertConfigurable} from './sweetAlert'
const btn = document.querySelector('.boton-svg');
const nav = document.querySelector('.nav');
const btnCarrito = document.querySelector('.btn-carrito')
const btnCierraCarrito = document.querySelector('.btn-cierra-carrito')
const FondoCarrito = document.querySelector('.fondo-carrito');
const codigosDescuentoBTN = document.querySelector('.codigosDescuentoBTN');
const instrucionesBtn = document.querySelector('.instrucionesBtn');
let inputNombre = document.querySelector('#inputNombre');
inputNombre.value="";

codigosDescuentoBTN.addEventListener('click',()=>
{
    alertConfigurable('!! CODIGOS DE DESCUENTO !!','Los codigos de descuento validos son CODERHOUSE que entrega un 70% y APROVADO que entrega un 100% de descuento!!!!!!! ');
})
instrucionesBtn.addEventListener('click',()=>
{
    alertConfigurable('INTRUCCIONES','Para agregar al carrito un Juego solo se debe hacer "DOBLE CLICK" en el juego(s) que quiera, luego se debe hacer un click al carrito que se encuentra en el costado superior derecho y darle al boton comprar. si se tiene un codigo de descuento se debe ingresar y al momento de apretar en comprar se le hara el descuento.')
})
btn.addEventListener("click",()=>
{
    nav.classList.toggle('active'); 
});
btnCarrito.addEventListener("click",()=>
{
    FondoCarrito.classList.add("transition")
    FondoCarrito.classList.toggle("active");
    btnCarrito.classList.add("desactivoBtnCarrito");
});
btnCierraCarrito.addEventListener("click",()=>
{
    FondoCarrito.classList.remove("active");
    btnCarrito.classList.remove("desactivoBtnCarrito");
})
window.addEventListener("scroll",()=>
{
    const header = document.querySelector('header');
    header.classList.toggle("sigue",window.scrollY>0);

})

