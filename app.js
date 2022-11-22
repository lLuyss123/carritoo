const productos = document.getElementById('productos');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const fragment = document.createDocumentFragment();
let carrito ={};
const templateProductos = document.getElementById("template-productos").content;
const templateItems = document.getElementById("template-items").content;
const templateFooter = document.getElementById("template-footer").content;



document.addEventListener('DOMContentLoaded', e => {fetchData()});
productos.addEventListener('click',e =>{agregarCarrito(e)});

items.addEventListener('click',e =>{btnAgregarEliminarProductos(e)});

const fetchData = async () =>{
    const res = await fetch('api.json');
    const data = await res.json();
    pintarCards(data);
}

const pintarCards = data =>{
    data.forEach(item => {
        templateProductos.querySelector('h5').textContent=item.name;
        templateProductos.querySelector('p').textContent=item.precio;
        templateProductos.querySelector('img').setAttribute("src", item.image);
        templateProductos.querySelector('button').dataset.id=item.id;
        const clone = templateProductos.cloneNode(true);
        fragment.appendChild(clone);
    });
    productos.appendChild(fragment);
}

const agregarCarrito = e =>{
    if (e.target.classList.contains('btn-primary')) {
        llenarCarrito(e.target.parentElement);
    }
    
    
}

const llenarCarrito = item =>{
    const producto={
        id: item.querySelector('button').dataset.id,
        precio: item.querySelector('p').textContent,
        titulo: item.querySelector('h5').textContent,
        cantidad:1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad=carrito[producto.id].cantidad+1;
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
    pintarFooter();
}

const pintarFooter = () =>{
    footer.innerHTML='';

    if (Object.values(carrito).length===0) {
        footer.innerHTML=`
        <th scope="row" colspan="5">No hay elementos en el Carrito</th>
        `
        return
    }

    const cantidad_productos = Object.values(carrito).reduce((acc,{cantidad}) => acc+cantidad,0);
    const valor_total = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc+cantidad*precio,0);

    templateFooter.querySelectorAll('td')[0].textContent=cantidad_productos;
    templateFooter.querySelectorAll('span')[0].textContent=valor_total;

    

    
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const boton = document.getElementById('vaciar-todo');
    boton.addEventListener('click',()=>{
        carrito={};
        pintarProductos();
    })
}

const btnAgregarEliminarProductos = e =>{
    if (e.target.classList.contains('btn-info')) {
        const producto=carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id]= {...producto};
        pintarProductos();
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto=carrito[e.target.dataset.id];
        producto.cantidad--;
        if (producto.cantidad===0) {
            delete carrito[e.target.dataset.id];
        }else{
            carrito[e.target.dataset.id]= {...producto};
        

        }
        pintarProductos();
        
    }
}
