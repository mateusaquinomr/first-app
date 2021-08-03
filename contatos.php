<?php 
    include("conexao.php");
    session_start();

    if (!isset($_SESSION['nome'])) {
        header("location: login.php");} 
        
    if($_SESSION['funcao'] == 0){
            header("location: admin.php");
    } else if($_SESSION['funcao'] == 1){
           header("location: entregador.php");
    } 
    
?>

<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  
    <a href="logout.php">Logout</a>
</body>
</html> -->

<!doctype html>
<html lang="pt-br">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <!-- Favicon -->
    <link rel="shortcut icon" href="imagens/favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <!-- Folha de Estilo CSS -->
    <link rel="stylesheet" href="style.css">
    
    <title>Projeto Dividir o Pão</title>
  </head>

  <body>
     <!-- PÁGINA INICIAL DO VOLUNTÁRIO: barra de navegação --> 
     
    <div class="cor">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <div class="logo">
                    <img src="imgs/logo.jpg" alt="Logo do projeto Dividir o Pão">
                </div>
            <div class="" id="navbarText ">
                <ul class="navbar-nav">
                    <li class="nav-item tamanho ">
                        <a class="nav-link active" href="cozinheiro.php">Home</a>
                    </li>
                    <li class="nav-item espaco  tamanho">
                        <a class="nav-link" aria-current="page"  href="insumos.php">Insumos</a>
                    </li>
                    <li class="nav-item espaco tamanho">
                        <a class="nav-link" href="#">Auxílio</a>
                    </li>
                    <li class="nav-item espaco atual tamanho">
                        <a class="nav-link" href="contatos.php">Contatos</a>
                    </li>
                    <li class="nav-item espaco_2 tamanho">
                        <div class="nav-link">
                            <a id="sair"  href="logout.php">Sair<i id="sair" class="bi bi-box-arrow-right"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </div>
      <!-- PÁGINA INICIAL DO VOLUNTÁRIO: Perfil do usuário-->
      <section class="insumos">
        <div class="container_1">
            <!-- <nav class="bc" style="--bs-breadcrumb-divider: '>'; " aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a class="cor_2" href="cozinheiro.php">Página inicial</a></li>
                    <li class="breadcrumb-item active" style="color: #FFFFFF;" aria-current="alterardados">Alterar
                        perfil</li>
                </ol>
            </nav> -->
            <div class="cesta-1">
              <i class="bi bi-telephone"></i>
              <p class="dados_3">Contatos</p>
            </div>
        </div>
    </section>


     <!-- PÁGINA INICIAL DO VOLUNTÁRIO: Parte principal, informações das listas--> 
     <section class="main-0 ">
         <div class="pesquisa container">
             <div class=" barra-pesquisa">
                 <div class="pesquisar">
                         <input type="search" id="txtBusca" placeholder="Buscar..." />
                        <i class="bi bi-search"></i>
                 </div>
                 <div class="pesquisar">
                   

                 </div>
             </div>
         </div>
       <div class="container contatos">
            <div class="contatos-infs">
                <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
                     <i class="bi bi-person-circle"></i>
                    <div class="conteudo">
                        <h4>Nome Sobrenome</h4>
                        <p>Função: Confecção</p>
                        <p>Email: fulano@hotmail.com</p>
                        <p>Telefone: xx-xxxx-xxxx</p>
                        <p>PIX: xx-xxxx-xxxx</p>
                    </div>
            </div>
            <div class="contatos-infs">
                 <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
               <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
              <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
                 <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
                <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
            <div class="contatos-infs">
                  <i class="bi bi-person-circle"></i>
                <div class="conteudo">
                    <h4>Nome Sobrenome</h4>
                    <p>Função: Confecção</p>
                    <p>Email: fulano@hotmail.com</p>
                    <p>Telefone: xx-xxxx-xxxx</p>
                    <p>PIX: xx-xxxx-xxxx</p>
                </div>
            </div>
       </div>
    </section>

    <!-- PÁGINA INICIAL DO VOLUNTÁRIO: Roda pé--> 
    <footer>
        <div class="container roda_pe">
        <div class="">
             <p>Desenvolvido por MouseHeroes</p>
        </div>
        <div class="d">
             <p>Entre em contato conosco</p>
             <i class="bi bi-instagram"></i>
             <i class="bi bi-whatsapp"></i>
        </div>

        </div>
    </footer>




    <!-- Option 1: Bootstrap Bundle with Popper -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
  </body>
</html>