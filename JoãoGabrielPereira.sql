CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nome` varchar(145) COLLATE utf8_unicode_ci NOT NULL,
  `cep` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endereco` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  sexo CHAR(1) NOT NULL
   sexo_ CHECK (sexo in ('M', 'F')) DEFAULT NULL,
  `bairro` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uf` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cidade` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(145) COLLATE utf8_unicode_ci NOT NULL,
  `telefone` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `celular` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT 'Created At',
  `updated_at` datetime DEFAULT NULL COMMENT 'Updated At',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) 


