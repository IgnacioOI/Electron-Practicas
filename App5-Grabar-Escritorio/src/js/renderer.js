document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.querySelector('#visualizacionCaptura');
  const grabarButton = document.querySelector('#grabar');
  const detenerButton = document.querySelector('#detener');

  let mediaRecorder;
  let recordedChunks = [];

  grabarButton.addEventListener('click', async () => {
    try {
      const sources = await window.electron.startCapture(); // Solicita las fuentes de captura
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[0].id
          }
        }
      });
      handleStream(stream);
    } catch (e) {
      console.error('Error al obtener media:', e);
    }
  });

  detenerButton.addEventListener('click', () => {
    mediaRecorder.stop(); // Detiene la grabación
    grabarButton.disabled = false;
    detenerButton.disabled = true;
  });

  function handleStream(stream) {
    videoElement.srcObject = stream; // Muestra la captura en el elemento de video
    videoElement.play();

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
    mediaRecorder.ondataavailable = (event) => recordedChunks.push(event.data); // Guarda los fragmentos grabados
    mediaRecorder.onstop = () => saveRecording(); // Llama a saveRecording al detener la grabación

    mediaRecorder.start();
    grabarButton.disabled = true;
    detenerButton.disabled = false;
  }

  async function saveRecording() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const arrayBuffer = await blob.arrayBuffer();
    const filePath = await window.electron.showSaveDialog(); // Solicita mostrar el diálogo de guardado

    if (filePath) {
      window.electron.saveRecording(filePath, arrayBuffer); // Envía los datos del archivo para ser guardados
    }
  }
});
