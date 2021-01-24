<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_professor = $_POST['id_professor'];
	  
	  $sql = "DELETE FROM `sin`.`professores` WHERE `professores`.`id_professor` = $id_professor";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Professor Excluido com sucesso';	
	  else
	   	echo 'Não foi possível Excluir o Professor';

	  return false;
	}
	else{
		//$id_gestor = '10';
		$nome = $_POST["nome"];
		$endereco = $_POST["endereco"];
		$telefone = $_POST["telefone"];
				
		if(isset($_POST['id_professor'])){
			$id_professor = $_POST['id_professor'];
			$sql = "UPDATE `sin`.`professores` SET `nome` = '$nome', `endereco` = '$endereco', `telefone` = '$telefone' WHERE `professores`.`id_professor` = $id_professor";
		} else {
			$escola_fk = $_POST["escola_fk"];
			$sql = "INSERT INTO `sin`.`professores` ( `nome`, `endereco`, `telefone`, `escola_fk`) 
		                                     VALUES ('$nome', '$endereco', '$telefone', '$escola_fk')";	
		}
		$query = mysql_query($sql) or die(mysql_error());

		if($query)
	    	echo 'Cadastrado com Sucesso';	
	    else{
	    	echo 'erro';
	    	return false;
	    }
	}
  
?>