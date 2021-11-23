
const URL = "http://localhost:3000/anuncios";

export function getAnuncios(anuncios){
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300){
                anuncios = JSON.parse(xhr.responseText);
                console.log(anuncios);
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

function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("divSpinner").appendChild(spinner);
}

function eliminarSpinner(){
    document.getElementById("divSpinner").innerHTML="";
}