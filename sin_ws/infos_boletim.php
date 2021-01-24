<?php

	
	include('conexao.php');

	$id_aluno = $_POST['id_aluno'];
	// $id_aluno = 2;

	$sql = "SELECT * FROM `alunos` as a, `turmas` as t WHERE a.`id_aluno` = $id_aluno and t.`id_turma` = a.`turma_fk`";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	
	while ($tupla = mysql_fetch_array($query)){
		
			$infos[$i] = array("nome" => $tupla['nome'], "serie" => $tupla['serie'], "turma" => $tupla['turma'],
							   "turno" => $tupla['turno']); 
			$i++;	
	}
	if(!$i){
		$infos = array("erro" => "Aluno não encontrado");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
	
  ?>