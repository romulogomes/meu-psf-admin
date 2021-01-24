<?php
	include('conexao.php');

	$id = $_GET['id'];
	$sql = "SELECT * FROM `turmas` WHERE `escola_fk` = $id";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_turma" => $tupla['id_turma'], "serie" => $tupla['serie'], "turma" => $tupla['turma'], "turno" => $tupla['turno'], "ano" => $tupla['ano'] ); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Esta Escola não possui Turmas Cadastradas");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>