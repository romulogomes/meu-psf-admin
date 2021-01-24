<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_grade = $_POST['id_grade'];
	  
	  $sql = "DELETE FROM `sin`.`grade` WHERE `grade`.`id_grade` = $id_grade";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Grade Excluida com sucesso';	
	  else
	   	echo 'Não foi possível Excluir a Grade';

	  return false;
	}
	else{
		$conteudo = $_POST["conteudo"];
				
		if(isset($_POST['id_grade'])){
			$id_grade = $_POST['id_grade'];
			$sql = "UPDATE `sin`.`grade` SET `descricao` = '$conteudo' WHERE `grade`.`id_grade` = $id_grade";
		
		} else {
			$disciplina = $_POST["disciplina"];
			$turma = $_POST["turma"];
			$sql = "INSERT INTO `sin`.`grade` (`disciplina_fk`, `turma_fk`, `descricao`) VALUES ('$disciplina', '$turma', '$conteudo')";
		}
		$query = mysql_query($sql) or die(mysql_error());

		if($query)
	    	echo 'Cadastrada com Sucesso';	
	    else{
	    	echo 'erro';
	    	return false;
	    }
	}
  
?>