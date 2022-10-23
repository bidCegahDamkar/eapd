
    var FACING_MODES = JslibHtml5CameraPhoto.FACING_MODES;
    var IMAGE_TYPES = JslibHtml5CameraPhoto.IMAGE_TYPES;

    // get video and image elements
    var videoElement = document.getElementById('videoId');
    var imgElement = document.getElementById('imgId');

    // get select and buttons elements
    var facingModeSelectElement =
        document.getElementById('facingModeSelectId');
    var startCameraDefaultAllButtonElement =
        document.getElementById('startDefaultAllButtonId');
    var startDefaultResolutionButtonElement =
        document.getElementById('startDefaultResolutionButtonId');
    var startMaxResolutionButtonElement =
        document.getElementById('startMaxResolutionId');
    var takePhotoButtonElement =
        document.getElementById('takePhotoButtonId');
    var stopCameraButtonElement =
        document.getElementById('stopCameraButtonId');
    var cameraSettingElement =
        document.getElementById('cameraSettingsId');
    var showInputVideoDeviceInfosButtonElement =
      document.getElementById('showInputVideoDeviceInfosButtonId');
    var inputVideoDeviceInfosElement =
        document.getElementById('inputVideoDeviceInfosId');

    // instantiate JslibHtml5CameraPhoto with the videoElement
    var cameraPhoto = new JslibHtml5CameraPhoto.default(videoElement);

    function startCameraDefaultAll () {
      cameraPhoto.startCamera()
        .then(() => {
          var log = `Camera started with default All`;
          console.log(log);
        })
        .catch((error) => {
          console.error('Camera not started!', error);
        });
    }

    // start the camera with prefered environment facingMode ie. ()
    // if the environment facingMode is not avalible, it will fallback
    // to the default camera avalible.
    function startCameraDefaultResolution () {
      var facingMode = facingModeSelectElement.value;
      cameraPhoto.startCamera(FACING_MODES[facingMode])
        .then(() => {
          var log =
              `Camera started with default resolution and ` +
              `prefered facingMode : ${facingMode}`;
          console.log(log);
        })
        .catch((error) => {
          console.error('Camera not started!', error);
        });
    }

    // function called by the buttons.
    function takePhoto () {
      var sizeFactor = 1;
      var imageType = IMAGE_TYPES.JPG;
      var imageCompression = 1;

      var config = {
        sizeFactor,
        imageType,
        imageCompression
      };

      var dataUri = cameraPhoto.getDataUri(config);
      imgElement.src = dataUri;
    }

    function showCameraSettings () {
      var settings = cameraPhoto.getCameraSettings();

      // by default is no camera...
      var innerHTML = 'No camera';
      if (settings) {
        var {aspectRatio, frameRate, height, width} = settings;
        innerHTML = `
            aspectRatio:${aspectRatio}
            frameRate: ${frameRate}
            height: ${height}
            width: ${width}
        `;
      }
      cameraSettingElement.innerHTML = innerHTML;
    }

    function showInputVideoDeviceInfos () {
      var inputVideoDeviceInfos = cameraPhoto.getInputVideoDeviceInfos();

      // by default is no inputVideoDeviceInfo...
      var innerHTML = 'No inputVideoDeviceInfo';
      if (inputVideoDeviceInfos) {
        innerHTML = '';
        inputVideoDeviceInfos.forEach((inputVideoDeviceInfo) => {
          var {kind, label, deviceId} = inputVideoDeviceInfo;
          var inputVideoDeviceInfoHTML = `
                kind: ${kind}
                label: ${label}
                deviceId: ${deviceId}
                <br/>
            `;
          innerHTML += inputVideoDeviceInfoHTML;
        });
      }
      inputVideoDeviceInfosElement.innerHTML = innerHTML;
    }

    function stopCamera () {
      cameraPhoto.stopCamera()
        .then(() => {
          console.log('Camera stoped!');
        })
        .catch((error) => {
          console.log('No camera to stop!:', error);
        });
    }

    function startCameraMaxResolution () {
      var facingMode = facingModeSelectElement.value;
      cameraPhoto.startCameraMaxResolution(FACING_MODES[facingMode])
        .then(() => {
          var log =
              `Camera started with maximum resoluton and ` +
              `prefered facingMode : ${facingMode}`;
          console.log(log);
        })
        .catch((error) => {
          console.error('Camera not started!', error);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
      // update camera setting
      setInterval(() => {
        showCameraSettings();
      }, 500);

      // bind the buttons to the right functions.
      startCameraDefaultAllButtonElement.onclick = startCameraDefaultAll;
      startDefaultResolutionButtonElement.onclick = startCameraDefaultResolution;
      startMaxResolutionButtonElement.onclick = startCameraMaxResolution;
      takePhotoButtonElement.onclick = takePhoto;
      stopCameraButtonElement.onclick = stopCamera;
      showInputVideoDeviceInfosButtonElement.onclick = showInputVideoDeviceInfos;
    });