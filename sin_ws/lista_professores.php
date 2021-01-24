<?php
	include('conexao.php');

	$id = $_GET['id'];
	$sql = "SELECT * FROM `professores` WHERE `escola_fk` = $id";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_professor" => $tupla['id_professor'], "nome" => $tupla['nome'], 
							   "endereco" => $tupla['endereco'], "telefone" => $tupla['telefone'],
							   "escola_fk" => $tupla['escola_fk']); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Esta Escola não possui Professores Cadastrados");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>