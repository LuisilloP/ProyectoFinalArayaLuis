
 class Juego {
    constructor (id,nombre,imgUrl,precio,plataforma,stock) {
      this.id = id;
      this.nombre = nombre;
      this.img = imgUrl;
      this.precio = precio;
      this.plataforma = plataforma;
      this.stock = stock;
    }
    descontarStock(venta)
    {
      let respuesta
      stock>venta ?respuesta=stock-venta: respuesta="no se puede realizar la venta ya que el stock es insufuciente";
      return respuesta;
    }
 }
 const arregloJuegosPs4 =[];
 const arregloJuegosSwitch=[];
const juegodbz = new Juego(0,"Dragon Ball kakarot","./Img/dbzJuego.jpg",30000,"PS4",2);
const juegogta = new Juego(1,"GTA V","./Img/gtaJuego.jpg",30000,"PS4",3);
const juegounc = new Juego(2,"Uncharted","./Img/unchar.png",30000,"PS4",5);
const juegogod = new Juego(3,"God of War","./Img/godJuego.jpg",50000,"PS4",7);

arregloJuegosPs4.push(juegodbz,juegogta,juegounc,juegogod);
JSON.stringify(arregloJuegosPs4);

console.log(arregloJuegosPs4);
const contenedorJuegos = document.getElementById('contenedorJuegos');     
arregloJuegosPs4.forEach(juego => 
{
  let contenidoJuego = `
  <img src="${juego['img']}" class="img">
  <p>${juego['nombre']}</p>
  <div class="txtContenedor">
    <div class ="content">
      <p>Precio</p> <p class="precios" >${juego['precio']}</p>
    </div>
    <div class="content"> 
      <p>Stock </p><p class="precios" >${juego['stock']}</p>
    </div>
 </div>
 <div class="id"><input type ="hidden" value =${juego['id']}></div>
  `;
  const contenedor = document.createElement('div'); 
  contenedor.setAttribute('class','contenedorJuego');
  contenedor.innerHTML=contenidoJuego;
  contenedorJuegos.appendChild(contenedor);
});

const juegomarioOdyssey = new Juego(4,"Super Mario Odyssey","./Img/marioO.jpg",10000,"Nintendo Switch",2);
const juegoSmash = new Juego(5,"Super Smash Ultimate","./Img/superSmash.jpg",70000,"Nintendo Switch",4);
const juegoPokemonPika = new Juego(6,"Pokemon let's Go Pikachu","./Img/pokemonPika.jpg",15000,"Nintendo Switch",6);
const juegozelda = new Juego(7,"Zelda Breath of the wild","./Img/zelda.jpg",50000,"Nintendo Switch",5);

arregloJuegosSwitch.push(juegomarioOdyssey,juegoSmash,juegoPokemonPika,juegozelda);
arregloJuegosSwitch.forEach(juego=>
  {
    let contenidoJuego = `
    <img src="${juego['img']}" class="img">
    <p>${juego['nombre']}</p>
    <div class="txtContenedor">
      <div class ="content">
        <p>Precio</p> <p class="precios" >${juego['precio']}</p>
      </div>
      <div class="content"> 
        <p>Stock </p><p class="precios" >${juego['stock']}</p>
      </div>
   </div>
   <div class="id"><input type ="hidden" value =${juego['id']}></div>
    `;
    var contenedor = document.createElement('div');
    contenedor.setAttribute('class','contenedorJuego');
    contenedor.innerHTML =contenidoJuego;
    contenedorJuegos.appendChild(contenedor);
  });

        

  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("click", function() {
        
        cJuego[i].classList.toggle("seleccionado");
        
      
    
      });
  }

  const btn = document.getElementById('boton');
  btn.addEventListener("click",()=>
  {
    //alert("estas comprando");
    const compras = document.querySelectorAll('.contenedorJuego.seleccionado .id input ');
    for(let i=0 ;i<compras.length;i++)
    {
      alert(compras[i].value);

    }
    
 
  })

