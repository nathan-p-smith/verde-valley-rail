CREATE DATABASE  IF NOT EXISTS `VerdeValleyRail` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `VerdeValleyRail`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: VerdeValleyRail
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `AddressId` int NOT NULL AUTO_INCREMENT,
  `Address1` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Address2` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `City` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `State` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Zipcode` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Lat` decimal(20,14) NOT NULL,
  `Lng` decimal(20,14) NOT NULL,
  PRIMARY KEY (`AddressId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (3,'2399 E Mingus Ave',NULL,'Cottonwood','AZ','86326',34.73939852766246,-112.00356881109356),(4,'900 AZ-89A',NULL,'Sedona','AZ','86336',34.87771183467230,-111.75190249563566),(5,'5955 S Kings Ranch Rd',NULL,'Gold Canyon','AZ','85118',33.36075076354271,-111.43925048048953),(6,'1000 N Opal Dr',NULL,'Prescott','AZ','86303',34.55943765087059,-112.37495009618200),(7,'2199 E Skyline D',NULL,'Flagstaff','AZ','86004',35.22452103022459,-111.61030387620022),(8,'1438 Desert Sky Dr',NULL,'Clarkdale','AZ','86324',34.75965902423583,-112.07557235427677);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Booking`
--

DROP TABLE IF EXISTS `Booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Booking` (
  `BookingId` int NOT NULL AUTO_INCREMENT,
  `TripId` int NOT NULL,
  `CustomerId` int NOT NULL,
  `BookingGuid` varchar(36) NOT NULL,
  PRIMARY KEY (`BookingId`),
  KEY `FK_Trip_idx` (`TripId`),
  KEY `FK_Customer_idx` (`CustomerId`),
  CONSTRAINT `FK_Booking_Customer` FOREIGN KEY (`CustomerId`) REFERENCES `Customer` (`CustomerId`),
  CONSTRAINT `FK_Booking_Trip` FOREIGN KEY (`TripId`) REFERENCES `Trip` (`TripId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Booking`
--

LOCK TABLES `Booking` WRITE;
/*!40000 ALTER TABLE `Booking` DISABLE KEYS */;
INSERT INTO `Booking` VALUES (1,2,1,'9561947f-2e59-11ee-9224-0242ac120002'),(2,2,1,'99e83344-2e59-11ee-9224-0242ac120002');
/*!40000 ALTER TABLE `Booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BookingSeat`
--

DROP TABLE IF EXISTS `BookingSeat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BookingSeat` (
  `BookingSeatId` int NOT NULL AUTO_INCREMENT,
  `BookingId` int NOT NULL,
  `SeatId` int NOT NULL,
  `CarId` int NOT NULL,
  PRIMARY KEY (`BookingSeatId`),
  KEY `FK_BookingId_idx` (`BookingId`),
  KEY `FK_Seat_idx` (`SeatId`),
  KEY `FK_BookingSeat_Car_idx` (`CarId`),
  CONSTRAINT `FK_BookingSeat_Booking` FOREIGN KEY (`BookingId`) REFERENCES `Booking` (`BookingId`),
  CONSTRAINT `FK_BookingSeat_Car` FOREIGN KEY (`CarId`) REFERENCES `Car` (`CarId`),
  CONSTRAINT `FK_BookingSeat_Seat` FOREIGN KEY (`SeatId`) REFERENCES `Seat` (`SeatId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BookingSeat`
--

LOCK TABLES `BookingSeat` WRITE;
/*!40000 ALTER TABLE `BookingSeat` DISABLE KEYS */;
INSERT INTO `BookingSeat` VALUES (1,1,131055,4),(2,1,131056,4),(3,2,131061,4);
/*!40000 ALTER TABLE `BookingSeat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Car`
--

DROP TABLE IF EXISTS `Car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Car` (
  `CarId` int NOT NULL AUTO_INCREMENT,
  `CarTypeId` int NOT NULL,
  PRIMARY KEY (`CarId`),
  KEY `FK_CarType_idx` (`CarTypeId`),
  CONSTRAINT `FK_Car_CarType` FOREIGN KEY (`CarTypeId`) REFERENCES `CarType` (`CarTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Car`
--

LOCK TABLES `Car` WRITE;
/*!40000 ALTER TABLE `Car` DISABLE KEYS */;
INSERT INTO `Car` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1);
/*!40000 ALTER TABLE `Car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CarType`
--

DROP TABLE IF EXISTS `CarType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CarType` (
  `CarTypeId` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`CarTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CarType`
--

LOCK TABLES `CarType` WRITE;
/*!40000 ALTER TABLE `CarType` DISABLE KEYS */;
INSERT INTO `CarType` VALUES (1,'Standard Coach');
/*!40000 ALTER TABLE `CarType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `CustomerId` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `LastName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `PasswordHash` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `PasswordSalt` varchar(29) NOT NULL,
  PRIMARY KEY (`CustomerId`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'John','Doe','johndoe@sedonajoe.com','5551112222','$2a$10$twfhgLpn78./Jfbm4EftN.PoyMmq7MlvV7PnSlfT5TkL80f./YUC6','$2a$10$twfhgLpn78./Jfbm4EftN.');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Engine`
