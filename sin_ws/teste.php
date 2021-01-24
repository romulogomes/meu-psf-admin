<?php
	include('conexao.php');

	var_dump($_POST);
	// $dados = '{"id_aluno":"12", "bimestre":"1", "ano":"2016", "notas":[{ "id_disciplina":"1", "nota":"1"}, {"id_disciplina":"4", "nota":"2"}, {"id_disciplina":"5", "nota":"5"} ] }';
	// $json = json_decode($dados);

	// $id_aluno = $json->{'id_aluno'};
	// $bimestre = $json->{'bimestre'};
	// $ano = 		$json->{'ano'};

	// for($i = 0; $i < count($json->{'notas'}); $i++) {
	// 	$id_disciplina = $json->{'notas'}[$i]->{'id_disciplina'};
	// 	$nota = $json->{'notas'}[$i]->{'nota'};

	// 	$sql = "INSERT INTO `sin`.`notas` (`aluno_fk`, `disciplina_fk`, `nota`, `bimestre`, `ano`) VALUES ('$id_aluno', '$id_disciplina', '$nota', '$bimestre', '$ano')";
	// 	echo $sql . '<br><br>';

	// 	$query = mysql_query($sql) or die(mysql_error());
	// }



	// if($query){
	// 	echo "Cadastro Realizado com sucesso";
	// }
	

	// ECHO count($json->{'notas'});
?>