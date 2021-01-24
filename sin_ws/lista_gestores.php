<?php
	include('conexao.php');

	$id = $_GET['id'];

	$sql = "SELECT * FROM `gestores` WHERE escola_fk = $id";
	$query = mysql_query($sql) or die(mysql_error());	

	$i = 0;
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_gestor" => $tupla['id_gestor'], "nome" => $tupla['nome'], 
							   "endereco" => $tupla['endereco'], "telefone" => $tupla['telefone'],
							   "escola_fk" => $tupla['escola_fk'], "login" => $tupla['login']); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Esta Escola não possui Gestores Cadastrados");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>