# Documentação MotorShop API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
    - [Instalando Dependências](#21-instalando-dependências)
    - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
    - [Migrations](#23-migrations)
- [Endpoints](#3-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)


A URL base da aplicação:
http://suaapi.com/v1

---


## 2. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
touch .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com os comandos:

```
yarn typeorm migration:run -d dist/data-source.js

```

---


## 3. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [PATCH - /users/user_id](#12-atualiza-usuário)
	- [DELETE - /users/user_id](#13-deleta-usuário)
- [Anouncements](#2-anouncements)
	- [POST - /anouncements/user_id](#21-criação-de-anuńcio)
	- [GET - /anouncements](#22-lista-todos-os-anùncios)
	- [GET - /anouncements/anouncement_id](#23-lista-um-anúncio-por-Id)
    - [PUT- /anouncements/anouncement_id](#24-atualiza-anuńcio)
	- [DELETE - /anouncements/anouncement_id](#25-deleta-anúncio)
- [Comments](#3-comments)
	- [POST - /comments/anouncemnt_id](#31-criação-de-comentário)
	- [GET - /comments](#32-lista-todos-os-comentário)
    - [PATCH- /comments/comment_id](#33-atualiza-comentário)
	- [DELETE - /comments/comment_id](#34-deleta-comentário)
- [Autenticação](#4-loggin) 
	- [POST - /loggin](#41-loggin)




---

## 1. **User**
[ Voltar para os Endpoints ](#3-endpoints)

###  **Regra de negócio**

Deve ser possível criar um usuário com o perfil de anunciante ou comprador;

As rotas de edição de deleção de usuário devem ser protegidas;

Apenas o usuário dono da conta pode editar ou excluir ele mesmo;

O endereço deve ser vinculado ao usuário na rota de registro de usuário.


  ENUM    | | 
| -----------|--------|
| ANUNCIANTE|Anunciante| 
| COMPRADOR    | Comprador|


| users    |    | 
| -----------|--------|
| id         |number (PK)| 
| nome       | string(50) |
| email      | string(50) | 
| password   | string (200)|
| cpf   |number|
| data_de_nascimento     | string(50) |
|descricao     |string(2000) null|
|tipo_de_conta  | string(ENUM)|
celular  | string (30)|



|address |    | 
| -----------|--------|
| id         |number (PK)| 
| rua      | string(150) |
| cep      |number| 
|cidade | string (150)|
| numero  |number|
estado    |string(2) |
|complemento | string(30) null|



### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| PATCH     | /users / user_id     |Atualiza um usuário usando seu ID como parâmetro               |
| DELETE   | /users/ user_id     | Deleta um usuário usando seu ID como parâmetro 

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#3-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"nome": "kija",
	"password": "tricolor1$",
	"email": "kklija@kenzie.com",
	"cpf":909988,
	"celular":"79898989",
	"data_de_nascimento":"12-12-12",
	"tipo_de_conta": "Anunciante",
	"address":{
		"cep":998838889,
		"rua":"minas gerais",
		"numero":"133",
		"estado":"mg",
		"cidade":"bom repouso"
	}
	
}
```



### Exemplo de Response:
```
201 Created
```

```json

{
    "id":1,
	"nome": "kija",
	"email": "kklija@kenzie.com",
	"cpf":909988,
	"celular":"79898989",
	"data_de_nascimento":"12-12-12",
	"tipo_de_conta": "Anunciante",
	"address":{
		"cep":998838889,
		"rua":"minas gerais",
		"numero":"133",
		"estado":"mg",
		"cidade":"bom repouso"
	}
	
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already existis. |

---

### 1.2. **Atualizando Usuário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/user_id`

### Exemplo de Request:
```
PATCH /users/user_id
Authorization: BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{"nome":"Luna",
"address":{
	"rua":"B2"
}
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
    "id":1,
	"nome": "Luna",
	"email": "kklija@kenzie.com",
	"cpf":909988,
	"celular":"79898989",
	"data_de_nascimento":"12-12-12",
	"tipo_de_conta": "Anunciante",
	"address":{
		"cep":998838889,
		"rua":"B2",
		"numero":"133",
		"estado":"mg",
		"cidade":"bom repouso"
	}
	
}	

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  |User not found. |
---

### 1.3. **Deletando um Usuário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/users/:user_id`

### Exemplo de Request:
```
GET /users/user_id
Authorization: BEARER: Token
Content-type: application/json
```



### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```
```json
No body returned for response
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User not found. |



## 2. **Anouncement**
[ Voltar para os Endpoints ](#3-endpoints)

###  **Regra de negócio**

Todas as rotas devem ser protegidas, com exceção dos endpoints de GET;

Apenas usuários com o perfil de anunciante podem criar um anúncio;

Apenas o usuário dono do anúncio pode editar ou excluir o mesmo;

As imagens devem ser vinculadas ao anúncio na rota de registro de um anúncio.



|anouncements  |    | 
| -----------|--------|
| id         |number (PK)| 
| marca     | string(100) |
|modelo    | string(100) | 
| combustivel  | string (200)|
| ano   |number|
| quilometragem   | number |
|cor    |string(250) |
|valor_tabela_fip  | decimal|
valor |decimal|
descricao| string (2000)|
img_capa| string (2000)|





|images |    | 
| -----------|--------|
| id         |number (PK)| 
| img_url   | string(200) |




### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /anouncements/ user_id| Criação de um anúncio.                  |
| GET   | /anouncements    |Lista todos os anúncios |
| GET   | /anouncements/ anouncements_id | Lista um anúncio usando seu ID como parâmetro 
| PUT  | /anouncements/ anouncements_id    |Atualiza um anúncio usando seu ID como parâmetro 
| DELETE  | /anouncements/ anouncements_id| Deleta um anúncio usando seu ID como parâmetro
---

### 2.1. **Criação de Anúncio**

[ Voltar para os Endpoints ](#3-endpoints)

### `/anouncements/user_id`

### Exemplo de Request:
```
POST /anouncements/user_id
Authorization:BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"marca": "ferrari",
	"modelo": "x15",
	"ano": 2019,
	"cor":"preto",
	"quilometragem":909988,
	"combustivel":"flex",
	"valor_tabela_fip":"100.900",
	"valor": "3000.000",
	"descricao":"Carro impecável",
	"img_capa":"ookokok",
	"images":[
		{"img_url":"io9ioio"},
		{"img_url":"io9ioio"},
		{"img_url":"io9ioio"}
	]
}

```



### Exemplo de Response:
```
201 Created
```

```json

{
	"id": 63,
	"marca": "ferrari",
	"modelo": "x15",
	"ano": 2019,
	"combustivel": "flex",
	"quilometragem": 909988,
	"cor": "preto",
	"valor_tabela_fip": "100.90",
	"valor": "3000.00",
	"descricao": "Carro impecável",
	"img_capa": "ookokok",
	"images": [
		{
			"id": 293,
			"img_url": "io9ioio"
		},
		{
			"id": 294,
			"img_url": "io9ioio"
		},
		{
			"id": 295,
			"img_url": "io9ioio"
		}
	]
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | User Not Found. |

---


### 2.2. **Listando Anúncios**

[ Voltar aos Endpoints ](#3-endpoints)

### `/anouncements`

### Exemplo de Request:
```
GET /anouncements
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": 1,
		"marca": "Ferrari",
		"modelo": "ztSport",
		"ano": 2019,
		"combustivel": "flex",
		"quilometragem": 909988,
		"cor": "preto",
		"valor_tabela_fip": "100.90",
		"valor": "3000.00",
		"descricao": "Carro impecável",
		"img_capa": "ookokok",
		"images": [
			{
				"id": 6,
				"img_url": "io9ioio"
			}
		]
	},
	{
		"id": 2,
		"marca": "bmw",
		"modelo": "x1",
		"ano": 2019,
		"combustivel": "flex",
		"quilometragem": 909988,
		"cor": "preto",
		"valor_tabela_fip": "100.90",
		"valor": "3000.00",
		"descricao": "Carro impecável",
		"img_capa": "ookokok",
		"images": [
			{
				"id": 7,
				"img_url": "io9ioio"
			}
		]
	}
 ]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar Anúncio por ID**

[ Voltar aos Endpoints ](#3-endpoints)

### `/anouncements/ anouncement_id`

### Exemplo de Request:
```
GET /anouncements/anouncement_id
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
		"id": 2,
		"marca": "bmw",
		"modelo": "x1",
		"ano": 2019,
		"combustivel": "flex",
		"quilometragem": 909988,
		"cor": "preto",
		"valor_tabela_fip": "100.90",
		"valor": "3000.00",
		"descricao": "Carro impecável",
		"img_capa": "ookokok",
		"images": [
			{
				"id": 7,
				"img_url": "io9ioio"
			}
		]
	},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Anouncement not found. |

### 2.4. **Atualizando Anúncio**

[ Voltar aos Endpoints ](#3-endpoints)

### `/anouncements/ anouncement_id`

### Exemplo de Request:
```
PUT /anouncements/ anouncement_id
Authorization: BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"marca": "Chevrolet",
	"modelo": "Onix",
	"ano": 2019,
	"cor":"preto",
	"quilometragem":909988,
	"combustivel":"flex",
	"valor_tabela_fip":"100.900",
	"valor": "3000.000",
	"descricao":"Carro impecável",
	"img_capa":"ookokok",
	"imagens":[
				{"img_url":"3"}			
	]
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 63,
	"marca": "Chevrolet",
	"modelo": "Onix",
	"ano": 2019,
	"combustivel": "flex",
	"quilometragem": 909988,
	"cor": "preto",
	"valor_tabela_fip": "100.90",
	"valor": "3000.00",
	"descricao": "Carro impecável",
	"img_capa": "ookokok",
	"images": [
		{
			"id": 293,
			"img_url": "io9ioio"
		},
		{
			"id": 294,
			"img_url": "io9ioio"
		},
		{
			"id": 295,
			"img_url": "io9ioio"
		},
		{
			"id": 296,
			"img_url": "3"
		}
	]
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  |Anouncement not found.  |
---

### 2.5. **Deletando Anúncio**

[ Voltar aos Endpoints ](#3-endpoints)

### `/anouncements/ anouncement_id`

### Exemplo de Request:
```
DELETE /anouncements/ anouncement_id
Authorization: BEARER: Token
Content-type: application/json
```



### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```
```json
No body returned for response
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Anouncement not found. |



## 3. **Comments**
[ Voltar para os Endpoints ](#3-endpoints)

###  **Regra de negócio**

Todas as rotas devem ser protegidas;

usuário com o perfil comprador pode editar ou excluir seu comentário de um anúncio;

usuário com o perfil anunciante pode editar o seu comentário, mas pode excluir qualquer comentário desde que seja dono do anúncio;

Deve ser possível visualizar o tempo que o comentário foi feito.



|comments |    | 
| -----------|--------|
| id         |number (PK)| 
|descricao  | string(2000) |
|createdAt    | Date | 





### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /comments/ anouncement_id| Criação de um comentário.                  |
| GET   | /comments   |Lista todos os comentários |
|PATCH | /comments/ comments_id    |Atualiza um comentário usando seu ID como parâmetro 
| DELETE  | /comments/ comments_id| Deleta um comentário usando seu ID como parâmetro

---

### 3.1. **Criação de um Comentário**

[ Voltar para os Endpoints ](#3-endpoints)

### `/comments/anouncement_id`

### Exemplo de Request:
```
POST /comments/anouncement_id
Authorization:BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{"descricao":"topp"}

```



### Exemplo de Response:
```
201 Created
```

```json
{
	"descricao": "topp",
	"user": {
		"id": 1,
		"nome": "lucira6",
		"email": "lucira66010090903008@kenzie.com",
		"cpf": 909988,
		"celular": "79898989",
		"data_de_nascimento": "12-12-12",
		"descricao": null,
		"tipo_de_conta": "Comprador",
		"password": "$2a$10$kHukBWVUA3hMLNcbeaAcMOtnktXPW6YQETnFuaPPrD9eV2seSGtaK"
	},
	"anouncement": {
		"id": 63,
		"marca": "bmow",
		"modelo": "x18",
		"ano": 2019,
		"combustivel": "flex",
		"quilometragem": 909988,
		"cor": "preto",
		"valor_tabela_fip": "100.90",
		"valor": "3000.00",
		"descricao": "Carro impecável",
		"img_capa": "ookokok",
		"user": {
			"id": 4,
			"nome": "Luna",
			"email": "kija@kenzie.com",
			"cpf": 909988,
			"celular": "79898989",
			"data_de_nascimento": "12-12-12",
			"descricao": null,
			"tipo_de_conta": "Anunciante",
			"password": "$2a$10$52W8GDWccAoc52XDbNhFvuOMnQpzh/q7jUTNWe.8OlZbzAkr0Ipqa"
		},
		"images": [
			{
				"id": 293,
				"img_url": "io9ioio"
			},
			{
				"id": 294,
				"img_url": "io9ioio"
			},
			{
				"id": 295,
				"img_url": "io9ioio"
			},
			{
				"id": 296,
				"img_url": "3"
			}
		]
	},
	"id": 20,
	"createdAt": "2023-10-05T18:33:21.218Z"
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Anouncement Not Found. |

---


### 3.2. **Listando Comentários**

[ Voltar aos Endpoints ](#3-endpoints)

### `/comments`

### Exemplo de Request:
```
GET /comments
Authorization: BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": 17,
		"descricao": "roooooooooookk",
		"createdAt": "2023-10-05T18:29:14.667Z",
		"user": {
			"id": 4,
			"nome": "Luna",
			"email": "kija@kenzie.com",
			"cpf": 909988,
			"celular": "79898989",
			"data_de_nascimento": "12-12-12",
			"descricao": null,
			"tipo_de_conta": "Anunciante",
			"password": "$2a$10$52W8GDWccAoc52XDbNhFvuOMnQpzh/q7jUTNWe.8OlZbzAkr0Ipqa"
		},
		"anouncement": {
			"id": 63,
			"marca": "bmow",
			"modelo": "x18",
			"ano": 2019,
			"combustivel": "flex",
			"quilometragem": 909988,
			"cor": "preto",
			"valor_tabela_fip": "100.90",
			"valor": "3000.00",
			"descricao": "Carro impecável",
			"img_capa": "ookokok"
		}
	}
]

```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---



### 3.3. **Atualizando Comentário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/comments/ comment_id`

### Exemplo de Request:
```
PATCH /comments/ comment_id
Authorization: BEARER: Token
Content-type: application/json
```

### Corpo da Requisição:
```json

{"descricao":"Carro impecável"},
		
	

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 20,
	"descricao": "Carro impecável",
	"createdAt": "2023-10-05T18:33:21.218Z",
	"user": {
		"id": 1,
		"nome": "lucira6",
		"email": "lucira66010090903008@kenzie.com",
		"cpf": 909988,
		"celular": "79898989",
		"data_de_nascimento": "12-12-12",
		"descricao": null,
		"tipo_de_conta": "Comprador",
		"password": "$2a$10$kHukBWVUA3hMLNcbeaAcMOtnktXPW6YQETnFuaPPrD9eV2seSGtaK"
	},
	"anouncement": {
		"id": 63,
		"marca": "bmow",
		"modelo": "x18",
		"ano": 2019,
		"combustivel": "flex",
		"quilometragem": 909988,
		"cor": "preto",
		"valor_tabela_fip": "100.90",
		"valor": "3000.00",
		"descricao": "Carro impecável",
		"img_capa": "ookokok",
		"user": {
			"id": 4,
			"nome": "Luna",
			"email": "kija@kenzie.com",
			"cpf": 909988,
			"celular": "79898989",
			"data_de_nascimento": "12-12-12",
			"descricao": null,
			"tipo_de_conta": "Anunciante",
			"password": "$2a$10$52W8GDWccAoc52XDbNhFvuOMnQpzh/q7jUTNWe.8OlZbzAkr0Ipqa"
		}
	}
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  |Comment not found.  |
---

### 3.4. **Deletando Comentário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/comments/ anouncement_id`

### Exemplo de Request:
```
DELETE /comments/ comment_id
Authorization: BEARER: Token
Content-type: application/json
```



### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```
```json
No body returned for response
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Comment not found. |



## 4. **Autenticação**
[ Voltar para os Endpoints ](#3-endpoints)

###  **Regra de negócio**

Autenticação do usuário

Proteção das rotas


### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | / loggin| Autenticação de um usuário.                  |

---

### 4.1. **Loggin**

[ Voltar para os Endpoints ](#3-endpoints)

### `/loggin`

### Exemplo de Request:
```
POST /loggin
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email":"kenzinho@kenzie.com",
	"password" :"1234"
}
```



### Exemplo de Response:
```
200 OK
```

```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Imx1Y2lyYTY2MDEwMDkwOTAzMDA4QGtlbnppZS5
jb20iLCJuYW1lIjoibHVjaXJhNiIsInRpcG9fZGVfY29udGEiOiJDb21wcmFkb3IiLCJpYXQiOjE2OTY1OTEwNjQ
sImV4cCI6MTY5NjU5NDY2NCwic3ViIjoiMSJ9.0lahuxk61ujE_oUAsBZvedGpFtvASFSZmXPYPpI7KlU"
}

```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   |Invalid credentials. |

---


## Autor

- [Amauri Araújo](https://github.com/AmauriAraujojr)