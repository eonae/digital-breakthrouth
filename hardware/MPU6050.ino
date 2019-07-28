#include <Wire.h>
#include <Kalman.h>
#include <SPI.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid     = "hackathon";
const char* password = "digital2019";

int status = WL_IDLE_STATUS;
IPAddress server(10, 30, 20, 53);

WiFiClient client;
HTTPClient http;

#define RESTRICT_PITCH

Kalman kalmanX;
Kalman kalmanY;


double accX, accY, accZ;
double gyroX, gyroY, gyroZ;
int16_t tempRaw;
double tempACCX = 0, tempACCY = 0, tempACCZ = 0;
double CalibCof = 20000;

double gyroXangle, gyroYangle; 
double compAngleX, compAngleY; 
double kalAngleX, kalAngleY; 

uint32_t timer;
uint8_t i2cData[14];

void setup() {
  Serial.begin(115200);
  Serial.println("Attempting to connect to WPA network...");
  Serial.print("SSID: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");

  client.connect(server, 60650);
  if (client.connected())
    Serial.println("connected");
  else
    Serial.println("connection faled");

  Wire.begin();
#if ARDUINO >= 157
  Wire.setClock(400000UL);
#else
  TWBR = ((F_CPU / 400000UL) - 16) / 2;
#endif

  i2cData[0] = 7;
  i2cData[1] = 0x00;
  i2cData[2] = 0x00;
  i2cData[3] = 0x00;
  while (i2cWrite(0x19, i2cData, 4, false));
  while (i2cWrite(0x6B, 0x01, true));

  while (i2cRead(0x75, i2cData, 1));
  if (i2cData[0] != 0x68) {
    Serial.print(F("Error reading sensor"));
    while (1);
  }
  delay(100);

  while (i2cRead(0x3B, i2cData, 6));
  accX = (int16_t)((i2cData[0] << 8) | i2cData[1]);
  accY = (int16_t)((i2cData[2] << 8) | i2cData[3]);
  accZ = (int16_t)((i2cData[4] << 8) | i2cData[5]);

#ifdef RESTRICT_PITCH 
  double roll  = atan2(accY, accZ) * RAD_TO_DEG;
  double pitch = atan(-accX / sqrt(accY * accY + accZ * accZ)) * RAD_TO_DEG;
#else
  double roll  = atan(accY / sqrt(accX * accX + accZ * accZ)) * RAD_TO_DEG;
  double pitch = atan2(-accX, accZ) * RAD_TO_DEG;
#endif

  kalmanX.setAngle(roll);
  kalmanY.setAngle(pitch);
  gyroXangle = roll;
  gyroYangle = pitch;
  compAngleX = roll;
  compAngleY = pitch;
  timer = micros();
}

void loop() {

  while (i2cRead(0x3B, i2cData, 14));
  accX = (int16_t)((i2cData[0] << 8) | i2cData[1]);
  accY = (int16_t)((i2cData[2] << 8) | i2cData[3]);
  accZ = (int16_t)((i2cData[4] << 8) | i2cData[5]);
  tempRaw = (int16_t)((i2cData[6] << 8) | i2cData[7]);
  gyroX = (int16_t)((i2cData[8] << 8) | i2cData[9]);
  gyroY = (int16_t)((i2cData[10] << 8) | i2cData[11]);
  gyroZ = (int16_t)((i2cData[12] << 8) | i2cData[13]);;
  double dt = (double)(micros() - timer) / 1000000;
  timer = micros();

#ifdef RESTRICT_PITCH
  double roll  = atan2(accY, accZ) * RAD_TO_DEG;
  double pitch = atan(-accX / sqrt(accY * accY + accZ * accZ)) * RAD_TO_DEG;
#else
  double roll  = atan(accY / sqrt(accX * accX + accZ * accZ)) * RAD_TO_DEG;
  double pitch = atan2(-accX, accZ) * RAD_TO_DEG;
#endif

  double gyroXrate = gyroX / 131.0; // Преобразование в град/с
  double gyroYrate = gyroY / 131.0;

#ifdef RESTRICT_PITCH
  // Устранение проблемы перехода, когда угол акселерометра скачет между -180 и 180 градусами
  if ((roll < -90 && kalAngleX > 90) || (roll > 90 && kalAngleX < -90)) 
    {
    kalmanX.setAngle(roll);
    compAngleX = roll;
    kalAngleX = roll;
    gyroXangle = roll;
    } 
  else
    kalAngleX = kalmanX.getAngle(roll, gyroXrate, dt); // Вычисление угла с помощью фильтра Калмана

  if (abs(kalAngleX) > 90)
    gyroYrate = -gyroYrate;
    kalAngleY = kalmanY.getAngle(pitch, gyroYrate, dt);
#else
  // Устранение проблемы перехода, когда угол акселерометра скачет между -180 и 180 градусами  
  if ((pitch < -90 && kalAngleY > 90) || (pitch > 90 && kalAngleY < -90))
  {
    kalmanY.setAngle(pitch);
    compAngleY = pitch;
    kalAngleY = pitch;
    gyroYangle = pitch;
  } 
  else
    kalAngleY = kalmanY.getAngle(pitch, gyroYrate, dt); // Вычисление угла с помощью фильтра Калмана

  if (abs(kalAngleY) > 90)
    gyroXrate = -gyroXrate;
    kalAngleX = kalmanX.getAngle(roll, gyroXrate, dt); // Вычисление угла с помощью фильтра Калмана
  #endif

  gyroXangle += gyroXrate * dt; 
  gyroYangle += gyroYrate * dt;

  compAngleX = 0.93 * (compAngleX + gyroXrate * dt) + 0.07 * roll; 
  compAngleY = 0.93 * (compAngleY + gyroYrate * dt) + 0.07 * pitch;

  if (gyroXangle < -180 || gyroXangle > 180)
    gyroXangle = kalAngleX;
  if (gyroYangle < -180 || gyroYangle > 180)
    gyroYangle = kalAngleY;

  if (accX < tempACCX + CalibCof && accX > tempACCX - CalibCof)
  {
    digitalWrite(13, LOW);
  }
  else
  {
    //в случае встряски посылаем сообщение серверу
    // посылаем HTTP-запрос:
    Serial.println("send warning");
    http.begin("http://10.30.20.53:60650/api/test/WARNING_cargo_at_risk");
    int httpcode = http.GET();
    Serial.print("Error code: ");
    Serial.println(httpcode);
    http.end();
    delay(2000);
  }
  
#if 1 
  Serial.print("X=");
  Serial.print(accX); Serial.print("\t");
  tempACCX = accX;
  Serial.print("Y=");
  Serial.print(accY); Serial.print("\t");
  tempACCY = accY;
  Serial.print("Z=");
  Serial.print(accZ); Serial.print("\t");
  tempACCZ = accZ;
  Serial.print("\t");
#endif

  Serial.print("\r\n");
  delay(100);
}
