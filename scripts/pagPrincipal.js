import Anuncio_Mascota from "../anuncio.js";

const URL = "http://localhost:3000/anuncios";
let anuncios = [];
const $divAnuncios = document.getElementById("divAnuncios");

window.addEventListener("DOMContentLoaded", ()=>{
    getAnunciosAsync();
});

async function getAnunciosAsync(){
    try {
        agregarSpinner();
        const res = await fetch(URL);
        
        if(!res.ok){
            throw new Error("Error " + res.status + ": " + res.statusText);
        }
        const data = await res.json();
        console.log(data);
        anuncios = data;
    } catch (error) {
        console.error(error.message);
    } finally{
        eliminarSpinner();
        anuncios.forEach(element => {
            $divAnuncios.appendChild(crearAnuncio(element));
        });
    }
}

function crearAnuncio(anuncio){
    const $articulo = document.createElement("article");
    const titulo = document.createElement("h2");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const $divCaracteristicas = document.createElement("div");
    const $divRaza = document.createElement("div");
    const imgRaza = document.createElement("img");
    const raza = document.createElement("p");
    const $divNacimiento = document.createElement("div");
    const nacimiento = document.createElement("p");
    const imgCigueña = document.createElement("img");
    const $divVacuna = document.createElement("div");
    const imgVacuna = document.createElement("img");
    const vacuna = document.createElement("p");
    const $boton = document.createElement("a");

    imgRaza.src = "./assets/cat_icon.png";
    raza.textContent = anuncio.raza;
    $divRaza.appendChild(imgRaza);
    $divRaza.appendChild(raza);
    imgCigueña.src = "./assets/cigueña_icon.png";
    nacimiento.textContent = anuncio.nacimiento;
    $divNacimiento.appendChild(imgCigueña);
    $divNacimiento.appendChild(nacimiento);
    imgVacuna.src = "./assets/vacuna_icon.png";
    vacuna.textContent = anuncio.vacuna;
    $divVacuna.appendChild(imgVacuna);
    $divVacuna.appendChild(vacuna);
    $divCaracteristicas.appendChild($divRaza);
    $divCaracteristicas.appendChild($divNacimiento);
    $divCaracteristicas.appendChild($divVacuna);
    $divCaracteristicas.setAttribute("id", "divCaracteristicas");
    titulo.textContent = anuncio.titulo;
    descripcion.textContent = anuncio.descripcion;
    precio.textContent = "PRECIO: $" + anuncio.precio;
    $boton.href = "#";
    $boton.textContent = "Ver Mascota";
    $boton.classList.add("button");


    $articulo.appendChild(titulo);
    $articulo.appendChild(descripcion);
    $articulo.appendChild(precio);
    $articulo.appendChild($divCaracteristicas);
    $articulo.appendChild($boton);

    return $articulo;
}

function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("divSpinner").appendChild(spinner);
}

function eliminarSpinner(){
    document.getElementById("divSpinner").innerHTML="";
}