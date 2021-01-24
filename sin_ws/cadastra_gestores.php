<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_gestor = $_POST['id_gestor'];
	  
	  $sql = "DELETE FROM `sin`.`gestores` WHERE `gestores`.`id_gestor` = $id_gestor";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Gestor Excluido com sucesso';	
	  else
	   	echo 'Não foi possível Excluir o Gestor';

	  return false;
	}
	else{
		//$id_gestor = '10';
		$nome = $_POST["nome"];
		$endereco = $_POST["endereco"];
		$telefone = $_POST["telefone"];
		$login = $_POST["login"];
				
		if(isset($_POST['id_gestor'])){
			$id_gestor = $_POST['id_gestor'];
			$sql = "UPDATE `sin`.`gestores` SET `nome` = '$nome', `endereco` = '$endereco', `telefone` = '$telefone', 
			                                    `login` = '$login' WHERE `gestores`.`id_gestor` = $id_gestor";
		} else {
			$senha = $_POST["senha"];
			$escola_fk = $_POST["escola_fk"];
			$sql = "INSERT INTO `sin`.`gestores` ( `nome`, `endereco`, `telefone`, `escola_fk`, `login`, `senha`) 
		                              VALUES ('$nome', '$endereco', '$telefone', '$escola_fk', '$login', '$senha')";	
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