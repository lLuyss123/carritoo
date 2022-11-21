const productos = document.getElementById('productos');
const fragment = document.createDocumentFragment();
let carrito ={};
const templateProductos = document.getElementById("template-productos").content;



document.addEventListener('DOMContentLoaded', e => {fetchData()});
productos.addEventListener('click',e =>{agregarCarrito(e)});

const fetchData = async () =>{
    const res = await fetch('api.json');
    const data = await res.json();
    pintarCards(data);
}

const pintarCards = data =>{
    data.forEach(item => {
        templateProductos.querySelector('h5').textContent=item.name;
        templateProductos.querySelector('p').textContent="$"+item.precio;
        templateProductos.querySelector('img').setAttribute("src", item.image);
        templateProductos.querySelector('button').dataset.id=item.id;
        const clone = templateProductos.cloneNode(true);
        fragment.appendChild(clone);
    });
    productos.appendChild(fragment);
}

const agregarCarrito = e =>{
    llenarCarrito(e.target.parentElement);
}

const llenarCarrito = item =>{
    const producto={
        id: item.querySelector('button').dataset.id,
        precio: item.querySelector('p').textContent,
        titulo: item.querySelector('h5').textContent,
        cantidad:1
    }

    carrito(producto.id)={...producto};
}