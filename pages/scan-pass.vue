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
      <div class="qr_code-cntr col center" v-if="isCameraOn || isProcessingQR || showScanDetails">
        <qrcode-stream class="qr_code-stream" :camera="camera" @decode="onDecode" @init="onInit">
        </qrcode-stream>
        <div class="loading-label">
          Loading...
        </div>
        <div v-if="showOverlay" class="qr_code-overlay-cntr col center">
          <div class="qr_code-overlay-text qr_code-overlay--verifying row center">
            <div v-if="showScanDetails" class="scan_details-overlay-cntr col pull-start">
              <div class="scan_details-name-cntr row pull-start">
                <div class="scan_details-last-name">
                  {{scanLastName}},
                </div>
                <div class="scan_details-first-name">
                  {{scanFirstName}}
                </div>
              </div>
              <div class="btn-actions-cntr">
                <button
                  :class="{
                    'btn-loading': ctaStatus == 'sending',
                    'btn-success': ctaStatus == 'success',
                    'btn-error': ctaStatus == 'error',
                    'btn-disabled': ctaStatus != ''
                  }"
                  :disabled=submitIsDisable
                  class="btn btn-accent"
                  @click.prevent="approvePass()">
                  <LoadingSpinner v-if="ctaStatus == 'sending'"></LoadingSpinner>
                  <div class=" btn-label row center" v-if="ctaStatus == ''">
                    <span>Check-out</span>
                  </div>
                  <div class="btn-label row center" v-if="ctaStatus == 'success'">
                    <svg class="success" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1748 23.9528C18.5849 23.9528 23.8584 18.6793 23.8584 12.2692C23.8584 5.85901 18.5849 0.585571 12.1748 0.585571C5.76461 0.585571 0.491173 5.85901 0.491173 12.2692C0.491173 18.6793 5.76461 23.9528 12.1748 23.9528ZM10.6865 18.2106C10.206 18.2106 9.80758 17.9879 9.47945 17.6012L6.29195 13.7926C6.04586 13.5114 5.94039 13.2184 5.94039 12.902C5.94039 12.2223 6.50289 11.6832 7.15914 11.6832C7.55758 11.6832 7.86227 11.8473 8.15524 12.1871L10.663 15.2457L15.456 7.62854C15.749 7.17151 16.1005 6.93713 16.5341 6.93713C17.1787 6.93713 17.788 7.40588 17.788 8.08557C17.788 8.36682 17.6591 8.67151 17.4834 8.95276L11.8701 17.5543C11.5771 17.9762 11.1552 18.2106 10.6865 18.2106Z" fill="black"/>
                    </svg>
                    <span>Check-out Successful</span>
                  </div>
                  <div class="btn-label row center" v-if="ctaStatus == 'error'">
                    <svg class="error" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6641 23.6914C19.0742 23.6914 24.3477 18.418 24.3477 12.0078C24.3477 5.59766 19.0742 0.324219 12.6641 0.324219C6.25391 0.324219 0.980469 5.59766 0.980469 12.0078C0.980469 18.418 6.25391 23.6914 12.6641 23.6914ZM8.99609 16.8945C8.30469 16.8945 7.76562 16.3555 7.76562 15.6523C7.76562 15.3359 7.89453 15.0312 8.14062 14.7969L10.918 12.0195L8.14062 9.23047C7.90625 8.99609 7.76562 8.70312 7.76562 8.375C7.76562 7.68359 8.30469 7.14453 8.99609 7.14453C9.37109 7.14453 9.65234 7.26172 9.88672 7.50781L12.6641 10.2734L15.4531 7.49609C15.6992 7.25 15.9805 7.13281 16.3438 7.13281C17.0352 7.13281 17.5742 7.67188 17.5742 8.375C17.5742 8.69141 17.4453 8.98438 17.1992 9.21875L14.4219 12.0195L17.1992 14.7852C17.4336 15.0312 17.5625 15.3242 17.5625 15.6523C17.5625 16.3555 17.0234 16.8945 16.332 16.8945C15.957 16.8945 15.6641 16.7656 15.4297 16.5312L12.6641 13.7773L9.89844 16.5312C9.66406 16.7773 9.37109 16.8945 8.99609 16.8945Z" fill="black"/>
                    </svg>
                    <span>
                      Something went wrong. Please try again.
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <template v-if="!showScanDetails">
              {{overlayStatusText}}
            </template>
          </div>
        </div>
        <div :class="{'is_validating': showOverlay}" class="qr_code-footer row pull-apart">
          <div class="qr_code-status qr_code-status--scanning">
            <template v-if="!showScanDetails">
              Scanning
            </template>
            <template v-if="showScanDetails">
              Authenticated
            </template>
          </div>
          <div class="qr_code-location">Brgy. {{scanBarangay}}</div>
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
  import {env} from '~/plugins/env.js'

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
      showScanDetails: false,
      scanFirstName: null,
      scanLastName: null,
      scanPassType: null,
      scanOnePassKey: null,
      scanBarangay: env.sample_barangay,
      ctaStatus: '',
      submitIsDisable: false
    }
  },

  computed: {
    validationPending () {
      let status = this.isValid === undefined && this.camera === 'off';

      if(status) {
        this.overlayStatusText = 'Authenticating...';
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
      return this.validationPending | this.validationSuccess | this.validationFailure | this.showOverlayStatus | this.showScanDetails;
    },

    showPlaceholder () {
      if(!this.isCameraOn && !this.isProcessingQR && !this.showScanDetails) {
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

    approvePass () {
      let requestOptions = {
        "one_pass_key": this.scanOnePassKey,
        "pass_type": this.scanPassType
      }

      let additionalOptions = {};

      if(this.scanPassType == 'check_out') {
        additionalOptions = {
          "barangay": this.scanBarangay,
          "holder": {
            "first_name": this.scanFirstName,
            "last_name": this.scanLastName
          },
          "purpose": "Buy Medicine",
        }
      }

      requestOptions = {...requestOptions, ...additionalOptions};
      console.log('requestOptions', requestOptions);
      this.$axios
        .post('/approve-pass', {
          "data": requestOptions
        })
        .catch(e => {
          console.error('ERROR', e);
          return Promise.reject(e)
        })
        .then(response => {
          if(response.data.success) {
            const data = response.data.data;
            const updateTime = data.update_time;

            console.log('Check out success');

            this.showScanDetails = false;
          }
          console.log(response.data);
        })
        .catch(e => {
          return Promise.reject(e)
        })
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

      this.showScanDetails = false;

      try {
        const passParameters = this.result.split(",");
        data = this.result

        if(passParameters.length == 4) {
          const onePasskey = passParameters[0];
          const firstName = passParameters[1];
          const lastName = passParameters[2];
          const barangay = passParameters[3];

          this.$axios
            .post('/verify-pass', {
              "data": {
                "one_pass_key": onePasskey,
                "barangay": barangay,
                "first_name": firstName,
                "last_name": lastName
              }
            })
            .catch(e => {
              return Promise.reject(e)
            })
            .then(response => {
              if(response.data.success) {
                const data = response.data.data;
                const firstName = data.holder.first_name;
                const lastName = data.holder.last_name;
                const passType = data.pass_type;

                this.showScanDetails = true;

                console.log('show scan details');

                this.scanFirstName = firstName;
                this.scanLastName = lastName;
                this.scanPassType = passType;
                this.scanOnePassKey = onePasskey;
              }
            })
            .catch(e => {
              return Promise.reject(e)
            })
        } else {
          throw 'Invalid number of pass parameters.'
        }

        this.isValid = true;
      } catch (error) {
        console.error('Something went wrong. Please try again.', error);

        this.isValid = false;
      }

      await this.timeout(2000)
      this.showOverlayStatus = true;


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
    width: 100%;
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
  .scan_details-overlay-cntr {
    width: 100%;
    padding: $space__base-4 $space__base-5;
    background-color: rgba(0,0,0,.55);
    border-radius: $border_radius-1;
  }
  .scan_details-name-cntr {
    font-size: 28px;
    font-weight: 600;
    color: $color__green-primary;
  }
  .scan_details-last-name {
    margin-right: $space__base-2;
  }
  button {
    svg {
      flex-shrink: 0;
      margin-right: $space__base-2;
      &.submit {
        path {
          fill: #ffffff
        }
      }
      &.success {
        path {
          fill: $color__green-primary
        }
      }
      &.error {
        path {
          fill: $color__red-secondary
        }
      }
    }
  }

  .btn {
    width: 100%;
    padding: 14px 16px;
  }

  button + button {
    margin-top: $space__base-3;
  }

  .btn-label {
    font-size: 18px;
  }

  .btn-actions-cntr {
    width: 100%;
    margin-top: $space__base-5
  }
</style>
