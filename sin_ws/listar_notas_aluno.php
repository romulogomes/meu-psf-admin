<?php
	include('conexao.php');

	//$id_aluno = $_GET['id'];
	$id_aluno = 2;
	$bimestre = 1;
	$i = 0;
		$sql = "SELECT a.nome as nome_aluno, disciplina_fk, nota, bimestre, d.nome FROM `notas`,`alunos` as a, `disciplinas` as d WHERE d.id_disciplina = disciplina_fk and a.id_aluno = aluno_fk and aluno_fk = '$id_aluno' ORDER BY `d`.`nome` DESC";

		$query = mysql_query($sql) or die(mysql_error());	
		
		while ($tupla = mysql_fetch_array($query)){
				$infos[$i] = array("nome_aluno" => $tupla['nome_aluno'], "nota" => $tupla['nota'], "id_disciplina" => $tupla['disciplina_fk'],
								   "bimestre" => $tupla['bimestre'], "nome" => $tupla['nome']); 
				$i++;	
		}
		
		if(!$i){
			$infos = array("erro" => "Aluno não possui notas cadastrados");
			echo json_encode($infos);
			return false;
		}
		else
		    echo json_encode($infos);
?>