# Burger Queen - Back-end

## 1. Preâmbulo

O front-end da aplicação Burger Queen já está criado, agora precisamos de um back-end para manejar os dados.

Neste caso, isso será feito através de uma _API rest_ que será compatível com as requisições vindas do front.

## 2. Resumo do projeto

Como back-end, nesse caso nos referimos a um _servidor web_, que é basicamente um programa que _ouve_ o que acontece na aplicação através de uma porta de rede, pela qual podemos enviar _requisições_ (_requests_) e obter _respostas_ (_responses_).

Um servidor web deve _manejar_ as requisições que chegam e devolver respostas a elas, que serão enviadas de volta ao _cliente_. Quando falamos de _aplicações de servidor_, isso implica uma arquitetura de _cliente/servidor_, onde o cliente é um programa que faz requisições através de uma rede (por exemplo o navegador, o cURL, etc) e o servidor é o programa que recebe essas requisições e as responde.


O [Node.js](https://nodejs.org/) nos permite criar servidores web super eficientes de maneira relativamente simples, tudo isso usando JavaScript!

Neste projeto vamos partir de um _boilerplate_ que já contém a estrutura básica do projeto (para criar essa estrutura, utilizamos o comando para criação de _boilerplates_ básicos do Sequelize). Isso significa que teremos que começar lendo a implementação existente e nos familiarizando com o _stack_ escolhido: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org), [PostgreSQL](https://www.postgresql.org/docs/) e outras bibliotecas auxiliares.

Você vai perceber que, entre os arquivos, incluímos um `docker-compose.yml`. Isso significa que, neste projeto, vamos utilizar os serviços de "containerização" do _Docker_. Resumindo: Um serviço de container, como _Docker_ ou _Kubernetes_, serve para, principalmente, garantir que os ambientes de desenvolvimento e produção sejam exatamente os mesmos, não importa em que sistemas operacional/versão funciona o computador da desenvolvedora. O _Docker_ cria uma máquina virtual onde podemos definir sistema operacional e versões de softwares, entre outras coisas, e é dentro de uma dessas máquinas que vamos testar e executar nossos projetos :)

