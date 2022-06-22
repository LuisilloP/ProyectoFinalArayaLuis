
const btn = document.querySelector('.boton-svg');
const nav = document.querySelector('.nav');
const btnCarrito = document.querySelector('.btn-carrito')
const btnCierraCarrito = document.querySelector('.btn-cierra-carrito')
const FondoCarrito = document.querySelector('.fondo-carrito');

btn.addEventListener("click",()=>
{
    nav.classList.toggle('active'); 
});
btnCarrito.addEventListener("click",()=>
{
    FondoCarrito.classList.add("transition")
    FondoCarrito.classList.toggle("active");
});
btnCierraCarrito.addEventListener("click",()=>
{
    FondoCarrito.classList.remove("active");
    //FondoCarrito.classList.remove("transition");
    
})
window.addEventListener("scroll",()=>
{
    const header = document.querySelector('header');
    header.classList.toggle("sigue",window.scrollY>0);

})

