# Relatos de Defeito

Defeitos encontrados durante a execução dos testes planejados e das sessões
exploratórias. Cada relato traz passos de reprodução, ambiente, resultado esperado
contra obtido, severidade e evidência.

---

## BUG-001 | Todos os produtos exibem a mesma imagem

| Campo | Valor |
|---|---|
| **Severidade** | Alta |
| **Prioridade** | Alta |
| **Módulo** | Catálogo de produtos |
| **Ambiente** | Sauce Demo, Chromium 131, Windows 11, resolução 1280x800 |
| **Usuário** | `problem_user` |
| **Teste relacionado** | CT-BUG-01 |

**Passos para reproduzir**

1. Acessar https://www.saucedemo.com
2. Autenticar com `problem_user` / `secret_sauce`
3. Observar as imagens dos seis produtos na listagem

**Resultado esperado**
Cada produto exibe a imagem correspondente ao seu item.

**Resultado obtido**
Os seis produtos exibem a mesma imagem, de um cachorro, em vez da foto do produto.

**Evidência**
Captura de tela anexada pelo relatório do Playwright em `playwright-report/`,
gerada automaticamente na falha.

**Impacto**
O cliente não consegue distinguir visualmente os produtos, o que compromete a
decisão de compra e tende a aumentar a taxa de devolução.

---

## BUG-002 | Botão de remover não responde para parte dos produtos

| Campo | Valor |
|---|---|
| **Severidade** | Alta |
| **Prioridade** | Alta |
| **Módulo** | Carrinho |
| **Ambiente** | Sauce Demo, Chromium 131, Windows 11 |
| **Usuário** | `problem_user` |
| **Teste relacionado** | CT-BUG-02 |

**Passos para reproduzir**

1. Autenticar com `problem_user` / `secret_sauce`
2. Adicionar "Sauce Labs Backpack" ao carrinho
3. Confirmar que o contador exibe 1
4. Acionar o botão Remove do mesmo produto

**Resultado esperado**
O produto sai do carrinho e o contador volta a zero.

**Resultado obtido**
O botão não produz efeito. O produto permanece no carrinho e o contador continua
em 1.

**Impacto**
O cliente não consegue desistir de um item e precisa limpar a sessão para corrigir
o pedido. Fluxo de compra travado sem alternativa na interface.

---

## BUG-003 | Checkout permite avançar com carrinho vazio

| Campo | Valor |
|---|---|
| **Severidade** | Média |
| **Prioridade** | Média |
| **Módulo** | Checkout |
| **Ambiente** | Sauce Demo, Chromium 131, Windows 11 |
| **Usuário** | `standard_user` |
| **Teste relacionado** | CT-CHK-06 |

**Passos para reproduzir**

1. Autenticar com `standard_user` / `secret_sauce`
2. Sem adicionar nenhum produto, abrir o carrinho
3. Acionar Checkout
4. Preencher nome, sobrenome e CEP e continuar
5. Acionar Finish

**Resultado esperado**
O botão de checkout deveria estar desabilitado com o carrinho vazio, ou o sistema
deveria exibir mensagem informando que não há itens no pedido.

**Resultado obtido**
O sistema permite percorrer todo o fluxo e exibe a confirmação "Thank you for your
order!" para um pedido sem nenhum item.

**Impacto**
Gera pedido vazio na base, o que polui o relatório de vendas e pode disparar
processos de separação e envio sem conteúdo.

---

## BUG-004 | Tempo de login acima do aceitável

| Campo | Valor |
|---|---|
| **Severidade** | Média |
| **Prioridade** | Média |
| **Módulo** | Autenticação |
| **Ambiente** | Sauce Demo, Chromium 131, Windows 11, conexão de 100 Mbps |
| **Usuário** | `performance_glitch_user` |
| **Teste relacionado** | CT-BUG-03 |

**Passos para reproduzir**

1. Acessar https://www.saucedemo.com
2. Autenticar com `performance_glitch_user` / `secret_sauce`
3. Medir o intervalo entre o clique em Login e a exibição da listagem

**Resultado esperado**
O carregamento da área logada conclui em menos de 5 segundos.

**Resultado obtido**
O carregamento ultrapassa consistentemente 5 segundos, com medições registradas na
mensagem de falha do teste automatizado.

**Impacto**
Percepção de lentidão no primeiro contato com o sistema, com risco de abandono
antes mesmo de o cliente ver o catálogo.

---

## Template para novos relatos

```markdown
## BUG-XXX | Título curto e descritivo

| Campo | Valor |
|---|---|
| **Severidade** | Crítica / Alta / Média / Baixa |
| **Prioridade** | Alta / Média / Baixa |
| **Módulo** | |
| **Ambiente** | Aplicação, navegador e versão, sistema operacional, resolução |
| **Usuário** | |
| **Teste relacionado** | |

**Passos para reproduzir**
1.
2.

**Resultado esperado**

**Resultado obtido**

**Evidência**
Captura de tela, vídeo ou log.

**Impacto**
O que o usuário final deixa de conseguir fazer.
```
