class ShakeDetector {
  private readonly shakeThreshold: number = 15
  private readonly shakeTimeout: number = 1000
  private lastShakeTime: number
  private readonly onShake: () => void

  constructor(onShake: () => void, shakeThreshold = 15, shakeTimeout = 1000) {
    this.shakeThreshold = shakeThreshold
    this.shakeTimeout = shakeTimeout
    this.lastShakeTime = 0
    this.onShake = onShake

    this.handleMotion = this.handleMotion.bind(this)
  }

  // Start listening to device motion events
  public start(): void {
    console.log(window.DeviceMotionEvent)
    if (typeof window !== "undefined" && window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", this.handleMotion)
    }
    else {
      console.warn("DeviceMotionEvent is not supported by this browser.")
    }
  }

  // Stop listening to device motion events
  public stop(): void {
    if (typeof window !== "undefined" && window.DeviceMotionEvent) {
      window.removeEventListener("devicemotion", this.handleMotion)
    }
  }

  private handleMotion(event: DeviceMotionEvent): void {
    // console.log("shaking")

    if (!event.accelerationIncludingGravity)
      return

    const {
      x,
      y,
      z,
    } = event.accelerationIncludingGravity

    // Calculate shake intensity
    const shakeIntensity = Math.sqrt(x! * x! + y! * y! + z! * z!)

    // Check if the shake intensity exceeds the threshold and cooldown period has passed
    const currentTime = Date.now()
    // console.log(shakeIntensity, this.shakeThreshold)
    // console.log(shakeIntensity, this.shakeThreshold)
    if (shakeIntensity > this.shakeThreshold && currentTime - this.lastShakeTime > this.shakeTimeout) {
      this.lastShakeTime = currentTime
      this.onShake() // Trigger shake event
    }
  }
}

export default ShakeDetector
