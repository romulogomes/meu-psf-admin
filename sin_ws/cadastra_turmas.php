<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_turma = $_POST['id_turma'];
	  
	  $sql = "DELETE FROM `sin`.`turmas` WHERE `turmas`.`id_turma` = $id_turma";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Turma Excluida com sucesso';	
	  else
	   	echo 'Não foi possível Excluir a Turma';

	  return false;
	}
	else{
		//$id_gestor = '10';
		$serie = $_POST["serie"];
		$turma = $_POST["turma"];
		$turno = $_POST["turno"];
		$ano = $_POST["ano"];
				
		if(isset($_POST['id_turma'])){
			$id_turma = $_POST['id_turma'];
			$sql = "UPDATE `sin`.`turmas` SET `serie` = '$serie', `turma` = '$turma', `turno` = '$turno', 
			                                    `ano` = '$ano' WHERE `turmas`.`id_turma` = $id_turma";
		} else {
			$escola_fk = $_POST["escola_fk"];
			$sql = "INSERT INTO `sin`.`turmas` (`serie`, `turma`, `turno`, `ano`, `escola_fk`) VALUES ('$serie', '$turma', '$turno', '$ano', '$escola_fk')";
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