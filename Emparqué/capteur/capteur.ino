const int trigPin = 5;
const int echoPin = 18;

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
  /***D***/
  pinMode(16, OUTPUT); // Sets the Led as an Output
  pinMode(17, OUTPUT); // Sets the Led as an Output
  /***D1***/
  pinMode(12, OUTPUT); // Sets the Led as an Output
  pinMode(14, OUTPUT); // Sets the Led as an Output
  /***D2***/
  pinMode(32, OUTPUT); // Sets the Led as an Output
  pinMode(33, OUTPUT); // Sets the Led as an Output
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

  pinMode(trigPin1, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin1, INPUT); // Sets the echoPin as an Input

  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin2, INPUT); // Sets the echoPin as an Input
}
void loop() {

  /******************************************************************************/
  
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
    digitalWrite(17, HIGH);
    digitalWrite(16, LOW);
  }
  else
  {
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
    digitalWrite(14, HIGH);
    digitalWrite(12, LOW);
  }
  else
  {
    digitalWrite(14, LOW);
    digitalWrite(12, HIGH);
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
    digitalWrite(32, HIGH);
    digitalWrite(33, LOW);
  }
  else
  {
    digitalWrite(32, LOW);
    digitalWrite(33, HIGH);
  }
  
  /******************************************************************************/
  delay(1000);
}