--

DROP TABLE IF EXISTS `Engine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Engine` (
  `EngineId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ModelNumber` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`EngineId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Engine`
--

LOCK TABLES `Engine` WRITE;
/*!40000 ALTER TABLE `Engine` DISABLE KEYS */;
INSERT INTO `Engine` VALUES (1,'Ole Rusty','24601A'),(2,'Needles','111111-234'),(3,'Sparkey','2311-B.1'),(4,'Chugga','123-M123'),(5,'Choo','A9123'),(6,'Rumble','LV426-1');
/*!40000 ALTER TABLE `Engine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Route`
--

DROP TABLE IF EXISTS `Route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Route` (
  `RouteId` int NOT NULL AUTO_INCREMENT,
  `StartStationId` int NOT NULL,
  `EndStationId` int NOT NULL,
  `Minutes` int NOT NULL,
  PRIMARY KEY (`RouteId`),
  KEY `FK_Route_StartStation` (`StartStationId`,`EndStationId`),
  KEY `FK_Route_EndStation` (`EndStationId`),
  CONSTRAINT `FK_Route_EndStation` FOREIGN KEY (`EndStationId`) REFERENCES `Station` (`StationId`),
  CONSTRAINT `FK_Route_StartStation` FOREIGN KEY (`StartStationId`) REFERENCES `Station` (`StationId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Route`
--

LOCK TABLES `Route` WRITE;
/*!40000 ALTER TABLE `Route` DISABLE KEYS */;
INSERT INTO `Route` VALUES (1,1,2,60),(2,1,3,120),(3,1,4,160),(4,1,5,300),(5,1,6,330),(6,2,1,60),(7,2,3,120),(8,2,4,150),(9,2,5,200),(10,2,6,230),(11,3,1,60),(12,3,2,120),(13,3,4,150),(14,3,5,200),(15,3,6,230),(16,4,1,60),(17,4,2,120),(18,4,3,150),(19,4,5,200),(20,4,6,230),(21,5,1,60),(22,5,2,120),(23,5,3,150),(24,5,4,200),(25,5,6,230);
/*!40000 ALTER TABLE `Route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seat`
--

DROP TABLE IF EXISTS `Seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seat` (
  `SeatId` int NOT NULL AUTO_INCREMENT,
  `CarTypeId` int NOT NULL,
  `Row` int NOT NULL,
  `Position` char(1) NOT NULL,
  PRIMARY KEY (`SeatId`),
  KEY `FK_CarType_idx` (`CarTypeId`),
  CONSTRAINT `FK_Seat_CarType` FOREIGN KEY (`CarTypeId`) REFERENCES `CarType` (`CarTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=131157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seat`
--

LOCK TABLES `Seat` WRITE;
/*!40000 ALTER TABLE `Seat` DISABLE KEYS */;
INSERT INTO `Seat` VALUES (131055,1,1,'A'),(131056,1,1,'B'),(131057,1,1,'C'),(131058,1,1,'D'),(131059,1,2,'A'),(131060,1,2,'B'),(131061,1,2,'C'),(131062,1,2,'D'),(131066,1,3,'A'),(131067,1,3,'B'),(131068,1,3,'C'),(131069,1,3,'D'),(131073,1,4,'A'),(131074,1,4,'B'),(131075,1,4,'C'),(131076,1,4,'D'),(131080,1,5,'A'),(131081,1,5,'B'),(131082,1,5,'C'),(131083,1,5,'D'),(131087,1,6,'A'),(131088,1,6,'B'),(131089,1,6,'C'),(131090,1,6,'D'),(131094,1,7,'A'),(131095,1,7,'B'),(131096,1,7,'C'),(131097,1,7,'D'),(131101,1,8,'A'),(131102,1,8,'B'),(131103,1,8,'C'),(131104,1,8,'D'),(131108,1,9,'A'),(131109,1,9,'B'),(131110,1,9,'C'),(131111,1,9,'D'),(131115,1,10,'A'),(131116,1,10,'B'),(131117,1,10,'C'),(131118,1,10,'D'),(131122,1,11,'A'),(131123,1,11,'B'),(131124,1,11,'C'),(131125,1,11,'D'),(131129,1,12,'A'),(131130,1,12,'B'),(131131,1,12,'C'),(131132,1,12,'D'),(131136,1,13,'A'),(131137,1,13,'B'),(131138,1,13,'C'),(131139,1,13,'D'),(131143,1,14,'A'),(131144,1,14,'B'),(131145,1,14,'C'),(131146,1,14,'D'),(131150,1,15,'A'),(131151,1,15,'B'),(131152,1,15,'C'),(131153,1,15,'D');
/*!40000 ALTER TABLE `Seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Station`
--

DROP TABLE IF EXISTS `Station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Station` (
  `StationId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `AddressId` int NOT NULL,
  PRIMARY KEY (`StationId`),
  KEY `FK_Address_idx` (`AddressId`),
  CONSTRAINT `FK_Station_Address` FOREIGN KEY (`AddressId`) REFERENCES `Address` (`AddressId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Station`
--

LOCK TABLES `Station` WRITE;
/*!40000 ALTER TABLE `Station` DISABLE KEYS */;
INSERT INTO `Station` VALUES (1,'Cottonwood',3),(2,'Sedona',4),(3,'Phoenix',5),(4,'Prescott',6),(5,'Flagstaff',7),(6,'Clarkdale',8);
/*!40000 ALTER TABLE `Station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Train`
--

DROP TABLE IF EXISTS `Train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Train` (
  `TrainId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `EngineId` int NOT NULL,
  PRIMARY KEY (`TrainId`),
  KEY `FK_Train_Engine_idx` (`EngineId`),
  CONSTRAINT `FK_Train_Engine` FOREIGN KEY (`EngineId`) REFERENCES `Engine` (`EngineId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Train`
--

LOCK TABLES `Train` WRITE;
/*!40000 ALTER TABLE `Train` DISABLE KEYS */;
INSERT INTO `Train` VALUES (1,'Green Line',1),(2,'Red Line',2),(3,'Orange Line',3),(4,'Purple Line',4),(5,'Yellow Line',5),(6,'Blue Line',6);
/*!40000 ALTER TABLE `Train` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TrainCar`
--

DROP TABLE IF EXISTS `TrainCar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TrainCar` (
  `TrainCarId` int NOT NULL AUTO_INCREMENT,
  `TrainId` int NOT NULL,
  `CarId` int NOT NULL,
  PRIMARY KEY (`TrainCarId`),
  UNIQUE KEY `UQ_TrainId_CarId` (`TrainId`,`CarId`),
  KEY `FK_TrainCar_Train_idx` (`TrainId`),
  KEY `FK_TrainCar_Car_idx` (`CarId`),
  CONSTRAINT `FK_TrainCar_Car` FOREIGN KEY (`CarId`) REFERENCES `Car` (`CarId`),
  CONSTRAINT `FK_TrainCar_Train` FOREIGN KEY (`TrainId`) REFERENCES `Train` (`TrainId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TrainCar`
--

LOCK TABLES `TrainCar` WRITE;
/*!40000 ALTER TABLE `TrainCar` DISABLE KEYS */;
INSERT INTO `TrainCar` VALUES (2,1,1),(3,1,2),(4,1,3),(5,2,4),(6,2,5),(7,3,6),(8,3,7),(9,3,8),(10,3,9),(13,4,12),(14,4,13),(15,5,14),(16,5,15),(17,5,16),(18,5,17),(19,6,18),(20,6,19),(21,6,20),(22,6,21),(23,6,22),(24,6,23);
/*!40000 ALTER TABLE `TrainCar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trip`
--

DROP TABLE IF EXISTS `Trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trip` (
  `TripId` int NOT NULL AUTO_INCREMENT,
  `RouteId` int NOT NULL,
  `Departure` datetime NOT NULL,
  `PricePerSeat` decimal(10,2) NOT NULL,
  `TrainId` int NOT NULL,
  PRIMARY KEY (`TripId`),
  KEY `FK_Trip_Route_idx` (`RouteId`),
  KEY `FK_Trip_Train_idx` (`TrainId`),
  CONSTRAINT `FK_Trip_Route` FOREIGN KEY (`RouteId`) REFERENCES `Route` (`RouteId`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trip`
--

LOCK TABLES `Trip` WRITE;
/*!40000 ALTER TABLE `Trip` DISABLE KEYS */;
INSERT INTO `Trip` VALUES (2,6,'2023-08-01 16:00:00',3.50,2),(3,11,'2023-08-01 16:00:00',3.50,3),(4,16,'2023-08-01 16:00:00',3.50,4),(5,21,'2023-08-01 16:00:00',3.50,5),(6,1,'2023-08-01 16:00:00',3.50,1),(7,12,'2023-08-01 16:00:00',3.50,3),(8,17,'2023-08-01 16:00:00',3.50,4),(9,22,'2023-08-01 16:00:00',3.50,5),(10,2,'2023-08-01 16:00:00',3.50,1),(11,7,'2023-08-01 16:00:00',3.50,2),(12,18,'2023-08-01 16:00:00',3.50,4),(13,23,'2023-08-01 16:00:00',3.50,5),(14,3,'2023-08-01 16:00:00',3.50,1),(15,8,'2023-08-01 16:00:00',3.50,2),(16,13,'2023-08-01 16:00:00',3.50,3),(17,24,'2023-08-01 16:00:00',3.50,5),(18,4,'2023-08-01 16:00:00',3.50,1),(19,9,'2023-08-01 16:00:00',3.50,2),(20,14,'2023-08-01 16:00:00',3.50,3),(21,19,'2023-08-01 16:00:00',3.50,4),(22,5,'2023-08-01 16:00:00',3.50,1),(23,10,'2023-08-01 16:00:00',3.50,2),(24,15,'2023-08-01 16:00:00',3.50,3),(25,20,'2023-08-01 16:00:00',3.50,4),(26,25,'2023-08-01 16:00:00',3.50,5),(33,6,'2023-08-01 17:00:00',3.50,2),(34,11,'2023-08-01 17:00:00',3.50,3),(35,16,'2023-08-01 17:00:00',3.50,4),(36,21,'2023-08-01 17:00:00',3.50,5),(37,1,'2023-08-01 17:00:00',3.50,1),(38,12,'2023-08-01 17:00:00',3.50,3),(39,17,'2023-08-01 17:00:00',3.50,4),(40,22,'2023-08-01 17:00:00',3.50,5),(41,2,'2023-08-01 17:00:00',3.50,1),(42,7,'2023-08-01 17:00:00',3.50,2),(43,18,'2023-08-01 17:00:00',3.50,4),(44,23,'2023-08-01 17:00:00',3.50,5),(45,3,'2023-08-01 17:00:00',3.50,1),(46,8,'2023-08-01 17:00:00',3.50,2),(47,13,'2023-08-01 17:00:00',3.50,3),(48,24,'2023-08-01 17:00:00',3.50,5),(49,4,'2023-08-01 17:00:00',3.50,1),(50,9,'2023-08-01 17:00:00',3.50,2),(51,14,'2023-08-01 17:00:00',3.50,3),(52,19,'2023-08-01 17:00:00',3.50,4),(53,5,'2023-08-01 17:00:00',3.50,1),(54,10,'2023-08-01 17:00:00',3.50,2),(55,15,'2023-08-01 17:00:00',3.50,3),(56,20,'2023-08-01 17:00:00',3.50,4),(57,25,'2023-08-01 17:00:00',3.50,5),(64,6,'2023-08-01 18:00:00',4.00,2),(65,11,'2023-08-01 18:00:00',4.00,3),(66,16,'2023-08-01 18:00:00',4.00,4),(67,21,'2023-08-01 18:00:00',4.00,5),(68,1,'2023-08-01 18:00:00',4.00,1),(69,12,'2023-08-01 18:00:00',4.00,3),(70,17,'2023-08-01 18:00:00',4.00,4),(71,22,'2023-08-01 18:00:00',4.00,5),(72,2,'2023-08-01 18:00:00',4.00,1),(73,7,'2023-08-01 18:00:00',4.00,2),(74,18,'2023-08-01 18:00:00',4.00,4),(75,23,'2023-08-01 18:00:00',4.00,5),(76,3,'2023-08-01 18:00:00',4.00,1),(77,8,'2023-08-01 18:00:00',4.00,2),(78,13,'2023-08-01 18:00:00',4.00,3),(79,24,'2023-08-01 18:00:00',4.00,5),(80,4,'2023-08-01 18:00:00',4.00,1),(81,9,'2023-08-01 18:00:00',4.00,2),(82,14,'2023-08-01 18:00:00',4.00,3),(83,19,'2023-08-01 18:00:00',4.00,4),(84,5,'2023-08-01 18:00:00',4.00,1),(85,10,'2023-08-01 18:00:00',4.00,2),(86,15,'2023-08-01 18:00:00',4.00,3),(87,20,'2023-08-01 18:00:00',4.00,4),(88,25,'2023-08-01 18:00:00',4.00,5),(95,6,'2023-08-01 19:00:00',4.00,2),(96,11,'2023-08-01 19:00:00',4.00,3),(97,16,'2023-08-01 19:00:00',4.00,4),(98,21,'2023-08-01 19:00:00',4.00,5),(99,1,'2023-08-01 19:00:00',4.00,1),(100,12,'2023-08-01 19:00:00',4.00,3),(101,17,'2023-08-01 19:00:00',4.00,4),(102,22,'2023-08-01 19:00:00',4.00,5),(103,2,'2023-08-01 19:00:00',4.00,1),(104,7,'2023-08-01 19:00:00',4.00,2),(105,18,'2023-08-01 19:00:00',4.00,4),(106,23,'2023-08-01 19:00:00',4.00,5),(107,3,'2023-08-01 19:00:00',4.00,1),(108,8,'2023-08-01 19:00:00',4.00,2),(109,13,'2023-08-01 19:00:00',4.00,3),(110,24,'2023-08-01 19:00:00',4.00,5),(111,4,'2023-08-01 19:00:00',4.00,1),(112,9,'2023-08-01 19:00:00',4.00,2),(113,14,'2023-08-01 19:00:00',4.00,3),(114,19,'2023-08-01 19:00:00',4.00,4),(115,5,'2023-08-01 19:00:00',4.00,1),(116,10,'2023-08-01 19:00:00',4.00,2),(117,15,'2023-08-01 19:00:00',4.00,3),(118,20,'2023-08-01 19:00:00',4.00,4),(119,25,'2023-08-01 19:00:00',4.00,5),(126,6,'2023-08-01 20:00:00',4.00,2),(127,11,'2023-08-01 20:00:00',4.00,3),(128,16,'2023-08-01 20:00:00',4.00,4),(129,21,'2023-08-01 20:00:00',4.00,5),(130,1,'2023-08-01 20:00:00',4.00,1),(131,12,'2023-08-01 20:00:00',4.00,3),(132,17,'2023-08-01 20:00:00',4.00,4),(133,22,'2023-08-01 20:00:00',4.00,5),(134,2,'2023-08-01 20:00:00',4.00,1),(135,7,'2023-08-01 20:00:00',4.00,2),(136,18,'2023-08-01 20:00:00',4.00,4),(137,23,'2023-08-01 20:00:00',4.00,5),(138,3,'2023-08-01 20:00:00',4.00,1),(139,8,'2023-08-01 20:00:00',4.00,2),(140,13,'2023-08-01 20:00:00',4.00,3),(141,24,'2023-08-01 20:00:00',4.00,5),(142,4,'2023-08-01 20:00:00',4.00,1),(143,9,'2023-08-01 20:00:00',4.00,2),(144,14,'2023-08-01 20:00:00',4.00,3),(145,19,'2023-08-01 20:00:00',4.00,4),(146,5,'2023-08-01 20:00:00',4.00,1),(147,10,'2023-08-01 20:00:00',4.00,2),(148,15,'2023-08-01 20:00:00',4.00,3),(149,20,'2023-08-01 20:00:00',4.00,4),(150,25,'2023-08-01 20:00:00',4.00,5),(157,6,'2023-08-01 21:00:00',4.00,2),(158,11,'2023-08-01 21:00:00',4.00,3),(159,16,'2023-08-01 21:00:00',4.00,4),(160,21,'2023-08-01 21:00:00',4.00,5),(161,1,'2023-08-01 21:00:00',4.00,1),(162,12,'2023-08-01 21:00:00',4.00,3),(163,17,'2023-08-01 21:00:00',4.00,4),(164,22,'2023-08-01 21:00:00',4.00,5),(165,2,'2023-08-01 21:00:00',4.00,1),(166,7,'2023-08-01 21:00:00',4.00,2),(167,18,'2023-08-01 21:00:00',4.00,4),(168,23,'2023-08-01 21:00:00',4.00,5),(169,3,'2023-08-01 21:00:00',4.00,1),(170,8,'2023-08-01 21:00:00',4.00,2),(171,13,'2023-08-01 21:00:00',4.00,3),(172,24,'2023-08-01 21:00:00',4.00,5),(173,4,'2023-08-01 21:00:00',4.00,1),(174,9,'2023-08-01 21:00:00',4.00,2),(175,14,'2023-08-01 21:00:00',4.00,3),(176,19,'2023-08-01 21:00:00',4.00,4),(177,5,'2023-08-01 21:00:00',4.00,1),(178,10,'2023-08-01 21:00:00',4.00,2),(179,15,'2023-08-01 21:00:00',4.00,3),(180,20,'2023-08-01 21:00:00',4.00,4),(181,25,'2023-08-01 21:00:00',4.00,5),(188,6,'2023-08-01 22:00:00',4.00,2),(189,11,'2023-08-01 22:00:00',4.00,3),(190,16,'2023-08-01 22:00:00',4.00,4),(191,21,'2023-08-01 22:00:00',4.00,5),(192,1,'2023-08-01 22:00:00',4.00,1),(193,12,'2023-08-01 22:00:00',4.00,3),(194,17,'2023-08-01 22:00:00',4.00,4),(195,22,'2023-08-01 22:00:00',4.00,5),(196,2,'2023-08-01 22:00:00',4.00,1),(197,7,'2023-08-01 22:00:00',4.00,2),(198,18,'2023-08-01 22:00:00',4.00,4),(199,23,'2023-08-01 22:00:00',4.00,5),(200,3,'2023-08-01 22:00:00',4.00,1),(201,8,'2023-08-01 22:00:00',4.00,2),(202,13,'2023-08-01 22:00:00',4.00,3),(203,24,'2023-08-01 22:00:00',4.00,5),(204,4,'2023-08-01 22:00:00',4.00,1),(205,9,'2023-08-01 22:00:00',4.00,2),(206,14,'2023-08-01 22:00:00',4.00,3),(207,19,'2023-08-01 22:00:00',4.00,4),(208,5,'2023-08-01 22:00:00',4.00,1),(209,10,'2023-08-01 22:00:00',4.00,2),(210,15,'2023-08-01 22:00:00',4.00,3),(211,20,'2023-08-01 22:00:00',4.00,4),(212,25,'2023-08-01 22:00:00',4.00,5),(219,6,'2023-08-01 23:00:00',4.00,2),(220,11,'2023-08-01 23:00:00',4.00,3),(221,16,'2023-08-01 23:00:00',4.00,4),(222,21,'2023-08-01 23:00:00',4.00,5),(223,1,'2023-08-01 23:00:00',4.00,1),(224,12,'2023-08-01 23:00:00',4.00,3),(225,17,'2023-08-01 23:00:00',4.00,4),(226,22,'2023-08-01 23:00:00',4.00,5),(227,2,'2023-08-01 23:00:00',4.00,1),(228,7,'2023-08-01 23:00:00',4.00,2),(229,18,'2023-08-01 23:00:00',4.00,4),(230,23,'2023-08-01 23:00:00',4.00,5),(231,3,'2023-08-01 23:00:00',4.00,1),(232,8,'2023-08-01 23:00:00',4.00,2),(233,13,'2023-08-01 23:00:00',4.00,3),(234,24,'2023-08-01 23:00:00',4.00,5),(235,4,'2023-08-01 23:00:00',4.00,1),(236,9,'2023-08-01 23:00:00',4.00,2),(237,14,'2023-08-01 23:00:00',4.00,3),(238,19,'2023-08-01 23:00:00',4.00,4),(239,5,'2023-08-01 23:00:00',4.00,1),(240,10,'2023-08-01 23:00:00',4.00,2),(241,15,'2023-08-01 23:00:00',4.00,3),(242,20,'2023-08-01 23:00:00',4.00,4),(243,25,'2023-08-01 23:00:00',4.00,5),(250,6,'2023-08-02 00:00:00',4.00,2),(251,11,'2023-08-02 00:00:00',4.00,3),(252,16,'2023-08-02 00:00:00',4.00,4),(253,21,'2023-08-02 00:00:00',4.00,5),(254,1,'2023-08-02 00:00:00',4.00,1),(255,12,'2023-08-02 00:00:00',4.00,3),(256,17,'2023-08-02 00:00:00',4.00,4),(257,22,'2023-08-02 00:00:00',4.00,5),(258,2,'2023-08-02 00:00:00',4.00,1),(259,7,'2023-08-02 00:00:00',4.00,2),(260,18,'2023-08-02 00:00:00',4.00,4),(261,23,'2023-08-02 00:00:00',4.00,5),(262,3,'2023-08-02 00:00:00',4.00,1),(263,8,'2023-08-02 00:00:00',4.00,2),(264,13,'2023-08-02 00:00:00',4.00,3),(265,24,'2023-08-02 00:00:00',4.00,5),(266,4,'2023-08-02 00:00:00',4.00,1),(267,9,'2023-08-02 00:00:00',4.00,2),(268,14,'2023-08-02 00:00:00',4.00,3),(269,19,'2023-08-02 00:00:00',4.00,4),(270,5,'2023-08-02 00:00:00',4.00,1),(271,10,'2023-08-02 00:00:00',4.00,2),(272,15,'2023-08-02 00:00:00',4.00,3),(273,20,'2023-08-02 00:00:00',4.00,4),(274,25,'2023-08-02 00:00:00',4.00,5),(281,6,'2023-08-02 01:00:00',2.50,2),(282,11,'2023-08-02 01:00:00',2.50,3),(283,16,'2023-08-02 01:00:00',2.50,4),(284,21,'2023-08-02 01:00:00',2.50,5),(285,1,'2023-08-02 01:00:00',2.50,1),(286,12,'2023-08-02 01:00:00',2.50,3),(287,17,'2023-08-02 01:00:00',2.50,4),(288,22,'2023-08-02 01:00:00',2.50,5),(289,2,'2023-08-02 01:00:00',2.50,1),(290,7,'2023-08-02 01:00:00',2.50,2),(291,18,'2023-08-02 01:00:00',2.50,4),(292,23,'2023-08-02 01:00:00',2.50,5),(293,3,'2023-08-02 01:00:00',2.50,1),(294,8,'2023-08-02 01:00:00',2.50,2),(295,13,'2023-08-02 01:00:00',2.50,3),(296,24,'2023-08-02 01:00:00',2.50,5),(297,4,'2023-08-02 01:00:00',2.50,1),(298,9,'2023-08-02 01:00:00',2.50,2),(299,14,'2023-08-02 01:00:00',2.50,3),(300,19,'2023-08-02 01:00:00',2.50,4),(301,5,'2023-08-02 01:00:00',2.50,1),(302,10,'2023-08-02 01:00:00',2.50,2),(303,15,'2023-08-02 01:00:00',2.50,3),(304,20,'2023-08-02 01:00:00',2.50,4),(305,25,'2023-08-02 01:00:00',2.50,5);
/*!40000 ALTER TABLE `Trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_BookingSeat`
--

DROP TABLE IF EXISTS `vw_BookingSeat`;
/*!50001 DROP VIEW IF EXISTS `vw_BookingSeat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_BookingSeat` AS SELECT 
 1 AS `TripId`,
 1 AS `BookingId`,
 1 AS `BookingSeatId`,
 1 AS `SeatId`,
 1 AS `CarId`,
 1 AS `Row`,
 1 AS `Position`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_TripSeat`
--

DROP TABLE IF EXISTS `vw_TripSeat`;
/*!50001 DROP VIEW IF EXISTS `vw_TripSeat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_TripSeat` AS SELECT 
 1 AS `TripId`,
 1 AS `TrainId`,
 1 AS `CarId`,
 1 AS `SeatId`,
 1 AS `Row`,
 1 AS `Position`,
 1 AS `BookingSeatId`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'VerdeValleyRail'
--

--
-- Dumping routines for database 'VerdeValleyRail'
--

--
-- Final view structure for view `vw_BookingSeat`
--

/*!50001 DROP VIEW IF EXISTS `vw_BookingSeat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_BookingSeat` AS select `b`.`TripId` AS `TripId`,`b`.`BookingId` AS `BookingId`,`bs`.`BookingSeatId` AS `BookingSeatId`,`bs`.`SeatId` AS `SeatId`,`bs`.`CarId` AS `CarId`,`s`.`Row` AS `Row`,`s`.`Position` AS `Position` from ((`Booking` `b` join `BookingSeat` `bs` on((`b`.`BookingId` = `bs`.`BookingId`))) join `Seat` `s` on((`bs`.`SeatId` = `s`.`SeatId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_TripSeat`
--

/*!50001 DROP VIEW IF EXISTS `vw_TripSeat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_TripSeat` AS select `tp`.`TripId` AS `TripId`,`tr`.`TrainId` AS `TrainId`,`cr`.`CarId` AS `CarId`,`st`.`SeatId` AS `SeatId`,`st`.`Row` AS `Row`,`st`.`Position` AS `Position`,`vbs`.`BookingSeatId` AS `BookingSeatId` from (((((`Trip` `tp` join `Train` `tr` on((`tp`.`TrainId` = `tr`.`TrainId`))) join `TrainCar` `tc` on((`tr`.`TrainId` = `tc`.`TrainId`))) join `Car` `cr` on((`tc`.`CarId` = `cr`.`CarId`))) join `Seat` `st` on((`cr`.`CarTypeId` = `st`.`CarTypeId`))) left join `vw_BookingSeat` `vbs` on(((`tp`.`TripId` = `vbs`.`TripId`) and (`cr`.`CarId` = `vbs`.`CarId`) and (`st`.`SeatId` = `vbs`.`SeatId`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-29 18:06:25
