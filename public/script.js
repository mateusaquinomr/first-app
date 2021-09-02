let cadastro;

//Carrega a lista de usuário ao carregar a página chamando a função list
window.onload = listar('/cadastro/list');

//Essa função recebe uma lista de objetos com os dados atualizados de usuário. Valida um a um e caso haja algum erro
//indica o campo errado e retorna false 
function validaUpdate(data){
    for(i = 0; i<6;i++){   
        if (data[i].value == "" || data[i].value == null){
            alert("Os campos de dados de usuário não podem estar vazios.")
            data[i].focus();
            return false;
        }
    }
    if(data[1].value.indexOf("@") == -1 ||
    data[1].value.indexOf(".") == -1) {
        alert("Esse e-mail é inválido.");
        data[1].focus();
        return false;
    }
    if (!Number.isInteger(Number(data[3].value))&&(Number(data[3].value>0))){
        alert("A idade deve ser um valor inteiro e positivo!");
        data[3].focus();
        return false;
    }
    return true;
}

//Essa função recebe um objeto com os dados de cadastro de usuário. Valida um a um e caso haja algum erro
//indica o local e retorna false 
function validaForm(data){

    //validação de nome
    if (data._name.value == "") {
        alert("Nenhum nome foi digitado, verifique o campo Nome e tente novamente.");
        data._name.focus();
        return false;
    }
    
    if (data._name.value.search(/\d/)!=-1){
        alert("Números são caracteres inválidos em nomes, verifique o campo Nome e tente novamente.");
        data._name.focus();
        return false;
    }

    if (data._email == "") {
        alert("Nenhum e-mail foi digitado, verifique o campo E-mail e tente novamente.");
        data._email.focus();
        return false;
    } 
    if(data._email.value.indexOf("@") == -1 ||
    data._email.value.indexOf(".") == -1) {
        alert("Esse E-mail é inválido, verifique o campo E-mail e tente novamente.");
        data._email.focus();
        return false;
    }

    if (data._address.value == "") {
        alert("Nenhum endereço foi digitado, verifique o campo Endereço e tente novamente.");
        data._address.focus();
        return false;
    }

    if (!Number.isInteger(Number(data._age.value))){
        alert("Esta idade não é válida.");
        data._age.focus();
        return false;
    }

    if (data._age.value == "") {
        alert("Digite sua idade.");
        data._age.focus();
        return false;
    }
    if (Number(data._age.value) < 0 || Number(data._age.value)>100 ) {
        alert("Valor inválido para idade, verifique o campo Idade e tente novamente.");
        data._age.focus();
        return false;
    }

    if (data._height.value == "") {
        alert("Nenhuma altura foi digitada, verifique o campo Altura e tente novamente.");
        data._height.focus();
        return false;
    }

    return true;

}

function update(index,link){
    //seleciona todas as tags que sejam td 
   
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length-1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds-1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs-1]; //cria uma conexao com o input que é do tipo button


    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show'; //mostra butao de envio

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        if (validaUpdate(inputs)){
        
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url=link; //"/cadastro/update";
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;

        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
        //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

        //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
        //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
        //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
         
        for(let cont=0;cont<inputs.length;cont++){ //desabilita todos os inputs para escrita ou acesso (no caso do button)
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }

        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        //toFixed faz com que as casas decimais do valor sejam sempre duas. 1.8 se torna 1.80, 1 se torna 1.00
        data.heigth =  parseFloat(inputs[4].value).toFixed(2);
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

        http.send(dataToSend);//envia dados para o servidor na forma de JSO

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
        http.onload = ()=>{ 

            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready
            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                alert('Usuário atualizado com sucesso!');
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        if (cont==5){
                            spans[cont].innerHTML = inputs[cont].checked;
                            spans[cont].className="show"; 
                        }
                        else{
                            spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                        }
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                //esconde os campos de preenchimento para o cadastro
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){//habilita novamente os inputs para escrita
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';

                //chamada de função de listagem de usuários na segunda tabela
                listar('/cadastro/list');  
            } else {
                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }

               
        }

    }});  
    
}

