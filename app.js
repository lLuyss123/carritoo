const productos = document.getElementById('productos');
const items = document.getElementById('items');
const fragment = document.createDocumentFragment();
let carrito ={};
const templateProductos = document.getElementById("template-productos").content;
const templateItems = document.getElementById("template-items").content;



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

    carrito[producto.id]={...producto};
    pintarProductos();
}

const pintarProductos =() =>{
    items.innerHTML='';
    Object.values(carrito).forEach(producto =>{
        templateItems.querySelector('th').textContent=producto.id;
        templateItems.querySelectorAll('td')[0].textContent=producto.titulo;
        templateItems.querySelectorAll('td')[1].textContent=producto.cantidad;
        templateItems.querySelector('span').textContent=producto.precio*producto.cantidad;

        templateItems.querySelector('.btn-info').dataset.id=producto.id;
        templateItems.querySelector('.btn-danger').dataset.id=producto.id;

        const clone = templateItems.cloneNode(true);
        fragment.appendChild(clone);

    })
    items.appendChild(fragment);
}