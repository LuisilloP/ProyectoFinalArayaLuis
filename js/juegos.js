
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

     //siempre hay que tener uno en caso de emergencia 
      if(this.stock<=1)
      {
        return "Agotado";
      }else
      {
        this.stock=this.stock-venta;
        return this.stock;
      }
     
    }
 }
const arregloJuegosPs4 =[];
const arregloJuegosSwitch=[];

const creaArregloPS4 = ()=>{
const juegodbz = new Juego(0,"Dragon Ball kakarot","./Img/dbzJuego.jpg",30000,"PS4",2);
const juegogta = new Juego(1,"GTA V","./Img/gtaJuego.jpg",30000,"PS4",3);
const juegounc = new Juego(2,"Uncharted","./Img/unchar.png",30000,"PS4",5);
const juegogod = new Juego(3,"God of War","./Img/godJuego.jpg",50000,"PS4",7);
arregloJuegosPs4.push(juegodbz,juegogta,juegounc,juegogod);
JSON.stringify(arregloJuegosPs4);
}

creaArregloPS4();





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
      <p>Stock </p><p class="stock" >${juego['stock']}</p>
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

        

  const cJuego = document.querySelectorAll('.contenedorJuego');
  for (let i = 0; i < cJuego.length; i++) {
    cJuego[i].addEventListener("click", function() {
        
        cJuego[i].classList.toggle("seleccionado");
        
      
    
      });
  }
  const arregloJuegos = arregloJuegosPs4.concat (arregloJuegosSwitch);
  console.log(arregloJuegos);
  const btn = document.getElementById('boton');
  btn.addEventListener("click",()=>
  {
    let total =0;
    //alert("estas comprando");
    const compras = document.querySelectorAll('.contenedorJuego.seleccionado .id input ');
    const stock = document.querySelectorAll('.contenedorJuego.seleccionado .txtContenedor .content .stock');
    for(let i=0 ;i<compras.length;i++)
    {
      
       arregloJuegos.forEach((juegoi)=>
       {
        if(juegoi.id==compras[i].value)
        {
          //debugger;
          total+=juegoi.precio;
          stock[i].innerHTML=juegoi.descontarStock(1);;
          console.log(juegoi.stock);

        }
       });
    }
    alert("su total es de $"+total);
  });


