<h1 align="center">Duff 🍺</h1>
<h3 align="center">Aplicação para indicação de estilos de cerveja</h3>

<hr>

# Tabela de conteúdos

<!--ts-->

-   [Tabela de Conteudo](#tabela-de-conteudo)
-   [Features](#features)
-   [Tecnologias](#tecnologias)
-   [Apresentação](#apresentação)
-   [Rotas](#rotas)
-   [Resumo](#resumo)
-   [Instalação](#instalação)
-   [Deploy](#deploy)
-   [Scripts](#scripts)
    <!--te-->
    <hr>

## Features

-   [x] Cadastro de estilos de cerveja
-   [x] Busca de estilo por temperatura
-   [x] Na buscar por estilo traz uma playlist do spotify relacionada

## Tecnologias

Esta Aplicação foi desenvolvida usando as seguintes tecnologias:

<!--ts-->

-   Node.JS
-   Typescript
-   Express
-   TypeOrm
-   Postgres
-   Jest
-   Docker
-   Joi
-   Axios
<!--te-->

## Apresentação

Há uma versão da aplicação rodando nos servidores da Azure no endereço:
https://rodrigo-duff.azurewebsites.net

Documentação Postman:
https://documenter.getpostman.com/view/16662719/2s8YzZQzHS

## Resumo

Aplicação criada utilizando como base um serviço de cadastro de estilos de cerveja, e sistema de indicação
de melhores estilos e um playlist relacionada do Spotify, dada uma temperatura.
 
Foi escolhido Node.js para desenvolvimento, utilizando Typescript, framework Express e TypeOrm para conexão com banco de dados Postgres.

Para o desenvolvimento utilizei docker para subir o banco de dados, assim como para rodar os testes de integração.

Aplicação desenvolvida utilizando práticas de Clean Code e Clean Architeture, a aplicação possui testes de unidade e integração, possui 100% de cobertura na grande maioria dos testes, em alguns ainda não possui 100% mas estão acima de 80%.

## Rotas:

Buscar Todos os Estilos de Cerveja
-   Metodo: get
-   Url: https://rodrigo-duff.azurewebsites.net/api/beer

Buscar Um Estilo de Cerveja
-   Metodo: get
-   Url: https://rodrigo-duff.azurewebsites.net/api/beer/{id_estilo}

Deletar Um Estilo de Cerveja
-   Metodo: delete
-   Url: https://rodrigo-duff.azurewebsites.net/api/beer/{id_estilo}

Adicionar Um Estilo de Cerveja
-   Metodo: post
-   Url: https://rodrigo-duff.azurewebsites.net/api/beer
-   Body: 

```
{
   name: string,
   minTemperature: string,
   maxTemperature: string
}
```

Atualizar Um Estilo de Cerveja
-   Metodo: patch
-   Url: https://rodrigo-duff.azurewebsites.net/api/beer/{id_estilo}
-   Body:
```
{
   name: string,
   minTemperature: string,
   maxTemperature: string
}
```

Buscar Um Estilo de Cerveja e Uma Playlist de Acordo Com Temperatura Fornecida
-   Metodo: get
-   Url: https://rodrigo-duff.azurewebsites.net/api/playlist?temperature
-   query: 

| key | value |
| --- | ----- |
| temperature | number |
        
## Instalação

Para instalação:

-   Instalar as depêndiencias com o comando `npm install`.
-   Criar um arquivo **.env** na raiz do projeto conforme o exemplo que está em **.env.example**.
-   Setar as variáveis de ambiente:
    -   `DB_HOST` - endereço do banco de dados
    -   `DB_PORT` - porta do banco de dados (5432 padrão postgres)
    -   `DB_USERNAME` - usuário do banco de dados
    -   `DB_PASSWORD` - senha de acesso do banco de dados
    -   `DB_NAME` - nome do banco de dados
    -   `DB_TEST_NAME` - nome do banco de dados para teste
    -   `APP_PORT` - porta em qual a aplicação irá rodar
    -   `SPOTIFY_USER` - usuario do SpotifyApi
    -   `SPOTIFY_SECRET` - senha do SpotifyApi
-   Recomendo usar docker para subir a aplicação fazendo os seguintes procedimentos: 
    - setar as variaveis da seguinte maneira:
        -     DB_HOST=localhost
        -     DB_PORT=5432
        -     DB_USERNAME=postgres
        -     DB_PASSWORD=postgres
        -     DB_NAME=duff
        -     DB_TEST_NAME=duff-test
    -   Efetuar o comando `npm run pg:up`: vai subir um contâiner com uma imagem postgres, utilizando os parâmetros contidos em docker-compose.postgres.yml
    -   Efetura o comando `npm run dev`
- É possivel subir a aplicação sem subir o banco utilizando docker, apenas basta configurar as váriaveis de ambiente corretamente    

#### Observação:

Utilizando o banco de desenvolvimento `pg:up`, ele já rodas as migrations e popula o banco.

## Deploy

Utilizei o AppServices da Azure para hospedar um contâiner docker da imagem da aplicação.

Utilizei os seguintes serviços da Azure:
-   AppService - para hospedagem da aplicação
-   Azure Database for PostgresSql - para subir um banco de dados
-   Container Registry - para armazenar uma imagem docker da aplicação


Para deploy realizei os seguintes passos:
-   Rodei o comando `npm run build` para gerar a build da aplicação.
-   Rodei o comando `npm run docker:build` para gerar uma imagem da aplicação, passando o parâmetro `--tag=` com a tag da imagem
-   Realizei o comando docker login duffs.azurecr.io para logar no serviço Container Registry
-   Realizei o comando `docker push duffs.azurecr.io/duff:<tag>` para enviar a imagem para o container Registry.
-   A partir desse momento irá disparar um webhook onde o App Service vai baixar a imagem e subir novamente um container a partir dela.

#### Observação:

As váriaveis de ambiente já estão setadas no AppService.

## Scripts:

-   _start_ - Roda a aplicação em Javascript (apenas para produção).
-   _build_ - Realiza a build da aplicação e cria uma pasta dist para os arquivos.
-   _dev_ - Realiza a build e roda a aplicação.
-   _lint_ - Formata a aplicação de acordo com o Prettier e Eslint
-   _test_ - Roda todos os testes unitários.
-   _test:staged_ - Roda os testes que sofrerão modificação (utilizado pelo lintsatged)
-   _test:watch_ - Roda os testes com --watch ativado
-   _test:integ_ - Roda todos os testes de integração
-   _test:cover_ - Roda todos os testes unitários e de integração e gera coverage sobre eles
-   _migration:create_ - Cria uma migration vazia em `.src/infra/database/migrations`. **Necessario parametro --nameMigration=**
-   _migration:generate_ - Gera uma migration de acordo com modificações efetuadas nas entidades. **Necessario parametro --nameMigration=**
-   _migration:up_ - Roda as migrations.
-   _migration:down_ - Reverte a última migration.
-   _docker:build_ - Cria uma imagem docker da aplicação, conforme o arquivo dockerfile. **Necessário parâmetro --tag=**
-   _pg:up_ - Sobe um contâiner com banco Postgres, faz a migration para popular o banco
-   _pg:down_ - Finaliza o contâiner com banco Postgres
_   _pgtest:up_ - Sobe um contâiner com banco Postgres para teste, utilizado pelos testes de integração, não popula o banco
_   _pgtest:down_ - Finaliza contâiner com banco Postgres para teste, utilizado pelos testes de integração

#### Observação:

Utilize o `npm run` antes dos scripts.