Recomendamos também o uso do [Postman](https://www.getpostman.com) para você testar suas rotas, ele vai te ajudar a ter um "visual" das requisições e você também pode utilizá-lo para enviar dados através do _header_ e _body_. 

## 3. Objetivos de aprendizagem

Neste projeto, você desenvolverá um servidor web que deverá _servir_ `JSON` através de uma conexão `HTTP`.

O objetivo de aprendizagem principal é adquirir experiência com o **Node.js** como ferramenta para desenvolvimento de _aplicações de servidor_, junto com uma série de outras ferramentas comumente utilizadas nesse contexto (Express para rotas, Sequelize para interface com o banco, PostgreSQL como banco de dados, etc).

Além disso, você vai entender como funciona o processo de desenvolvimento de uma _API_ aplicando o modelo _rest_ e como integrar sua API a um banco de dados relacional. Para isso, sua aplicação deverá seguir o modelo de arquitetura **MVC** (Model View Controller), utilizando boas práticas de desenvolvimento web.

Ao final do projeto, você deverá estar familiarizada com conceitos como **rotas** (_routes_), **URLs**, **HTTP** (verbos, request, response, headers, body, status codes, etc), **JSON**, **conexão com uma base de dados** (PostgreSQL), **variáveis de ambiente**, **modelos de arquitetura**, entre outros.

## 4. Considerações gerais

Neste projeto, está permitido o uso de bibliotecas e frameworks. O _boilerplate_ já tem um arquivo de configuração `package.json` com todas as dependências necessárias, mas você pode adicionar alguma que encontre em suas pesquisas e que ache útil.

Você deverá escrever os **teste unitários** para sua aplicação, e testá-la com _Jest_.

## 5. Critérios mínimos para aceitação do projeto

### CLI

A aplicação deve subir através do comando `docker compose up <ambiente>` (_dev_, _prod_ ou _test_), dentro da pasta do projeto. 

Além disso, a aplicação poderá receber informações de configuração, como porta, banco de dados, etc, através de variáveis de ambiente.

## 6. Entrega

O código do projeto deverá estar em um repositório no GitHub.
O _deploy_ para produção deverá ser feito utilizando um serviço de hospedagem como o [Heroku](https://www.heroku.com/home), que tem integração com o [PostgreSQL](https://www.heroku.com/postgres) (cuidado para não subir as chaves de autenticação para o GitHub do projeto ;)).

## 7. Primeiros Passos

### Dependências

1. Instalar o [Docker](https://www.docker.com/) localmente. Na seção de links e leituras você encontrará um manual de Docker com instruções de instalação para os sistemas operacionais mais conhecidos;
2. Faça o _fork_ e `git clone` do projeto;
3. Instale o projeto localmente com `npm install`;
4. Rode o comando `docker-compose up dev` para subir o _boilerplate_ do projeto na porta 3000. O banco de dados estará conectado na porta 5432.
5. Preparamos um [material](https://github.com/rfukui/do-excel-ao-sistema-complexo) para você usar como modelo/exemplo desse projeto, com bastante explicação e exemplos de código. Vai te ajudar a dar os primeiros passos para que depois você consiga seguir em frente.

### Conteúdos importantes

* [Como funciona uma requisição HTTP, header e body](https://medium.com/clebertech/como-funciona-uma-requisi%C3%A7%C3%A3o-http-cf76f66fe36e) para relembrarmos pois vai ser super importante
* [Outro artigo sobre requisição HTTP, header e body](http://gabsferreira.com/o-que-e-o-http-como-funciona-request-respose/)
* [Docker para desenvolvedores](https://github.com/gomex/docker-para-desenvolvedores) (livro completo)
* [Sequelize - documentação oficial](https://sequelize.org/master/manual/)
* [Express - documentação em português](https://expressjs.com/pt-br/) - pode não estar 100% atualizada
* [PostgreSQL - documentação mais recente (em inglês)](https://www.postgresql.org/docs/)
* [PostgreSQL - documentação em português para a versão 8](http://pgdocptbr.sourceforge.net/pg80/index.html)
* [Exemplo](https://github.com/danielbdias/rest-api-with-db-in-nodejs) de aplicação construída com NodeJS e Postgres, por Daniel Dias
* [Artigo sobre MVC](https://www.profissionaisti.com.br/2014/10/o-conceito-e-as-duvidas-sobre-o-mvc/)
* Documentação do [Postman](https://learning.getpostman.com/docs/postman/launching-postman/introduction/)
* [Vídeo](https://www.youtube.com/watch?v=nSO12ItKDds) sobre como utilizar o Postman (até o minuto 10)
* [Outro vídeo](https://www.youtube.com/watch?v=rI9rhM6iJoI) sobre como utilizar o Postman

### Conteúdo extra

* [Curso de modelagem de dados](https://www.youtube.com/watch?v=Q_KTYFgvu1s) - recomendável assistir a partir desse até pelo menos o episódio sobre a "quinta forma normal"

## Tutoriais

Após ver os conteúdos importantes (é importante ver esses conteúdos antes de qualquer coisa para ter uma ideia melhor do que está acontecendo), seguem alguns tutoriais que você pode fazer para praticar antes do projeto, se quiser. 

**Muito importante:** Os tutoriais são bons para praticar, mas nenhum deles vai ser exatamente igual ao seu projeto, nem na estrutura, nem no código, nem no banco utilizado. O objetivo é que você pratique algumas partes principais do que sua aplicação deve fazer (requisições do tipo get, post, etc, conexões com banco, rotas com Express e por aí vai) e procure aplicar o que aprendeu em seu projeto. Além disso eles podem ter bugs ou desatualizações. Caso aconteça, aproveite para praticar suas habilidades de _debug_!

* [Tutorial super iniciante](https://pplware.sapo.pt/tutoriais/restful-api-node-js/) de como funcionam as rotas e sintaxe do Express, sem banco, somente com um arquivo.

* [Tutorial simples](https://imasters.com.br/back-end/api-http-rest-conceito-e-exemplo-em-node-js) do iMasters, somente com um arquivo e sem utilizar nenhum banco de dados (esse papel é feito por um arquivo JSON). O link para o arquivo de testes está quebrado no texto, mas ele pode ser encontrado [aqui](https://github.com/andersonirias/api-http-rest/tree/master/teste). Este arquivo tem as informações necessárias para testar as requisições no Postman - explore cada requisição e veja como as informações (especialmente as do _body_) são passadas!

* [Tutorial mais estruturado](https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd) utilizando MongoDB. Não é o mesmo tipo de banco que iremos utilizar no projeto, mas esse tutorial já traz a estrutura da aplicação mais separada, no caminho do que queremos implementar no projeto. Você vai precisar instalar o MongoDB.

* [Tutorial com Express e Sequelize](https://medium.com/italo-gouveia/criando-minha-primeira-api-rest-com-node-js-express-sequelize-e-mysql-para-cadastro-de-usu%C3%A1rios-1131a3e44ba1) estruturado de forma mais parecida com o nosso projeto. Esse tutorial utiliza o MySQL como banco, você vai precisar instalar e criar um novo banco antes de começar. Esse tutorial não está 100% perfeito (você vai encontrar alguns erros pelo caminho) mas é bastante válido para entender melhor a estrutura do nosso projeto e como o Sequelize e o Express trabalham juntos.

* [Tutorial com Express e MongoDB](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/) também estruturado de forma _similar_. Esse tutorial utiliza o banco MongoDB, que é um banco _nosql_, então não utiliza o Sequelize. Ele tem 4 partes, fazendo só a primeira parte já dá uma boa ideia.

* [Tutorial extra](https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014) para desenvolvimento de API com NodeJS, Postgres, Sequelize e outras libs - em inglês

**Importante**: Quando utilizamos tutoriais, fazemos muito copia-e-cola de código. Ás vezes, quando exibidos na tela, alguns caracteres (especialmente aspas duplas e simples) acabam sendo convertidos para caracteres bem parecidos, mas que o código não reconhece. Se acontecer de você copiar algum código e depois que colar no editor ele estar cheio de "squiggles" (aqueles ~~~~ vermelhos), verifique se o editor não está reclamando de alguma aspa que não está sendo reconhecida. A mesma coisa quando copiamos e colamos comandos: se algum comando no terminal não for reconhecido, verifique se o duplo hífen (--) não acabou sendo substituído por um travessão (-).

***

## 9. Checklist

### HTTP API

#### `/products`

* [ ] `GET /products`
* [ ] `GET /products/:productid`
* [ ] `POST /products`
* [ ] `PUT /products/:productid`
* [ ] `DELETE /products/:productid`

#### `/orders`

* [ ] `GET /orders`
* [ ] `GET /orders/:orderid`
* [ ] `POST /orders`
* [ ] `PUT /orders/:orderid`
* [ ] `DELETE /orders/:orderid`

#### `/tables`

* [ ] `GET /tables`
* [ ] `GET /tables/:tableid`
* [ ] `POST /tables`
* [ ] `PUT /tables/:tableid`
* [ ] `DELETE /tables/:tableid`

### Testes unitários

* [ ] Testes unitários para cada função utilizada externamente pela aplicação

## 9. Hacker Edition

Para a _hacker edition_, você poderá criar alguns _endpoints_ extras (pode definir os nomes), implementar a autenticação e escrever um novo tipo de teste, os testes _"end to end"_ (de uma ponta a outra), ou _e2e_.

### Checklist Hacker Edition

* [ ] Endpoint de histórico de pedidos
* [ ] Endpoint de criação de usuário
* [ ] Endpoint de alteração de usuário
* [ ] Endpoint de exclusão de usuário
* [ ] Autenticação com _JSON Web Token_ (JWT)
* [ ] Acrescentar níveis de permissão de usuário
* [ ] Testes _e2e_