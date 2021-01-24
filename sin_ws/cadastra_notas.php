<?php
	include('conexao.php');

	$id_aluno = $_POST["id_aluno"];
	$bimestre = $_POST["bimestre"];
	$ano = $_POST["ano"];

	if(!isset($id_aluno) || !isset($bimestre) || !isset($ano)){
		echo "false";
		return false;
	}
	
	$json = json_decode($_POST["notas"]);
	for($i = 0; $i < count($json); $i++){
		
		$id_disciplina = $json[$i]->{'id_disciplina'};
		$nota = $json[$i]->{'nota'};
		$sql = "INSERT INTO `sin`.`notas` (`aluno_fk`, `disciplina_fk`, `nota`, `bimestre`, `ano`) 
	 						   VALUES ('$id_aluno', '$id_disciplina', '$nota', '$bimestre', '$ano')";
	 	$query = mysql_query($sql) or die(mysql_error());

	    if($query){
			echo "Cadastro Realizado com sucesso";
		}
	}
	

	
	

	
?>