export{Juego};
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
        let resultado = (this.stock<=0)?"Agotado":this.stock=this.stock-venta;
        return resultado;   
    }
 }