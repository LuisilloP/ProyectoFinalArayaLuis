
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
const juegodbz = new Juego(0,"Dragon Ball kakarot","./Img/dbzJuego.jpg",30000,"PS4",5);
const juegogta = new Juego(1,"GTA V","./Img/gtaJuego.jpg",30000,"PS4",5);
const juegounc = new Juego(2,"Uncharted","./Img/unchar.png",30000,"PS4",5);
const juegogod = new Juego(3,"God of War","./Img/godJuego.jpg",50000,"PS4",5);

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
    <input type ="hidden" value =${juego['id']}/>
  </div>
  <div class="content"> 
    <p>Stock </p><p class="precios" >${juego['stock']}</p>
   </div>
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
    <input type ="hidden" value =${juego['id']}>
    </div>
    <div class="content"> 
    <p>Stock </p><p class="precios" >${juego['stock']}</p>
   </div>
   </div>
    `;
    var contenedor = document.createElement('div');
    contenedor.setAttribute('class','contenedorJuego');
    contenedor.innerHTML =contenidoJuego;
    contenedorJuegos.appendChild(contenedor);
  });



        



// const precioJuegos =["30000","20000","40000"];
// const btn = document.getElementById('boton');
// const cantidadGta =  document.getElementById("cantidadGta");
// const cantidadDbz =  document.getElementById("cantidadDbz");
// const cantidadUnc =  document.getElementById("cantidadUnc");

//  let total = 0;
//  btn.addEventListener("click",()=>
//  {
//      if(cantidadGta.value!=0 || cantidadDbz.value !=0 || cantidadUnc.value !=0)
//      {
//          for(let i = 0; i<precioJuegos.length;i++)
//          {
//             switch (i)
//             {
//              case 0:
//                  if(cantidadDbz.value!=0)total +=precioJuegos[i]*cantidadDbz.value;
//                  break;
//              case 1:
//                  if(cantidadGta.value!=0)total +=precioJuegos[i]*cantidadGta.value;  
//                  break;
//              case 2:
//                  if(cantidadUnc.value!=0)total +=precioJuegos[i]*cantidadUnc.value;
//                  break;        
//             }
//          }
//      alert("Su tutal es de "+total);
//      total=0;
//      }else
//      {
//          alert("ingresa una cantidad de algun producto");
//      }
//  }); 
