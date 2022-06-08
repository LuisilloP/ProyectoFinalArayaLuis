
const btn = document.querySelector('.boton-svg');
const nav = document.querySelector('.nav');

btn.addEventListener("click",()=>
{
    nav.classList.toggle('active'); 
});
window.addEventListener("scroll",()=>
{
        const header = document.querySelector('header');
        header.classList.toggle("sigue",window.scrollY>0);

})