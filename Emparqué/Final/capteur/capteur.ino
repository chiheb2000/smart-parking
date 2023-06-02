#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "iPhone";
const char* password = "chiheb12";

//Your Domain name with URL path or IP address with path
const char* serverName = "http://172.20.10.4:3000/sensors";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

/****/
const int trigPin = 5;
const int echoPin = 18;

const int trigPin1 = 26;
const int echoPin1 = 27;

const int trigPin2 = 22;
const int echoPin2 = 23;

int nb = 0;
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
  /******/
  
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
  /******/
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
  nb = 0;
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
    nb = nb + 1;
    digitalWrite(17, HIGH);
    digitalWrite(16, LOW);
  }
  else
  {
   // nb = nb - 1;
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
    nb = nb + 1;
    digitalWrite(14, HIGH);
    digitalWrite(12, LOW);
  }
  else
  {
   // nb = nb - 1;
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
    nb = nb + 1;
    digitalWrite(32, HIGH);
    digitalWrite(33, LOW);
  }
  else
  {
    // nb = nb - 1;
    digitalWrite(32, LOW);
    digitalWrite(33, HIGH);
  }
  
  Serial.println(nb);
  /******************************************************************************/
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      
      // Data to send with HTTP POST
      //String httpRequestData = "api_key=tPmAT5Ab3j7F9&sensor=BME280&name=24.25&email=49.54&msg=1005.14";           
      // Send HTTP POST request
      //int httpResponseCode = http.POST(httpRequestData);
      
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
           
      //int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"nbdispo\":\"0\"}");



      if (nb == 0 ){
      int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"nbdispo\":\"0\"}");
           Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      }
      
      if (nb == 1 ){
      int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"nbdispo\":\"1\"}");
           Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      }

            if (nb == 2 ){
      int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"nbdispo\":\"2\"}");
           Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      }

            if (nb == 3 ){
      int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\",\"sensor\":\"BME280\",\"nbdispo\":\"3\"}");
           Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      }
      

      // If you need an HTTP request with a content type: text/plain
      //http.addHeader("Content-Type", "text/plain");
      //int httpResponseCode = http.POST("Hello, World!");
     
    //  Serial.print("HTTP Response code: ");
   //   Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
  /************************************************/
  delay(1000);
}
