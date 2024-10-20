<template>
  <div>
    <h2>Scan QR code</h2>
    <video
      ref="video"
      width="300"
      height="300"
      style="border: 1px solid black"
    ></video>
    <p v-if="result">Scanned Result: {{ result }}</p>
  </div>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/browser";

export default {
  data() {
    return {
      result: null,
    };
  },
  mounted() {
    this.startScanner();
  },
  methods: {
    async startScanner() {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const videoElement = this.$refs.video;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoElement.srcObject = stream;
        videoElement.play();

        codeReader.decodeFromVideoElement(videoElement, (result, error) => {
          if (result) {
            this.result = result.text; // QR code data 
          }
        });
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    },
  },
};
</script>
