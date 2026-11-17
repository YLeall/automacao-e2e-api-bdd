# Casos de Teste

Cada caso segue o formato: pré-condição, passos, resultado esperado, prioridade e
automação correspondente.

---

## Módulo: Autenticação (Web)

| ID | Título | Pré-condição | Passos | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|---|
| CT-LOGIN-01 | Login com credenciais válidas | Usuário `standard_user` ativo | 1. Abrir a tela de login<br>2. Informar usuário e senha válidos<br>3. Confirmar | Sistema redireciona para `/inventory.html` e exibe o título "Products" | Alta | Sim |
| CT-LOGIN-02 | Login com senha incorreta | Usuário existente | 1. Informar usuário válido e senha incorreta<br>2. Confirmar | Mensagem "Username and password do not match any user in this service" e permanência na tela de login | Alta | Sim |
| CT-LOGIN-03 | Login com usuário inexistente | Nenhuma | 1. Informar usuário inexistente<br>2. Confirmar | Mesma mensagem genérica do CT-LOGIN-02, sem revelar se o usuário existe | Alta | Sim |
| CT-LOGIN-04 | Login sem senha | Nenhuma | 1. Informar apenas o usuário<br>2. Confirmar | Mensagem "Password is required" | Média | Sim |
| CT-LOGIN-05 | Login com campos vazios | Nenhuma | 1. Confirmar sem preencher nada | Mensagem "Username is required" | Média | Sim |
| CT-LOGIN-06 | Login com usuário bloqueado | Usuário `locked_out_user` | 1. Informar as credenciais do usuário bloqueado<br>2. Confirmar | Mensagem "Sorry, this user has been locked out" | Alta | Sim |
| CT-LOGIN-07 | Acesso direto à área logada sem sessão | Sessão encerrada | 1. Acessar `/inventory.html` pela URL | Sistema bloqueia e retorna à tela de login com mensagem de acesso restrito | Alta | Sim |
| CT-LOGIN-08 | Logout encerra a sessão | Usuário autenticado | 1. Abrir o menu lateral<br>2. Acionar Logout | Sistema retorna à tela de login e a sessão é encerrada | Média | Sim |

## Módulo: Catálogo (Web)

| ID | Título | Pré-condição | Passos | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|---|
| CT-INV-01 | Catálogo exibe todos os produtos | Usuário autenticado | 1. Observar a listagem | Seis produtos são exibidos | Média | Sim |
| CT-INV-02 | Ordenação de A a Z | Usuário autenticado | 1. Selecionar "Name (A to Z)" | Nomes em ordem alfabética crescente | Média | Sim |
| CT-INV-03 | Ordenação de Z a A | Usuário autenticado | 1. Selecionar "Name (Z to A)" | Nomes em ordem alfabética decrescente | Média | Sim |
| CT-INV-04 | Ordenação por menor preço | Usuário autenticado | 1. Selecionar "Price (low to high)" | Preços em ordem crescente | Média | Sim |
| CT-INV-05 | Ordenação por maior preço | Usuário autenticado | 1. Selecionar "Price (high to low)" | Preços em ordem decrescente | Média | Sim |
| CT-INV-06 | Adicionar produto atualiza o contador | Usuário autenticado, carrinho vazio | 1. Adicionar dois produtos | Contador passa de 0 para 1 e depois para 2 | Alta | Sim |
| CT-INV-07 | Remover produto atualiza o contador | Produto no carrinho | 1. Remover o produto | Contador volta a 0 e o badge deixa de ser exibido | Alta | Sim |
| CT-INV-08 | Todos os produtos têm preço | Usuário autenticado | 1. Ler o preço de cada produto | Nenhum produto exibido sem preço ou com valor zero | Média | Sim |

## Módulo: Carrinho e Checkout (Web)

