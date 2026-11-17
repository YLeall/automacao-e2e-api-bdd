# language: pt

Funcionalidade: Compra de produtos
  Como cliente autenticado
  Quero adicionar produtos ao carrinho e finalizar a compra
  Para receber meu pedido

  Contexto:
    Dado que estou autenticado como "standard_user"

  Cenário: Adicionar produto ao carrinho
    Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
    Então o contador do carrinho exibe 1 item

  Cenário: Finalizar compra com dados válidos
    Dado que adicionei o produto "Sauce Labs Backpack" ao carrinho
    Quando abro o carrinho
    E inicio o checkout
    E preencho os dados "Yan", "Leal" e "40000-000"
    E concluo o pedido
    Então vejo a confirmação "Thank you for your order!"

  Cenário: Checkout sem CEP é bloqueado
    Dado que adicionei o produto "Sauce Labs Backpack" ao carrinho
    Quando abro o carrinho
    E inicio o checkout
    E preencho os dados "Yan", "Leal" e ""
    Então vejo a mensagem de erro "Postal Code is required"

  Cenário: Remover produto esvazia o carrinho
    Dado que adicionei o produto "Sauce Labs Backpack" ao carrinho
    Quando removo o produto "Sauce Labs Backpack" do carrinho
    Então o carrinho fica vazio
