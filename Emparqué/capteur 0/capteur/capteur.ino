/*********
  Rui Santos
  Complete project details at https://Raspberryme.com/esp32-hc-sr04-ultrasonic-arduino/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*********/
const int trigPin = 5;
const int echoPin = 18;
const int ledPin = 16;  // 16 corresponds to GPIO16
const int ledPin2 = 17; // 17 corresponds to GPIO17

const int trigPin1 = 26;
const int echoPin1 = 27;

const int trigPin2 = 22;
const int echoPin2 = 23;

//define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701
long duration;
float distanceCm;

long duration1;
float distanceCm1;

long duration2;
float distanceCm2;
//float distanceInch;
void setup() {
  Serial.begin(115200); // Starts the serial communication
  pinMode(16, OUTPUT); // Sets the trigPin as an Output
  pinMode(17, OUTPUT); // Sets the trigPin as an Output
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  pinMode(trigPin1, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin1, INPUT); // Sets the echoPin as an Input

  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin2, INPUT); // Sets the echoPin as an Input
}
void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_SPEED/2;
  
  // Convert to inches
  //distanceInch = distanceCm * CM_TO_INCH;
  
  // Prints the distance in the Serial Monitor
  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);
  if(distanceCm < 5)
  {
    Serial.println("Close");
    digitalWrite(17, HIGH);
    digitalWrite(16, LOW);
  }
  else
  {
    Serial.println("Away");
    digitalWrite(17, LOW);
    digitalWrite(16, HIGH);
  }
  /*Serial.print("Distance (inch): ");
  Serial.println(distanceInch);*/
  /******************************************************************************/
// Clears the trigPin
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration1 = pulseIn(echoPin1, HIGH);
  
  // Calculate the distance
  distanceCm1 = duration1 * SOUND_SPEED/2;
  
  // Prints the distance in the Serial Monitor
  Serial.print("Distance1 (cm): ");
  Serial.println(distanceCm1);
  if(distanceCm1 < 5)
  {
    Serial.println("Close");
    digitalWrite(17, HIGH);
    digitalWrite(16, LOW);
  }
  else
  {
    Serial.println("Away");
    digitalWrite(17, LOW);
    digitalWrite(16, HIGH);
  }
  /******************************************************************************/
// Clears the trigPin
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration2 = pulseIn(echoPin2, HIGH);
  
  // Calculate the distance
  distanceCm2 = duration2 * SOUND_SPEED/2;
  
  // Prints the distance in the Serial Monitor
  Serial.print("Distance2 (cm): ");
  Serial.println(distanceCm2);
  if(distanceCm2 < 5)
  {
    Serial.println("Close");
    digitalWrite(17, HIGH);
    digitalWrite(16, LOW);
  }
  else
  {
    Serial.println("Away");
    digitalWrite(17, LOW);
    digitalWrite(16, HIGH);
  }
  /******************************************************************************/
  delay(1000);
}
