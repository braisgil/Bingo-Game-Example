-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-03-2015 a las 00:31:48
-- Versión del servidor: 5.1.73
-- Versión de PHP: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bingo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `usr_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usr_login` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `usr_pass` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_apellidos` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_direccion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_cp` int(11) NOT NULL,
  `usr_poblacion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_provincia` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_telefono` int(11) NOT NULL,
  `usr_movil` int(11) NOT NULL,
  `usr_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `usr_tarjeta_tipo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_tarjeta_titular` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `usr_tarjeta_numero` bigint(20) NOT NULL,
  `usr_tarjeta_cv` int(11) NOT NULL,
  `usr_tarjeta_fecha` date NOT NULL,
  `usr_saldo` int(11) NOT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `usr_login` (`usr_login`,`usr_email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_login`, `usr_pass`, `usr_nombre`, `usr_apellidos`, `usr_direccion`, `usr_cp`, `usr_poblacion`, `usr_provincia`, `usr_telefono`, `usr_movil`, `usr_email`, `usr_tarjeta_tipo`, `usr_tarjeta_titular`, `usr_tarjeta_numero`, `usr_tarjeta_cv`, `usr_tarjeta_fecha`, `usr_saldo`) VALUES
(1, 'jacho', '4e0b6a05f77b3c55169a9c992afcf02f', 'manuel', 'canadas murias', 'virrey ossorio 25', 15011, 'a coruña', 'la coruña', 981269076, 629601938, 'manuelcanadas@gmail.com', 'visa', 'manuel cañadas murias', 4166816392799018, 755, '2016-04-01', 135),
(2, 'pedro', 'e10adc3949ba59abbe56e057f20f883e', 'manuel', 's', 's', 26767, 'ghfg', 'ghf', 543543543, 543543543, 'gfdg@hgfd.com', 'visa', 'fdghj gfhg', 3333333333333333, 432, '2016-04-01', 16),
(3, 'mago', 'e10adc3949ba59abbe56e057f20f883e', 'mago', 'perrito feliz', 'virrey osorio caseta perro 25', 15011, 'la coruÃ±a', 'la coruÃ±a', 981269076, 629601938, 'mago@gmail.com', 'americanexpress', 'mago perrito feliz', 2345456787653465, 423, '2016-08-01', 194);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
