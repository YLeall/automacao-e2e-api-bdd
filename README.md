# QA Portfolio - Automação de Testes Web, API e BDD

Projeto de portfólio que demonstra, de ponta a ponta, o trabalho de um analista de QA:
planejamento de testes, escrita de casos de teste, automação E2E, testes de API,
cenários em Gherkin/BDD, relato de defeitos com evidência e execução contínua em CI.

**Autor:** Yan Leal Nascimento
**Contato:** yanlealnasc@gmail.com | [github.com/YLeall](https://github.com/YLeall)

---

## O que este repositório demonstra

| Competência | Onde está |
|---|---|
| Plano de testes e estratégia | [`docs/plano-de-testes.md`](docs/plano-de-testes.md) |
| Casos de teste estruturados | [`docs/casos-de-teste.md`](docs/casos-de-teste.md) |
| Matriz de rastreabilidade | [`docs/matriz-de-rastreabilidade.md`](docs/matriz-de-rastreabilidade.md) |
| Relato de defeitos com evidência | [`docs/bug-reports.md`](docs/bug-reports.md) |
| Automação E2E com Playwright + Page Object Model | [`e2e-playwright/`](e2e-playwright) |
| BDD com Cypress + Cucumber (Gherkin em pt-BR) | [`bdd-cypress/`](bdd-cypress) |
| Testes de API REST (contrato, status, erro) | [`api-serverest/`](api-serverest) |
| Integração contínua | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |

## Sistemas sob teste

| Camada | Aplicação | Por quê |
|---|---|---|
| Web E2E | [Sauce Demo](https://www.saucedemo.com) | Loja com login, carrinho e checkout, e usuários que reproduzem falhas de propósito |
| API REST | [ServeRest](https://serverest.dev) | API pública de e-commerce com CRUD, autenticação por token e validação de contrato |

Ambos são ambientes públicos criados para treino de QA, então nenhum teste aqui
roda contra sistema de terceiros sem autorização.

---

## Como executar

Pré-requisitos: Node.js 20 ou superior.

```bash
git clone https://github.com/YLeall/automacao-e2e-api-bdd.git
cd automacao-e2e-api-bdd
npm install
```

### Testes E2E com Playwright

```bash
npx playwright install --with-deps chromium
npm run test:e2e              # execução headless
npm run test:e2e:headed       # com navegador visível
npm run report:e2e            # abre o relatório HTML
```

### Testes de API

```bash
npm run test:api
```

### Testes BDD com Cypress

```bash
npm run test:bdd              # headless
npm run cy:open               # modo interativo
```

### Tudo de uma vez

```bash
npm run test:all
```

---

## Estrutura

```
qa-portfolio/
├── docs/                      Documentação de QA (plano, casos, rastreabilidade, bugs)
├── e2e-playwright/
│   ├── pages/                 Page Objects (login, inventário, carrinho, checkout)
│   ├── fixtures/              Massa de dados e usuários de teste
│   └── tests/                 Specs organizadas por funcionalidade
├── api-serverest/
│   └── tests/                 Autenticação, CRUD de usuários e produtos, contrato
├── bdd-cypress/
│   └── cypress/e2e/
│       ├── features/          Arquivos .feature em Gherkin pt-BR
│       └── step_definitions/  Implementação dos passos
└── .github/workflows/ci.yml   Pipeline que roda API, E2E e BDD a cada push
```

## Decisões técnicas

**Page Object Model.** Cada tela tem uma classe que concentra seletores e ações.
Quando o front muda um seletor, a correção acontece em um único arquivo e não em
cada spec.

**Seletores por `data-test`.** O Sauce Demo expõe atributos próprios de teste.
Usar esses atributos em vez de classes CSS evita que mudança de estilo quebre a suíte.

**Independência entre testes.** Nenhum teste depende do estado deixado por outro.
Cada um faz seu próprio setup, o que permite rodar em paralelo e re-executar só o
que falhou.

**Separação entre falha de front e falha de back.** A suíte de API valida contrato,
status e tratamento de erro de forma isolada. Quando um fluxo de tela quebra, já
existe evidência de qual camada falhou antes de abrir o chamado.

**Três níveis de severidade no bug report.** Cada defeito registrado traz passos de
reprodução, ambiente, resultado esperado contra obtido, severidade e evidência.

---

## Resultado da última execução

O pipeline em `.github/workflows/ci.yml` publica o relatório HTML do Playwright
como artefato. Os defeitos encontrados no sistema sob teste estão documentados em
[`docs/bug-reports.md`](docs/bug-reports.md), incluindo os reproduzidos pelos
usuários `problem_user` e `performance_glitch_user` do Sauce Demo.

---

## Observações de execução

Os testes de API rodam contra o ambiente público do ServeRest e os testes de
interface contra o Sauce Demo. Ambos dependem de acesso à internet, então uma
falha de rede aparece como falha de teste. O pipeline usa `retries: 1` para API e
`retries: 2` para E2E justamente para separar instabilidade de ambiente de
defeito real.

A suíte `defeitos-conhecidos.spec.ts` contém testes marcados com `test.fail()`.
Eles afirmam o comportamento correto e falham de propósito enquanto os defeitos
BUG-001, BUG-002 e BUG-004 existirem. Quando o sistema for corrigido, esses testes
passam a acusar "passou inesperadamente", que é o sinal de que o relato pode ser
fechado.
