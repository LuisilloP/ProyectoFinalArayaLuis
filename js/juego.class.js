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
        // if(this.stock<=0)
        // {
        //   return "Agotado";
        // }else
        // {
        //     this.stock=this.stock-venta;
        // }
        // return this.stock;
        let resultado = (this.stock<=0)?"Agotado":this.stock=this.stock-venta;
        return resultado;
       
       
    }
 }