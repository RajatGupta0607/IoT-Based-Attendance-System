#include <Wire.h>
#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  Wire.begin(D2, D1);  // ESP8266 I2C Pins: SDA → D2 (GPIO4), SCL → D1 (GPIO5)
  Serial.println("\n🔄 I2C Scanner Starting...");
}

void loop() {
  byte error, address;
  int nDevices = 0;
  Serial.println("🔍 Scanning for I2C devices...");

  for (address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("✅ I2C device found at address 0x");
      Serial.println(address, HEX);
      nDevices++;
    }
  }

  if (nDevices == 0) {
    Serial.println("❌ No I2C devices found!");
  } else {
    Serial.println("✅ Done.");
  }

  delay(5000);
}
