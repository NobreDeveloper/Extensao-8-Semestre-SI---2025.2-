## Descrição
Backend feito para a disciplina de Extensão na graduação de Sistemas de Informação.

Documentação completa do planejamento do projeto:\
https://night-sound-707.notion.site/Do-Sert-o-ao-Digital-Promovendo-a-Cultura-do-Mel-de-Moreil-ndia-24f3edbd06c3805d99cbe19678128a16

## Ferramentas

TypeScript (v5.9.2)

Express (v5.1.0)

Prisma (v6.16.1)

## Uso da API

**Rotas privadas neecssitam que passe a autorização, seja coletado o token no retorno json e informado no header da requisição**

    Key: Autentication  
    Value: Bearer <Token>

### Rota de Login ( Autenticação )

**( POST )** -> "/api/auth/login"

**Exemplo de Body**

    {
        "email": "exemplo@exemplo.com",
        "senha": "exemplo"
    }    

### Rota de Usuario

**( GET )** -> "/api/usuario" 

---

**( POST )** -> "/api/usuario"
* Caso não seja informado o papel do usuário será definido como PRODUTOR automaticamente.

**Exemplo de Body**

    {
        "email": "exemploEmail@exemplo.com",
        "senha": "exemploSenha",
        "nome": "exemploNome",
        "papel": "ADMIN"
    } 

---

**( UPDATE )** -> "/api/usuario/:id"

* Informa qual usuario será alterado pelo id na url e qual o campo com seu respectivo valor no body.

* OBS: Apenas usuário definidos como ADMIN podem alterar o papel.

**Exemplo de Body**

    {
        "email": "exemploEmail@exemplo.com",
        "senha": "exemploSenha",
        "nome": "exemploNome",
        "papel": "ADMIN"
    }

---

**( DELETE )** -> "/api/usuario/:id"

* Apenas informar qual usuário será excluido do banco pela url

### Rota de Produtor

**( GET )** -> "/api/produtor" 

---

**( POST )** -> "/api/produtor"
*  O userID do produtor é obrigatório.

**Exemplo de Body**

    {
        "biografia": "exemploBiografia",
        "foto_perfil": "exemploFoto",
        "contato_email": "exemploEmail",
        "contato_whatsapp": "exemploWhatsapp",
        "userId": 1,
    } 

*   OBS: Biografia é opcional

---

**( UPDATE )** -> "/api/produtor/:id"

* Indica qual produtor será modificado por meio do ID presente na URL e informar os campos que deseja ser alterado no body.

* OBS: só o dono ou ADMIN pode atualizar.

**Exemplo de Body**

    {
        "biografia": "exemploBiografia",
        "foto_perfil": "exemploFoto",
        "contato_email": "exemploEmail",
        "contato_whatsapp": "exemploWhatsapp",
    }

---

**( DELETE )** -> "/api/produtor/:id"

* Deleta o produtor pelo id na url

### Rota de Produto

**( GET )** -> "/api/produto" 

---

**( POST )** -> "/api/produto"
*  O produtorId é obrigatório.

**Exemplo de Body**

    {
        "nome": "exemploNome",
        "descricao": "exemplodescriçao"
        " foto_produto": "exemplofoto",
        "produtorId": "exemploid"
    } 

---

**( UPDATE )** -> "/api/produto/:id"

* Indica qual produto será modificado por meio do ID presente na URL e informar os campos que deseja ser alterado no body.

**Exemplo de Body**

     {
        "nome": "exemploNome",
        "descricao": "exemplodescriçao"
        "foto_produto": "exemplofoto",
        "produtorId": "exemploid"
    }

---

**( DELETE )** -> "/api/produto/:id"

* Deleta o produto pelo id na url

Obs: somento o produtor ou ADIM

## Rota de Postagem

ROTA PRIVADA

**( GET )** -> "/api/produtor/postagem" 

---

ROTA PRIVADA

**( POST )** -> "/api/produtor/postagem"
* Caso não seja informado o papel do usuário será definido como PRODUTOR automaticamente.

**Exemplo de Body**

    {
        "email": "exemploEmail@exemplo.com",
        "senha": "exemploSenha",
        "nome": "exemploNome",
        "papel": "ADMIN"
    } 

---

ROTA PRIVADA

**( UPDATE )** -> "/api/produtor/postagem/:id"

* Informa qual usuario será alterado pelo id na url e qual o campo com seu respectivo valor no body.

* OBS: Apenas usuário definidos como ADMIN podem alterar o papel.

**Exemplo de Body**

    {
        "email": "exemploEmail@exemplo.com",
        "senha": "exemploSenha",
        "nome": "exemploNome",
        "papel": "ADMIN"
    }

---

ROTA PRIVADA 

**( DELETE )** -> "/api/produtor/postagem/:id"

* Apenas informar qual o id da postagem será excluido do banco pela url