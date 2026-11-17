# language: pt

Funcionalidade: Autenticação na loja
  Como cliente cadastrado
  Quero acessar minha conta com usuário e senha
  Para poder comprar produtos

  Contexto:
    Dado que estou na tela de login

  Cenário: Acesso com credenciais válidas
    Quando informo o usuário "standard_user" e a senha "secret_sauce"
    E confirmo o acesso
    Então sou direcionado para a listagem de produtos

  Esquema do Cenário: Acesso negado com credenciais inválidas
    Quando informo o usuário "<usuario>" e a senha "<senha>"
    E confirmo o acesso
    Então vejo a mensagem de erro "<mensagem>"

    Exemplos:
      | usuario             | senha        | mensagem                                                                  |
      | standard_user       | senha_errada | Username and password do not match any user in this service               |
      | usuario_inexistente | secret_sauce | Username and password do not match any user in this service               |
      | locked_out_user     | secret_sauce | Sorry, this user has been locked out                                      |

  Cenário: Campo obrigatório não preenchido
    Quando informo apenas o usuário "standard_user"
    E confirmo o acesso
    Então vejo a mensagem de erro "Password is required"
