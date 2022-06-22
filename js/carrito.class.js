export{Carrito};
class Carrito
{
    constructor (id,nombre,precio,cantidad,img)
    {
        this.id= id;
        this.nombre =nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.img=img;
    }
    multiplicarPrecio(nuevaCantidad)
    {
        return this.precio*nuevaCantidad;
    }
    sumaUnidad(sum)
    {
        this.cantidad = this.cantidad+sum;
    }

}