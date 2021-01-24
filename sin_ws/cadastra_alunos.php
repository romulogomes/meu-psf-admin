<?php
	include('conexao.php');

	if(isset($_POST['funcao'])){
	  $id_aluno = $_POST['id_aluno'];
	  
	  $sql = "DELETE FROM `sin`.`alunos` WHERE `alunos`.`id_aluno` = $id_aluno";
	  $query = mysql_query($sql) or die(mysql_error());

	  if($query)
	   	echo 'Aluno Excluido com sucesso';	
	  else
	   	echo 'Não foi possível Excluir o Aluno';

	  return false;
	}
	else{
		//$id_gestor = '10';
		$nome = $_POST["nome"];
		$endereco = $_POST["endereco"];
		$telefone = $_POST["telefone"];
		$nis = $_POST["nis"];
		$data_nascimento = $_POST["data_nascimento"];
				
		if(isset($_POST['id_aluno'])){
			$id_aluno = $_POST['id_aluno'];
			$sql = "UPDATE `sin`.`alunos` SET `nome` = '$nome', `endereco` = '$endereco', `telefone` = '$telefone', `nis` = '$nis', `data_nascimento` = '$data_nascimento' WHERE `alunos`.`id_aluno` = $id_aluno";
		} else {
			$turma_fk = $_POST["turma_fk"];
			$sql = "INSERT INTO `sin`.`alunos` ( `nome`, `endereco`, `nis`, `data_nascimento`, `telefone`, `turma_fk`) 
		                                VALUES ('$nome', '$endereco', '$nis', '$data_nascimento', '$telefone', '$turma_fk')";	
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