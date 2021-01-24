<?php

	echo 'a';
	include('conexao.php');

	// $id_aluno = $_POST['id_aluno'];
	$id_aluno = 2;

	$sql = "SELECT * FROM `alunos` WHERE `id_aluno` = $id_aluno";
	$query = mysql_query($sql) or die(mysql_error());	
	$i = 0;
	
	while ($tupla = mysql_fetch_array($query)){
			$infos[$i] = array("id_aluno" => $tupla['id_aluno'], "nome" => $tupla['nome'], 
							   "endereco" => $tupla['endereco'], "telefone" => $tupla['telefone'],
							   "nis" => $tupla['nis'], "data_nascimento" => $tupla['data_nascimento'],
							   "turma_fk" => $tupla['turma_fk']); 
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