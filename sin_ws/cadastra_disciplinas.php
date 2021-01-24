<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_disciplina = $_POST['id_disciplina'];
	  
	  $sql = "DELETE FROM `sin`.`disciplinas` WHERE `disciplinas`.`id_disciplina` = $id_disciplina";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Disciplina Excluida com sucesso';	
	  else
	   	echo 'Não foi possível Excluir a Disciplina';

	  return false;
	}
	else{
		$nome = $_POST["nome"];
				
		if(isset($_POST['id_disciplina'])){
			$id_disciplina = $_POST['id_disciplina'];
			$sql = "UPDATE `sin`.`disciplinas` SET `nome` = '$nome' WHERE `disciplinas`.`id_disciplina` = $id_disciplina";
		} else {
			$escola_fk = $_POST["escola_fk"];
			$sql = "INSERT INTO `sin`.`disciplinas` ( `nome`, `escola_fk` )  VALUES ('$nome', '$escola_fk')";	
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