---
title: "Bare-Metal Sensor Fusion on STM32: From IMU Registers to Browser 3D Telemetry"
summary: "Building a zero-latency flight telemetry pipeline: configuring MPU6050 sensor ranges on an STM32 Blue Pill, integrating gyro rates for 3D attitude, bypassing missing adapters with a hijacked Arduino Uno USB-UART bridge, and streaming real-time orientation into Three.js via the Web Serial API."
date: 2026-11-11
tags: ["Embedded"]
---

When developing flight controllers and robotic gimbals, acquiring real-time spatial attitude—pitch, roll, and yaw—is a foundational requirement. Many hobby projects rely on bulky desktop Python scripts or intermediary native software to visualize telemetry.

In the **STM32 Flight Telemetry** project, my objective was to construct a responsive, zero-latency telemetry pipeline connecting bare microcontroller hardware directly to a 3D browser visualizer:

1. Interface an **STM32F103C8T6** ("Blue Pill") ARM Cortex-M3 microcontroller with an **InvenSense MPU6050** 6-axis IMU over I2C.
2. Configure digital low-pass filtering and sensitivity ranges on the IMU for minimal phase delay.
3. Compute pitch and roll from accelerometer gravity vectors and integrate gyroscope angular velocity for yaw over discrete time steps (`dt`).
4. Overcome missing hardware by hijacking an Arduino Uno's onboard USB-to-TTL chip as a transparent 115,200 baud serial bridge.
5. Ingest the serial stream directly inside Google Chrome using the browser's native **Web Serial API**.
6. Render the physical board's orientation in real time with **Three.js**.

Here is how each layer of the pipeline was constructed.

---

## 1. Sensor Configuration & Kinematic Calculations

The sensor platform pairs an **STM32F103C8T6** (72MHz ARM Cortex-M3) with an **MPU6050** containing a 3-axis accelerometer and 3-axis gyroscope.

In `firmware/MPU_STMbp_Flight_telemetry/MPU_STMbp_Flight_telemetry.ino`, the sensor is configured during setup:

```cpp
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

Adafruit_MPU6050 mpu;

unsigned long lastTime = 0;
float yawAngle = 0.0;

void setup(void) {
  Serial1.begin(115200);
  delay(1000); 

  if (!mpu.begin()) {
    while (1) { delay(10); } 
  }
  
  // Set accelerometer range (+/- 8g) and gyro range (+/- 500 deg/s)
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  
  // Open up internal hardware low-pass filter to 44Hz to minimize input lag
  mpu.setFilterBandwidth(MPU6050_BAND_44_HZ); 

  delay(100);
  lastTime = millis();
}
```

By opening the digital filter bandwidth to 44Hz, high-frequency motor vibration is attenuated while avoiding the severe phase lag that narrower filters introduce.

---

## 2. Attitude Estimation & Gyro Integration

Inside the main execution loop, sensor readings are converted into spatial orientation angles:

1. **Pitch & Roll via Trigonometry**: Accelerometer vectors measure gravity direction:
   ```cpp
   float pitch = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
   float roll  = atan2(-a.acceleration.x, sqrt(a.acceleration.y * a.acceleration.y + 
                       a.acceleration.z * a.acceleration.z)) * 180.0 / PI;
   ```
2. **Yaw via Numerical Integration**: Since a 6-axis IMU lacks a magnetometer to measure absolute heading, yaw is computed by integrating the z-axis gyroscope angular rate across the loop duration `dt`:
   ```cpp
   unsigned long currentTime = millis();
   float dt = (currentTime - lastTime) / 1000.0; // Seconds elapsed
   lastTime = currentTime;

   // Integrate gyro angular rate
   yawAngle += (g.gyro.z * 180.0 / PI) * dt;
   ```
3. **High-Rate Output**: The formatted attitude packet is transmitted over USART1 at 100Hz:
   ```cpp
   Serial1.print(pitch);
   Serial1.print(",");
   Serial1.print(roll);
   Serial1.print(",");
   Serial1.println(yawAngle);

   delay(10); // 100 updates per second
   ```

---

## 3. The Hardware Bridge Hack: Hijacking an Arduino Uno

When building the testbed, I lacked a dedicated FTDI or CP2102 USB-to-UART converter to interface the STM32's hardware serial pins (`PA9`/`PA10`) with my development computer.

Rather than waiting for components to ship, I implemented a zero-cost hardware bypass using a spare **Arduino Uno**:

1. Tie the Arduino's `RESET` pin directly to `GND`. This disables the ATmega328P microcontroller, holding its I/O lines in a high-impedance state.
2. Connect STM32 `PA9` (USART1 TX) to Arduino `Pin 0` (RX).
3. Connect STM32 `PA10` (USART1 RX) to Arduino `Pin 1` (TX).
4. Connect common ground between boards.

The onboard ATmega16U2 USB-to-Serial converter on the Arduino Uno now acts as a high-speed, transparent 115,200 baud USB-UART adapter, delivering STM32 serial packets straight to the PC USB port.

---

## 4. Web Serial API: Direct Hardware-to-Browser Ingestion

Traditionally, reading a COM port requires writing a native desktop application in Python, C++, or Electron. Instead, modern browsers provide the **Web Serial API** (`navigator.serial`), enabling web applications to communicate directly with microcontrollers:

```javascript
// Request USB serial port from user
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 115200 });

const textDecoder = new TextDecoderStream();
const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
const reader = textDecoder.readable.getReader();

let buffer = '';
while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    let lines = buffer.split('\n');
    buffer = lines.pop(); // Retain partial packet

    for (const line of lines) {
        const parts = line.trim().split(',');
        if (parts.length === 3) {
            const pitch = parseFloat(parts[0]);
            const roll  = parseFloat(parts[1]);
            const yaw   = parseFloat(parts[2]);
            if (!isNaN(pitch) && !isNaN(roll) && !isNaN(yaw)) {
                updateVisualizer(pitch, roll, yaw);
            }
        }
    }
}
```

This architecture completely eliminates native desktop dependencies, allowing any computer with a Chromium browser to function as a live telemetry ground station.

---

## 5. Real-Time 3D Rendering with Three.js

In the frontend (`index.html`), the incoming orientation angles are bound directly to a 3D model:

```javascript
function updateVisualizer(pitchDeg, rollDeg, yawDeg) {
    // Convert degrees to radians
    const pitchRad = (pitchDeg * Math.PI) / 180;
    const rollRad  = (rollDeg  * Math.PI) / 180;
    const yawRad   = (yawDeg   * Math.PI) / 180;

    // Apply Euler rotation in Y-X-Z order
    model.rotation.set(pitchRad, yawRad, rollRad, 'YXZ');
}
```

The resulting dashboard delivers fluid, responsive 60 FPS 3D tracking that mirrors the physical movement of the STM32 board with minimal input latency.

All firmware files, circuit wiring diagrams (`assets/Circuit.png`), and the dashboard code are openly available in the GitHub repository.

[← back to writings](/blog)
