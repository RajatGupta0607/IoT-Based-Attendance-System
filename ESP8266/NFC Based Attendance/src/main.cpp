#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

// Initialize I2C communication with PN532
PN532_I2C pn532i2c(Wire);
PN532 nfc(pn532i2c);

void setup(void) {
  Serial.begin(9600);
  Serial.println("Hello!");

  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }

  // Print chip information
  Serial.print("Found chip PN5");
  Serial.println((versiondata >> 24) & 0xFF, HEX);
  Serial.print("Firmware ver. ");
  Serial.print((versiondata >> 16) & 0xFF, DEC);
  Serial.print('.');
  Serial.println((versiondata >> 8) & 0xFF, DEC);

  // Set the max retry attempts to read a card
  nfc.setPassiveActivationRetries(0xFF);
  
  // Configure NFC board to read RFID tags
  nfc.SAMConfig();

  Serial.println("Waiting for an ISO14443A card");
}

void loop(void) {
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store UID
  uint8_t uidLength;  // Length of UID (4 or 7 bytes)

  // Check for NFC card
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  
  if (success) {
    Serial.println("Found a card!");
    Serial.print("UID Length: ");
    Serial.print(uidLength, DEC);
    Serial.println(" bytes");

    Serial.print("UID Value: ");
    String hex_value = "";

    for (uint8_t i = 0; i < uidLength; i++) {
      Serial.print(" 0x");
      Serial.print(uid[i], HEX);
      hex_value += (String)uid[i];
    }
    
    Serial.println(", value=" + hex_value);

    // Compare with predefined card UIDs
    if (hex_value == "16517722582") {
      Serial.println("This is Key Tag.");
    } else if (hex_value == "230522426") {
      Serial.println("This is Card Tag.");
    } else if (hex_value == "63156295") {
      Serial.println("This is Phone Tag.");
    } else {
      Serial.println("I don't know.");
    }

    Serial.println("");
    delay(1000);  // Wait 1 second before scanning again
  } else {
    Serial.println("Waiting for a card...");
  }
}
