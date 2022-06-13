import { Juego } from "./juego.class"; //importe de clase
const arregloJuegosPs4 =[]; // creaccion de arreglos
const arregloJuegosSwitch=[];

const creaArregloPS4 = ()=>{ // poblar arreglos
const juegodbz = new Juego(0,"God of War","./Img/godJuego.jpg",50000,"PS4",7);
const juegogta = new Juego(1,"GTA V","./Img/gtaJuego.jpg",30000,"PS4",3);
const juegounc = new Juego(2,"Uncharted","./Img/unchar.png",30000,"PS4",5);
const juegogod = new Juego(3,"Dragon Ball kakarot","./Img/dbzJuego.jpg",30000,"PS4",2);
arregloJuegosPs4.push(juegodbz,juegogta,juegounc,juegogod);
JSON.stringify(arregloJuegosPs4);
}
const crearArregloSwitch =()=>{// poblar arreglos
  const juegomarioOdyssey = new Juego(4,"Super Mario Odyssey","./Img/marioO.jpg",10000,"Nintendo Switch",2);
  const juegoSmash = new Juego(5,"Super Smash Ultimate","./Img/superSmash.jpg",70000,"Nintendo Switch",4);
  const juegoPokemonPika = new Juego(6,"Pokemon let's Go Pikachu","./Img/pokemonPika.jpg",15000,"Nintendo Switch",6);
  const juegozelda = new Juego(7,"Zelda Breath of the wild","./Img/zelda.jpg",50000,"Nintendo Switch",5);
  
  arregloJuegosSwitch.push(juegomarioOdyssey,juegoSmash,juegoPokemonPika,juegozelda);
  }

creaArregloPS4();//iniciar arreglos
crearArregloSwitch();

const contenedorJuegos = document.getElementById('contenedorJuegos');

  const CreaContenedorJuego =(arreglo) =>
  {
    arreglo.forEach(juego=>
      {
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
        contenedor.setAttribute('class','contenedorJuego');
        contenedor.innerHTML =contenidoJuego;
        contenedorJuegos.appendChild(contenedor);
      });
  }
  CreaContenedorJuego(arregloJuegosPs4);
  CreaContenedorJuego(arregloJuegosSwitch);

  //Togle para destacar un juego al hacerle un click y luego precionar comprar;
  function Destacador (){
  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("click", function() {
        cJuego[i].classList.toggle("seleccionado");
        
      });
  }
}
Destacador();
  ///////////////////////////////////////////////
  /////   
  const arregloJuegos = arregloJuegosPs4.concat (arregloJuegosSwitch);
  const btnComprar = document.getElementById('botonComprar');
  btnComprar.addEventListener("click",()=>
  {
    let total =0;
    let arregloMomentanio=[];
    //alert("estas comprando");
    const compras = document.querySelectorAll('.contenedorJuego.seleccionado .id input ');
    const stock = document.querySelectorAll('.contenedorJuego.seleccionado .txtContenedor .content .stock');

    const confirmador = confirm("Esta seguro de su compra ?");
    if(!confirmador)
    {
      alert("No se realizara la compra...");
    }else
    {
      alert("Felicidades Por su Compra");
      for(let i=0 ;i<compras.length;i++)
      {
        arregloJuegos.forEach((juegoi)=>
        {
          if(juegoi.id==compras[i].value)
          {
              juegoi.stock==0?stock[i].innerHTML="Agotado":(total+=juegoi.precio,arregloMomentanio.push(juegoi.nombre+" :"+juegoi.precio),
              stock[i].innerHTML=juegoi.descontarStock(1),
              juegoi.stock==0?stock[i].innerHTML="Agotado":""
              );
            console.log(juegoi.stock);  
          }
        });
      }
    const arregloFinal = arregloMomentanio.join("\n");
    alert("Los items fueron:\n\n"+arregloFinal+"\nLa totalidad es: "+total);
    }
 }); 

 const btnBuscar = document.getElementById("botonBuscar");

 btnBuscar.addEventListener("click",()=>
 {
    LimpiarJuegos();
    const buscaMenor = document.querySelector("#inputValorBuscarMenor").value;
    const buscaMayor = document.querySelector("#inputValorBuscarMayor").value;
    if(parseInt(buscaMenor)>parseInt(buscaMayor))
    {
      debugger;
      alert("Pone bien los valores")}else
    {
    const nuevoResultado =BuscarPorArreglo("Precio",arregloJuegos,parseInt(buscaMenor)||0,parseInt(buscaMayor));
    console.log(nuevoResultado);
    CreaContenedorJuego(nuevoResultado);
    Destacador();
    }
 });
 function BuscarPorArreglo(tipoBusqueda,arreglo,valormin=0,valormax =0)
 {
  let nuevoResultado=[];
    switch (tipoBusqueda) {
      case "Precio":
          nuevoResultado=arreglo.filter((juego) =>juego.precio >=valormin && juego.precio <=valormax );
        break;
      case "1":
          nuevoResultado =1;
      default:
        break;
    }
    return nuevoResultado;
 }  
 function LimpiarJuegos ()
 {  
  let contJuegos = document.querySelector('.contenedorJuegos');
  let hijos =contJuegos.lastElementChild;
  while(hijos)
  {
    contJuegos.removeChild(hijos);
    hijos = contJuegos.lastElementChild;
  }
 }


  