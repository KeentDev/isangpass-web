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
        <div class="overlay-label">
          <div class="loading-label" v-if="errorMsg == ''">
            Loading...
          </div>
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
                <OPCtaButton
                  :status="ctaStatus"
                  @btnClick="approvePass"
                  :btnLabel="ctaLabel"
                  :successMsg="successMsg"
                  :errorMsg="ctaErrorMsg">
                  <template v-slot:label-icon></template>
                </OPCtaButton>
              </div>
            </div>
            <template v-if="!showScanDetails && !errorMsg">
              {{overlayStatusText}}
            </template>
            <div class="error-msg-cntr col center" v-if="errorMsg != ''">
              <div class="error-msg">
                {{errorMsg}}
              </div>
              <button
                class="error-msg-cancel btn btn-secondary"
                @click="cancelError"
              >Scan</button>
            </div>
          </div>
        </div>
        <div :class="{'is_validating': showOverlay}" class="qr_code-footer row pull-apart">
          <div class="qr_code-status qr_code-status--scanning">
            {{scanFooterLabel}}
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
  import OPCtaButton from '~/components/OPCtaButton'

  export default {
    name: "scan-pass",
    components: {
      QrcodeStream,
      QrcodeDropZone,
      QrcodeCapture,
      OPCtaButton
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
      submitIsDisable: false,
      ctaLabel: '',
      successMsg: 'Success',
      errorMsg: '',
      scanFooterLabel: 'Scanning',
      ctaErrorMsg: null
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

    async approvePass () {
      let requestOptions = {
        "one_pass_key": this.scanOnePassKey,
        "pass_type": this.scanPassType
      }

      this.ctaStatus = 'sending';

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

      await this.$axios
        .post('/approve-pass', {
          "data": requestOptions
        })
        .catch(e => {
          console.error('ERROR', e);
          return Promise.reject(e)
        })
        .then(async response => {
          if(response.data.success) {
            const data = response.data.data;
            const updateTime = data.update_time;

            this.ctaStatus = 'success';
            return Promise.resolve({duration: 1500, showDetails: false});
          }else {
            this.ctaStatus = 'error';
            return Promise.reject(response.data.error.error_msg);
          }
        })
        .catch(e => {
          this.ctaStatus = 'error';
          this.ctaErrorMsg = e;
          console.error(e);
          return Promise.resolve({duration: 3000, showDetails: true});
        })
        .then(async (options) => {
          await setTimeout(() => {
            this.ctaStatus = '';
            this.successMsg = 'Success';
            this.ctaErrorMsg = '';
            this.showScanDetails = options.showDetails;
          }, options.duration || 2500);
        });
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

      this.scanFooterLabel = 'Authenticating';
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
            .then(async response => {
              if(response.data.success) {
                const data = response.data.data;
                const firstName = data.holder.first_name;
                const lastName = data.holder.last_name;
                const passType = data.pass_type;

                this.showScanDetails = true;

                if(passType == 'check_out') {
                  this.ctaLabel = 'Check-out';
                  this.successMsg = 'Check-out successful';
                }else if (passType == 'check_in') {
                  this.ctaLabel = 'Check-in';
                  this.successMsg = 'Check-in successful';
                }

                this.scanFirstName = firstName;
                this.scanLastName = lastName;
                this.scanPassType = passType;
                this.scanOnePassKey = onePasskey;
                this.scanFooterLabel = 'Authenticated';

                await this.timeout(5000)

                this.showOverlayStatus = false;
                this.isProcessingQR = false;

                return Promise.resolve();
              }else {
                return Promise.reject(response.data.error.error_msg);
              }
            })
            .catch(e => {
              throw e
            })
        } else {
          throw 'Invalid number of pass format.'
        }

        this.isValid = true;
      } catch (error) {
        console.error('Something went wrong. Please try again.', error);
        this.scanFooterLabel = 'Scan failed.';
        this.errorMsg = error;
        this.isValid = false;
      }
      this.overlayStatusText = 'Loading...';
    },

    cancelError () {
      this.errorMsg = '';
      this.showOverlayStatus = false;
      this.isProcessingQR = false;
      this.toggleCamera();
    },

    turnCameraOn () {
      this.isCameraOn = true,
      this.camera = 'auto'
      this.scanFooterLabel = 'Scanning';
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
    color: $color__slate-gray;
  }
  .btn_camera-on {
    font-size: 28px;
    font-weight: 500;
    color: $color__green-primary;
  }
  .loading-label {
    color: $color__slate-1;
  }
  .overlay-label {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: 500;
    font-size: 20px;
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

  .error-msg-cntr {
    width: 100%;
    padding: $space__base-4 $space__base-5;
    background-color: rgba(0,0,0,.55);
    border-radius: $border_radius-1;
    color: $color__red-secondary;
    font-size: 24px;
    font-weight: 600;
  }

  .error-msg-cancel {
    margin-top: $space__base-3;
  }
</style>
