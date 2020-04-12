<template>
  <div class="page-cntr col center">
    <div class="section__head">
      Scan Pass
    </div>
    <div class="qr_code-wrap col center">
      <div class="qr_code-placeholder-cntr col center" v-if="showPlaceholder" @click="toggleCamera">
        <!-- <div class="qr_code-placeholder-label">
          Camera is disabled.
        </div> -->
        <div class="btn_camera-on">
          Tap to scan
        </div>
      </div>
      <div class="qr_code-cntr col center" v-if="isCameraOn || isProcessingQR">
        <qrcode-stream class="qr_code-stream" :camera="camera" @decode="onDecode" @init="onInit">
        </qrcode-stream>
        <div class="loading-label">
          Loading...
        </div>
        <div v-if="showOverlay" class="qr_code-overlay-cntr col center">
          <div class="qr_code-overlay-text qr_code-overlay--verifying">
            {{overlayStatusText}}
          </div>
        </div>
        <div :class="{'is_validating': showOverlay}" class="qr_code-footer row pull-apart">
          <div class="qr_code-status qr_code-status--scanning">Scanning</div>
          <div class="qr_code-location">Brgy. Taculing</div>
        </div>
      </div>
      <div class="page-actions">
        <div v-if="isCameraOn" class="btn btn-secondary" @click="toggleCamera">
          Turn off camera
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

  export default {
    name: "scan-pass",
    components: {
      QrcodeStream,
      QrcodeDropZone,
      QrcodeCapture
    },
   data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      overlayStatusText: 'Loading...',
      showOverlayStatus: false,
      isCameraOn: false,
      isProcessingQR: false,
    }
  },

  computed: {
    validationPending () {
      let status = this.isValid === undefined && this.camera === 'off';

      if(status) {
        this.overlayStatusText = 'Verifying...';
      }

      return status;
    },

    validationSuccess () {
      let status = this.isValid === true;

      if(status) {
        this.overlayStatusText = 'Success';
      }

      return status;
    },

    validationFailure () {
      let status = this.isValid === false;

      if(status) {
        this.overlayStatusText = 'Failed';
      }

      return status;
    },

    showOverlay () {
      return this.validationPending | this.validationSuccess | this.validationFailure | this.showOverlayStatus;
    },

    showPlaceholder () {
      if(!this.isCameraOn && !this.isProcessingQR) {
        return true;
      }
      return false;
    },

    cameraBtnLabel () {
      if(this.isCameraOn) {
        return 'Turn off camera';
      }else {
        return 'Turn on camera';
      }
    }
  },

  methods: {
    onInit (promise) {
      if(this.camera == 'auto') {
        this.isCameraOn = true;
      }
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },

    toggleCamera () {
      this.isCameraOn = !this.isCameraOn;
      if(this.isCameraOn) {
        this.turnCameraOn()
      } else {
        this.turnCameraOff()
      }
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      let data;
      let firstName;
      let lastName;
      let homePassId;
      let barangay;
      this.result = content
      this.isProcessingQR = true;
      this.turnCameraOff()

      this.isValid = true;

      try {
        const passParameters = this.result.split(",");
        data = this.result

        if(passParameters.length == 4) {
          const onePasskey = passParameters[0];
          const firstName = passParameters[1];
          const lastName = passParameters[2];
          const barangay = passParameters[3];

          console.log(onePasskey, firstName, lastName, barangay);
        } else {
          throw 'Invalid number of pass parameters.'
        }
      } catch (error) {
        console.error('Something went wrong. Please try again.', error);
      }


      await this.timeout(2000)
      this.showOverlayStatus = false;

      this.isProcessingQR = false;
      this.overlayStatusText = 'Loading...';
    },

    turnCameraOn () {
      this.isCameraOn = true,
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.isCameraOn = false,
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>


<style lang="scss" scoped>
  .qr_code-placeholder-cntr {
    background-color: $color__black;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    min-height: 390px;
    width: 100%;
    height: 100%;
  }
  .qr_code-wrap {
    max-width: 520px;
    width: 100%;
  }
  .qr_code-cntr {
    width: 100%;
    min-height: 120px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: $shadow__natural--low_contrast;
    position: relative;
  }
  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .8);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  .validation-success {
    color: green;
  }
  .validation-failure {
    color: red;
  }
  .qr_code-stream {
    z-index: 2;
  }
  .qr_code-footer {
    width: 100%;
    backdrop-filter: blur(18px);
    position: absolute;
    background-color: rgba(255, 255, 255, .1);
    z-index: 9;
    padding: $space__base-1 $space__base-3;
    bottom: 0;
    font-weight: 600;
    font-size: 14px;
    &.is_validating {
      backdrop-filter: none;
      background-color: transparent;
    }
  }
  .qr_code-location {
    color: $color__slate-2;
  }
  .qr_code-overlay-cntr {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(18px);
    position: absolute;
    background-color: rgba(255, 255, 255, .1);
    z-index: 9;
    padding: $space__base-1 $space__base-3;
    bottom: 0;
  }
  .qr_code-overlay-text {
    font-weight: 600;
    font-size: 28px;
  }
  .qr_code-overlay--verifying {
    color: white;
  }
  .overlay {
    z-index: 1;
  }
  .page-actions {
    margin: $space__base-4 0;
  }
  .qr_code-placeholder-label {
    font-size: 20px;
    // font-weight: 500;
    color: $color__slate-gray;
  }
  .btn_camera-on {
    font-size: 28px;
    font-weight: 500;
    color: $color__green-primary;
  }
  .loading-label {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: 500;
    font-size: 20px;
    color: $color__slate-1;
    transform: translate(-50%, -50%);
  }
</style>
