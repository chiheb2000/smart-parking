#include <Servo.h>
Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position
#define IR_output 4

void setup() {
  pinMode(IR_output,INPUT);  
  Serial.begin(9600); // Starts the serial communication
  myservo.attach(3);  // attaches the servo on pin 13 to the servo object
  myservo.write(0); // positionne le servomoteur à 0°
}

void loop() {
  if(digitalRead(IR_output)==HIGH){
    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
      // in steps of 1 degree
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
    Serial.println("mouvement detecte");
    delay(3000);     

    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      myservo.write(pos);              // tell servo to go to position in variable 'pos'
      delay(15);                       // waits 15ms for the servo to reach the position
    }
  }
  if(digitalRead(IR_output)==LOW){
    Serial.println("pas de mouvement detecte");
  } 
  delay(3000);
}
