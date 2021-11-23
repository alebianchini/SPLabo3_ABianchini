import Anuncio_Mascota from "../anuncio.js";

const URL = "http://localhost:3000/anuncios";
let anuncios = [];
const $formulario = document.forms[0];
const $divTabla = document.getElementById("divTabla");
const $submit = document.getElementById("btnSubmit");
const $btnEliminar = document.querySelector("#btnEliminar");
const $btnCancelar = document.querySelector("#btnCancelar");


window.addEventListener("DOMContentLoaded", ()=>{
    getAnuncios();
});

window.addEventListener("click", (e)=>{
    if(e.target.matches("td")){
        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == e.target.parentElement.dataset.id));
        if($btnEliminar.hasAttribute("hidden")){
            cambiarBotones();
        }
    }
    else if(e.target.matches("#btnEliminar")){
        bajaAnuncio(parseInt($formulario.txtId.value));
        limpiarFormulario();
    }
    else if(e.target.matches("#btnCancelar")){
        limpiarFormulario();
    }
})

function getAnuncios(){
    const xhr = new XMLHttpRequest();
    let data;
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
                actualizarTabla(data);
                anuncios = data;
            }
            else{
                console.error("Error " + xhr.status + ": " + xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            agregarSpinner();
        }
    });
    xhr.open("GET", URL);
    xhr.send();
}

function crearTabla(data){
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecera = document.createElement("tr");
    for (const key in data[0]) {
        if(key !== "id"){
            const th = document.createElement("th");
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            cabecera.appendChild(th);
        }
    }
    thead.appendChild(cabecera);
    tabla.appendChild(thead);

    data.forEach(element => {
        const tr = document.createElement("tr");
        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("data-id", element[key]);
            }
            else{
                const td = document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);

    return tabla;
}

function actualizarTabla(anuncios){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    $divTabla.appendChild(crearTabla(anuncios));
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

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {txtId, txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtNacimiento, txtVacuna} = $formulario;
    const formAnuncio = new Anuncio_Mascota(txtId.value, txtTitulo.value, "venta", txtDescripcion.value, txtPrecio.value, rdoAnimal.value, txtRaza.value, txtNacimiento.value, txtVacuna.value);
    
    if(formAnuncio.id === ''){
        formAnuncio.id = Date.now();
        altaAnuncio(formAnuncio);
    }
    else{
        modifAnuncio(formAnuncio);
        cambiarBotones();
    }
    $formulario.reset();
    $formulario.txtId.value = '';
})

function altaAnuncio(nuevoAnuncio){
    anuncios.push(nuevoAnuncio);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                const data = JSON.parse(xhr.responseText);
            }
            else{
                console.error("Error " + xhr.status + ": " + xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            agregarSpinner();
        }
    });
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf8");
    xhr.send(JSON.stringify(nuevoAnuncio));
}

function modifAnuncio(nuevoAnuncio){
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == nuevoAnuncio.id;
    });
    anuncios.splice(indice, 1, nuevoAnuncio);
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
            }
            else{
                console.error("Error " + xhr.status + ": " + xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            agregarSpinner();
        }
    });
    xhr.open("PUT", URL + "/" + nuevoAnuncio.id);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf8");
    xhr.send(JSON.stringify(nuevoAnuncio));
}

function bajaAnuncio(id){
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == id;
    });
    anuncios.splice(indice, 1);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            
            if(xhr.status >= 200 && xhr.status < 300){
            }
            else{
                console.error("Error " + xhr.status + ": " + xhr.statusText);
            }
            eliminarSpinner();
        }
        else{
            agregarSpinner();
        }
    });
    xhr.open("DELETE", URL + "/" + id);
    xhr.send();
}

function cargarFormulario(anuncio) {
    const {txtId, txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtNacimiento, txtVacuna} = $formulario;
    
    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    rdoAnimal.value = anuncio.animal;
    txtPrecio.value = anuncio.precio;
    txtRaza.value = anuncio.raza;
    txtNacimiento.value = anuncio.nacimiento;
    txtVacuna.value = anuncio.vacuna;
}

function limpiarFormulario(){
    $formulario.reset();
    $formulario.txtId.value = '';
    cambiarBotones();
}

function cambiarBotones(){
    if($submit.value === "Guardar"){
        $submit.value = "Modificar"
    }
    else{
        $submit.value = "Guardar"
    }
    $btnEliminar.toggleAttribute("hidden");
    $btnCancelar.toggleAttribute("hidden");
}