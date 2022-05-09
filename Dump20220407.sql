-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: phonebook
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departmentTitle` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RegionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RegionId` (`RegionId`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`RegionId`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Služba za informatiku','INF','2021-10-29 10:14:32','2021-10-29 10:14:32',1),(2,'Služba za tehničke poslove','TEH','2021-10-29 10:14:47','2021-10-29 10:14:47',1),(3,'Služba za tehničke poslove','TEH','2021-10-29 10:14:51','2021-10-29 12:20:43',2),(10,'Zavod za fizikalnu medicinu','FZK','2021-10-29 11:03:52','2021-11-14 08:33:34',2),(12,'Zavod za fizikalnu medicinu','FZK','2021-10-29 11:04:07','2021-11-16 07:17:20',1),(27,'Zavod za urologiju','URO','2021-11-11 13:07:06','2021-11-11 13:07:06',2),(28,'Zavod za ortopediju i traumatologiju','ORT','2021-11-11 13:08:14','2021-11-11 13:08:14',2),(29,'Zavod za ortopediju i traumatologiju','ORT','2021-11-11 13:09:26','2021-11-11 13:09:26',1),(30,'Zagvozd','ZAG','2021-11-11 13:15:41','2021-11-11 13:15:41',7),(31,'Klinika za ženske bolesti i porode','GIN','2021-11-13 14:53:46','2021-11-16 08:13:32',1),(32,'Zavod za plastičnu kirurgiju','KIR','2021-11-13 15:07:52','2021-11-13 15:07:52',2),(33,'Zavod za fizikalnu medicinu','FZK','2021-11-13 15:12:32','2021-11-16 07:17:32',6),(34,'Klinika za kirurgiju','KIR','2021-12-11 13:31:00','2021-12-11 13:31:00',1);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `numbers`
--

DROP TABLE IF EXISTS `numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `numbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `number` int NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DepartmentId` int DEFAULT NULL,
  `RegionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DepartmentId` (`DepartmentId`),
  KEY `RegionId` (`RegionId`),
  CONSTRAINT `numbers_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `numbers_ibfk_2` FOREIGN KEY (`RegionId`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `numbers`
--

LOCK TABLES `numbers` WRITE;
/*!40000 ALTER TABLE `numbers` DISABLE KEYS */;
INSERT INTO `numbers` VALUES (1,'Voditelj',26327,1,1,'2021-11-12 15:36:51','2022-04-04 17:59:12',1,1),(2,'Voditelj',26333,1,1,'2021-11-12 15:37:42','2022-04-05 17:15:41',2,1),(3,'Voditelj',27333,1,1,'2021-11-12 15:37:52','2022-03-28 17:49:36',3,2),(4,'Servis',26988,0,1,'2021-11-18 19:41:38','2022-04-03 09:34:43',1,1),(5,'Servis',26987,1,1,'2021-11-18 19:41:44','2022-03-27 15:58:02',1,1),(6,'Servis',26986,1,1,'2021-11-18 19:41:47','2021-11-18 19:41:47',1,1),(7,'BIS podrška',26932,1,1,'2022-03-06 14:10:18','2022-03-28 17:40:31',1,1),(8,'BIS podrška',26933,1,1,'2022-03-06 14:10:47','2022-03-27 16:50:57',1,1),(9,'Glavna sestra',27301,1,1,'2022-03-06 19:05:37','2022-03-27 15:18:57',27,2),(10,'Servis printer',26777,1,1,'2022-03-13 17:52:59','2022-03-13 17:52:59',1,1),(11,'Web servis',26775,1,1,'2022-03-13 17:54:18','2022-03-13 17:54:18',1,1),(12,'Ured',557334,1,1,'2022-03-13 18:06:25','2022-03-13 18:06:25',27,2),(13,'Električar',27453,1,1,'2022-03-13 18:07:35','2022-03-13 18:07:35',3,2),(14,'Ured',557456,1,1,'2022-03-13 18:09:13','2022-03-13 18:09:13',10,2),(15,'Tajnica',551334,1,1,'2022-03-13 18:10:37','2022-03-13 18:10:37',31,1),(16,'Šalter',390401,1,1,'2022-03-13 18:15:28','2022-03-13 18:15:28',33,6),(17,'Sistemska podrška',26666,1,1,'2022-03-21 17:51:40','2022-03-21 17:51:40',1,1);
/*!40000 ALTER TABLE `numbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regionTitle` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Firule','2021-10-29 10:11:40','2021-10-29 10:11:40'),(2,'Križine','2021-10-29 10:11:46','2021-10-29 10:11:46'),(6,'Toplice','2021-10-29 11:47:42','2021-10-29 11:47:42'),(7,'Zagvozd','2021-10-29 11:47:48','2021-10-29 11:47:48');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 18:05:56
