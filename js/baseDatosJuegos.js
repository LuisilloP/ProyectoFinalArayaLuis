import { Juego } from "./juego.class"; //importe de clase
export {arregloJuegos,arregloPlataformas};


const arregloPlataformas = ["PS4", "Nintendo Switch", "Xbox"];
const arregloJuegosPs4 = [ 
    new Juego(0, "God of War", "./Img/ps4/godJuego.jpg", 50000, arregloPlataformas[0], 100),
    new Juego(1, "GTA V", "./Img/ps4/gtaJuego.jpg", 40000, arregloPlataformas[0], 200),
    new Juego(2, "Uncharted", "./Img/ps4/unchar.png", 30000, arregloPlataformas[0], 100),
    new Juego(3, "Dragon Ball kakarot", "./Img/ps4/dbzJuego.jpg", 30000, arregloPlataformas[0], 100)
]
const arregloJuegosSwitch = [
   new Juego(4, "Super Mario Odyssey", "./Img/nintendoSwitch/marioO.jpg", 10000, arregloPlataformas[1], 100),
  new Juego(5, "Super Smash Ultimate", "./Img/nintendoSwitch/superSmash.jpg", 70000, arregloPlataformas[1], 100),
   new Juego(6, "Pokemon let's Go Pikachu", "./Img/nintendoSwitch/pokemonPika.jpg", 15000, arregloPlataformas[1], 200),
   new Juego(7, "Zelda Breath of the wild", "./Img/nintendoSwitch/zelda.jpg", 50000, arregloPlataformas[1], 100),
]

const arregloXbox = [// poblar arreglos
  new Juego(8, "Halo 5", "./Img/xbox/xbox.jpg", 35000, arregloPlataformas[2], 200),
  new Juego(9, "Minecraft", "./Img/xbox/minecraft.jpg", 20000, arregloPlataformas[2], 100),
]

let arregloJuegos = arregloJuegosSwitch.concat(...arregloJuegosPs4,...arregloXbox)
