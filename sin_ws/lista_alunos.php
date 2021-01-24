<?php
	include('conexao.php');

	$id_turma = $_GET['id'];
	$sql = "SELECT * FROM `alunos` WHERE `turma_fk` = $id_turma";
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
		$infos = array("erro" => "Esta Turma não possui Alunos Cadastrados");
		echo json_encode($infos);
		return false;
	}
	else
	    echo json_encode($infos);
?>