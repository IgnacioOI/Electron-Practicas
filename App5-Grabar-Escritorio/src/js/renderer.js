const {desktopCapturer, remote}= require('electrom');
const {writeFile}=require('fs');
const {writeFile, Menu}=remote;
let grabadorMultimedia;
const  partesGrabacion=[];
let visualizacionCaptura=document.querySelector('#visualizacionCaptura');
let seleccionarFuenteVideo=document.querySelector('#sileccionarFuenteVideo');

let grabar=document.querySelector('#grabar');
let detener=document.querySelector('#detener');
seleccionarFuenteVideo.onclick=obtenerSeleccionarFuentesVideo;
