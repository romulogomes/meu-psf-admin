<?php
	include('conexao.php');

	$id = $_GET['id'];
	$sql = "SELECT id_grade, nome, descricao, disciplina_fk FROM `grade`, `disciplinas` WHERE `turma_fk` = $id and `id_disciplina` = `disciplina_fk`";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_grade" => $tupla['id_grade'], "nome" => $tupla['nome'],  "descricao" => $tupla['descricao'], "disciplina_id" => $tupla['disciplina_fk']); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Não foram encontradas disciplina para essa turma");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>