| ID | Título | Pré-condição | Passos | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|---|
| CT-CHK-01 | Produtos adicionados aparecem no carrinho | Usuário autenticado | 1. Adicionar dois produtos<br>2. Abrir o carrinho | Os dois produtos aparecem listados | Alta | Sim |
| CT-CHK-02 | Compra completa de um produto | Produto no carrinho | 1. Abrir o carrinho<br>2. Iniciar o checkout<br>3. Preencher nome, sobrenome e CEP<br>4. Concluir | Mensagem "Thank you for your order!" em `/checkout-complete.html` | Crítica | Sim |
| CT-CHK-03 | Checkout sem nome é bloqueado | Produto no carrinho | 1. Iniciar o checkout<br>2. Deixar o nome em branco<br>3. Continuar | Mensagem "First Name is required" | Alta | Sim |
| CT-CHK-04 | Checkout sem CEP é bloqueado | Produto no carrinho | 1. Iniciar o checkout<br>2. Deixar o CEP em branco<br>3. Continuar | Mensagem "Postal Code is required" | Alta | Sim |
| CT-CHK-05 | Total equivale a subtotal mais imposto | Dois produtos no carrinho | 1. Avançar até o resumo do pedido<br>2. Comparar os valores | Total igual à soma de subtotal e imposto, com duas casas decimais | Crítica | Sim |
| CT-CHK-06 | Checkout com carrinho vazio | Carrinho vazio | 1. Abrir o carrinho<br>2. Observar o botão de checkout | O botão deveria estar desabilitado. Comportamento atual registrado em BUG-003 | Média | Sim |

## Módulo: Autenticação (API)

| ID | Título | Método e rota | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|
| CT-API-AUTH-01 | Login válido retorna token | `POST /login` | Status 200, mensagem de sucesso e `authorization` no formato Bearer | Crítica | Sim |
| CT-API-AUTH-02 | Login com senha incorreta | `POST /login` | Status 401 e mensagem "Email e/ou senha inválidos" | Alta | Sim |
| CT-API-AUTH-03 | Login com email não cadastrado | `POST /login` | Status 401 com a mesma mensagem genérica | Alta | Sim |
| CT-API-AUTH-04 | Operação protegida sem token | `POST /produtos` | Status 401 informando ausência de token | Crítica | Sim |
| CT-API-AUTH-05 | Operação protegida com token inválido | `POST /produtos` | Status 401 | Crítica | Sim |

## Módulo: Usuários (API)

| ID | Título | Método e rota | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|
| CT-API-USR-01 | Criar usuário | `POST /usuarios` | Status 201, mensagem de sucesso e `_id` do tipo string | Alta | Sim |
| CT-API-USR-02 | Email duplicado | `POST /usuarios` | Status 400 informando email já utilizado | Alta | Sim |
| CT-API-USR-03 | Campos obrigatórios ausentes | `POST /usuarios` | Status 400 detalhando nome, email e password | Alta | Sim |
| CT-API-USR-04 | Listar usuários | `GET /usuarios` | Status 200, campo `quantidade` e array com contrato esperado | Média | Sim |
| CT-API-USR-05 | Consultar id inexistente | `GET /usuarios/{id}` | Status 400 e mensagem "Usuário não encontrado" | Média | Sim |
| CT-API-USR-06 | Alterar usuário | `PUT /usuarios/{id}` | Status 200 e alteração confirmada em nova consulta | Alta | Sim |
| CT-API-USR-07 | Excluir usuário | `DELETE /usuarios/{id}` | Status 200 e consulta posterior retorna 400 | Alta | Sim |

## Módulo: Produtos (API)

| ID | Título | Método e rota | Resultado esperado | Prioridade | Automatizado |
|---|---|---|---|---|---|
| CT-API-PRD-01 | Listar produtos | `GET /produtos` | Status 200 e contrato com nome, preço, descrição, quantidade e `_id` | Média | Sim |
| CT-API-PRD-02 | Administrador cadastra produto | `POST /produtos` | Status 201 e `_id` retornado | Alta | Sim |
| CT-API-PRD-03 | Usuário comum não cadastra produto | `POST /produtos` | Status 403 informando rota exclusiva para administradores | Crítica | Sim |
| CT-API-PRD-04 | Produto com nome duplicado | `POST /produtos` | Status 400 informando nome já existente | Média | Sim |
| CT-API-PRD-05 | Excluir produto | `DELETE /produtos/{id}` | Status 200 e mensagem de exclusão | Alta | Sim |
| CT-API-PRD-06 | Busca sem resultado | `GET /produtos?nome=` | Status 200, quantidade zero e array vazio | Baixa | Sim |

---

**Total planejado:** 40 casos de teste, todos automatizados.
