const videoElement = document.getElementById('scanner');
const resultElement = document.getElementById('result');
let scanning = false;

const codeReader = new ZXing.BrowserQRCodeReader();

function startScanning() {
  if (!scanning) {
    scanning = true;
    codeReader.getVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          codeReader.decodeFromInputVideoDevice(videoInputDevices[0].deviceId, videoElement, (result) => {
            if (result) {
              resultElement.innerText = 'Result: ' + result.text;
              stopScanning();
            }
          });
        } else {
          console.error('No video input devices found.');
          stopScanning();
        }
      })
      .catch((err) => {
        console.error(err);
        stopScanning();
      });
  }
}

function stopScanning() {
  scanning = false;
  codeReader.reset();
}
