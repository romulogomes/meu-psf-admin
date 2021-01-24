<?php
	include('conexao.php');

	$id = $_GET['id'];
	$sql = "SELECT * FROM `disciplinas` WHERE `escola_fk` = $id";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_disciplina" => $tupla['id_disciplina'], "nome" => $tupla['nome']); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Esta Escola não possui Disciplinas Cadastradas");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>