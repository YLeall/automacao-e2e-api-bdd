# Plano de Testes

**Projeto:** QA Portfolio
**Responsável:** Yan Leal Nascimento
**Versão:** 1.0

## 1. Objetivo

Validar os fluxos críticos de uma loja virtual, nas camadas de interface e de API,
garantindo que o usuário consiga autenticar, selecionar produtos e concluir uma
compra, e que a API responda com status, contrato e mensagens de erro corretos.

## 2. Escopo

### Dentro do escopo

| Módulo | Camada | Cobertura |
|---|---|---|
| Autenticação | Web e API | Credenciais válidas, inválidas, campos obrigatórios, usuário bloqueado, acesso sem sessão |
| Catálogo de produtos | Web | Listagem, ordenação por nome e preço, exibição de preço |
| Carrinho | Web | Adicionar, remover, contador, persistência entre telas |
| Checkout | Web | Campos obrigatórios, cálculo de total, confirmação do pedido |
| Usuários | API | CRUD completo, duplicidade, validação de campos |
| Produtos | API | CRUD, autorização por perfil, duplicidade, busca |

### Fora do escopo

Testes de carga e estresse, testes de segurança (penetração), compatibilidade com
navegadores legados, acessibilidade conforme WCAG e testes de integração com
gateways de pagamento reais.

## 3. Estratégia

A pirâmide adotada concentra volume na camada de API, que é mais rápida e estável,
e reserva a camada de interface para os fluxos que só existem na tela.

```
        /\        E2E (Playwright)     fluxos de ponta a ponta
       /  \       BDD (Cypress)        critérios de aceite em linguagem de negócio
      /----\      API (Playwright)     contrato, status e regra de autorização
```

**Técnicas aplicadas**

- *Particionamento de equivalência* nos campos de login, separando credencial
  válida, credencial inválida e campo vazio.
- *Análise de valor limite* nos campos obrigatórios do checkout.
- *Tabela de decisão* na autorização da API, cruzando perfil de usuário
  (administrador e comum) com operação (leitura e escrita).
- *Teste exploratório* baseado em risco nas contas defeituosas do ambiente,
  registrado em `bug-reports.md`.

## 4. Ambiente

| Item | Valor |
|---|---|
| Aplicação web | https://www.saucedemo.com |
| API | https://serverest.dev |
| Navegadores | Chromium desktop e emulação Pixel 5 |
| Runtime | Node.js 20 |
| Ferramentas | Playwright, Cypress, Cucumber, GitHub Actions |

## 5. Critérios

**Critério de entrada:** ambiente disponível, massa de dados gerada pela própria
suíte e dependências instaladas.

**Critério de saída:** 100% dos casos planejados executados, nenhum defeito de
severidade crítica em aberto, e os defeitos conhecidos documentados com evidência.

**Critério de suspensão:** indisponibilidade do ambiente ou defeito bloqueante no
login, que impede a execução de qualquer fluxo subsequente.

## 6. Classificação de severidade

| Severidade | Definição | Prazo esperado |
|---|---|---|
| Crítica | Impede o uso do sistema ou causa perda de dados | Correção imediata |
| Alta | Fluxo principal quebrado, sem alternativa | Antes da entrega |
| Média | Fluxo funciona, mas com comportamento incorreto ou contornável | Próxima entrega |
| Baixa | Problema cosmético ou de texto, sem impacto funcional | Backlog |

## 7. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Indisponibilidade do ambiente público | Alto | Retry configurado no CI e execução agendada |
| Dado residual entre execuções | Médio | Massa gerada com carimbo de tempo único por rodada |
| Teste intermitente por tempo de resposta | Médio | Espera explícita por elemento, sem pausa fixa |
| Mudança de seletor no front | Médio | Page Object Model e uso de atributos `data-test` |

## 8. Entregáveis

Casos de teste, matriz de rastreabilidade, relatório de execução em HTML gerado
pelo Playwright, relatos de defeito com evidência e pipeline de execução contínua.