function remove(index,_name,link){ //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({name:_name}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = ()=>{
        
        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);
            //chamada de função de listagem de usuários na segunda tabela
            listar('/cadastro/list');

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        
    }
}

//Adiciona um usuario no users do servidor, primeiro parâmetro recebe a identificação do formulário (de cadastro), enquanto o segundo parâmetro recebe o link da rota de cadastro
function add(form, link){    
    if (validaForm(form)){
        const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
        const url=link;

        //array que será enviado ao servidor
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend; 
    
        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST

        
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
        data.id = 1000; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
        //cada linha abaixo captura um campo de usuário e insere no nosso array de objetos que será enviado ao servidor
        data.name = form._name.value;
        data.email = form._email.value;
        data.address = form._address.value;
        data.age = form._age.value;
        //toFixed faz com que as casas decimais do valor sejam sempre duas. 1.8 se torna 1.80, 1 se torna 1.00
        data.heigth = parseFloat(form._height.value).toFixed(2);
        data.vote = form._vote.value;

        //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)
    
        http.send(dataToSend);//envia dados para o servidor na forma de JSON
    
        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
    
        /*
        readyState:
        0: request not initialized
        1: server connection established
        2: request received
        3: processing request
        4: request finished and response is ready
    
        status:
        200: "OK"
        403: "Forbidden"
        404: "Page not found"
        */
    
        // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio
        http.onload = ()=>{
            
            if (http.readyState === 4 && http.status === 200) {
                alert("Usuário adicionado com sucesso!");
                //chamada de função de listagem de usuários na segunda tabela
                listar('/cadastro/list');
    
            } else {
                console.log(`Erro durante a tentativa de adição do usuário: ${_name}! Código do Erro: ${http.status}`); 
            }
            
    
        }
    };
}

//essa função limpa para depois adicionar linhas em uma tabela (table), com conteúdo de cada célula inserido no parâmetro content (deve ser um array de objetos)
//inpirado por https://stackoverflow.com/questions/8302166/dynamic-creation-of-table-with-dom https://stackoverflow.com/users/376743/rightsaidfred
function populateTable(table, content) {
    //limpeza de tabela, o método firstChild captura o primeiro nodo na lista de nodos da tabela
    while (table.firstChild){
       table.removeChild(table.firstChild);
    }
    //salva em keys as chaves de cada objeto (ex:name, email, address, etc...)
    keys = Object.keys(content[0]);

    //adiciona linha a linha, seguindo o controlador i
    for (var i = 0; i < content.length; ++i) {     
        //cria um novo documento com <tr></tr>
        var row = document.createElement('tr');
        
        //adiciona célula a célula na tabela
        for (var j=0;j<6;j++){
            //cria e insere uma nova célula na linha com <td></td>
            var newCell =  row.insertCell(j);
            //insere dentro da célula com código html <span>dado do usuário</span>
            newCell.innerHTML = '<span>'+content[i][keys[j]]+'</span>';
        }
        //insere a nova linha dentro da tabela!
        table.appendChild(row);
    }
}

//cria/atualiza a lista de usuários no fim da página e retorna a lista de usuários do servidor
function listar(link){
    
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url=link;

    http.open('GET',link,true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
    
    //send vazio pois não desejamos enviar nada para o servidor, estamos fazendo apenas uma requisição
    http.send();

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            //transforma a string  em formato JSON enviada pelo servidor novamente no seu tipo de dado anterior (lista de objetos)
            let lista = JSON.parse(http.response);

            //seleciona qual tabela será criada com os dados de usuários, se ao invés de list-users colocarmos list, a tabela de cima será alterada!
            let tb = document.querySelector(`table#list-users > tbody`);
            populateTable(tb, lista);
            return lista;
        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}