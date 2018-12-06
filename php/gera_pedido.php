<?php
// Dados da conexão com o banco de dados
define('SERVER', 'localhost');
define('DBNAME', 'exe_pedido');
define('USER', 'root');
define('PASSWORD', 'sucesso');

// Configura uma conexão com o banco de dados
$opcoes = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8');
$conexao = new PDO("mysql:host=".SERVER."; dbname=".DBNAME, USER, PASSWORD, $opcoes);

    if(!$_POST['id']){
        $sql = "insert into cliente (cpf, nome,cep, endereco,numero,
                    bairro,uf,cidade,email,telefone,celular) values (
                        '".$_POST['cpf']."',
                        '".$_POST['nome']."',
                        '".$_POST['cep']."',
                        '".$_POST['endereco']."',
                        '".$_POST['numero']."',
                        '".$_POST['bairro']."',
                        '".$_POST['uf']."',
                        '".$_POST['cidade']."',
                        '".$_POST['email']."',
                        '".$_POST['telefone']."',
                        '".$_POST['celular']."');";
                        echo $sql;
        $stm = $conexao->prepare($sql);
	    $stm->execute();
    header('Location:index.html');
    }
