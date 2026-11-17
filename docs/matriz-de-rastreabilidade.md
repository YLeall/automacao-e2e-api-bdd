# Matriz de Rastreabilidade

Liga cada requisito aos casos de teste que o cobrem e ao arquivo de automação
correspondente. Serve para responder, em revisão, se um requisito está coberto e
onde a evidência está.

| Req. | Requisito | Casos de teste | Arquivo de automação | Cobertura |
|---|---|---|---|---|
| RF-01 | O sistema deve permitir autenticação com usuário e senha válidos | CT-LOGIN-01 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-02 | O sistema deve rejeitar credenciais inválidas sem revelar se o usuário existe | CT-LOGIN-02, CT-LOGIN-03 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-03 | O sistema deve validar campos obrigatórios no login | CT-LOGIN-04, CT-LOGIN-05 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-04 | O sistema deve impedir o acesso de usuário bloqueado | CT-LOGIN-06 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-05 | O sistema deve proteger as páginas internas contra acesso sem sessão | CT-LOGIN-07 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-06 | O sistema deve encerrar a sessão no logout | CT-LOGIN-08 | `e2e-playwright/tests/login.spec.ts` | Completa |
| RF-07 | O catálogo deve listar todos os produtos disponíveis com preço | CT-INV-01, CT-INV-08 | `e2e-playwright/tests/inventory.spec.ts` | Completa |
| RF-08 | O catálogo deve permitir ordenação por nome e por preço | CT-INV-02, CT-INV-03, CT-INV-04, CT-INV-05 | `e2e-playwright/tests/inventory.spec.ts` | Completa |
| RF-09 | O carrinho deve refletir adição e remoção de produtos | CT-INV-06, CT-INV-07, CT-CHK-01 | `e2e-playwright/tests/inventory.spec.ts`, `checkout.spec.ts` | Completa |
| RF-10 | O checkout deve validar os campos obrigatórios | CT-CHK-03, CT-CHK-04 | `e2e-playwright/tests/checkout.spec.ts` | Completa |
| RF-11 | O checkout deve calcular o total corretamente | CT-CHK-05 | `e2e-playwright/tests/checkout.spec.ts` | Completa |
| RF-12 | O sistema deve concluir a compra e confirmar o pedido | CT-CHK-02 | `e2e-playwright/tests/checkout.spec.ts` | Completa |
| RF-13 | O checkout não deve prosseguir com carrinho vazio | CT-CHK-06 | `e2e-playwright/tests/checkout.spec.ts` | Parcial, defeito aberto em BUG-003 |
| RF-14 | A API deve autenticar e emitir token de acesso | CT-API-AUTH-01, CT-API-AUTH-02, CT-API-AUTH-03 | `api-serverest/tests/autenticacao.spec.ts` | Completa |
| RF-15 | A API deve bloquear operações protegidas sem token válido | CT-API-AUTH-04, CT-API-AUTH-05 | `api-serverest/tests/autenticacao.spec.ts` | Completa |
| RF-16 | A API deve oferecer CRUD completo de usuários | CT-API-USR-01, CT-API-USR-04, CT-API-USR-06, CT-API-USR-07 | `api-serverest/tests/usuarios.spec.ts` | Completa |
| RF-17 | A API deve impedir cadastro com email duplicado | CT-API-USR-02 | `api-serverest/tests/usuarios.spec.ts` | Completa |
| RF-18 | A API deve validar campos obrigatórios e informar quais faltam | CT-API-USR-03 | `api-serverest/tests/usuarios.spec.ts` | Completa |
| RF-19 | A API deve restringir escrita de produtos a administradores | CT-API-PRD-02, CT-API-PRD-03 | `api-serverest/tests/produtos.spec.ts` | Completa |
| RF-20 | A API deve impedir produto com nome duplicado | CT-API-PRD-04 | `api-serverest/tests/produtos.spec.ts` | Completa |
| RF-21 | A API deve permitir busca de produtos e responder lista vazia quando não houver resultado | CT-API-PRD-01, CT-API-PRD-06 | `api-serverest/tests/produtos.spec.ts` | Completa |
| RF-22 | A API deve permitir exclusão de produto | CT-API-PRD-05 | `api-serverest/tests/produtos.spec.ts` | Completa |

## Cobertura por módulo

| Módulo | Requisitos | Casos | Situação |
|---|---|---|---|
| Autenticação web | 6 | 8 | Coberto |
| Catálogo | 2 | 6 | Coberto |
| Carrinho e checkout | 5 | 6 | 1 requisito com defeito aberto |
| API de autenticação | 2 | 5 | Coberto |
| API de usuários | 3 | 7 | Coberto |
| API de produtos | 4 | 6 | Coberto |

## Cenários BDD

Os critérios de aceite escritos em Gherkin em `bdd-cypress/cypress/e2e/features/`
cobrem os requisitos RF-01 a RF-04, RF-09, RF-10 e RF-12 em linguagem de negócio,
para revisão com pessoas fora da área técnica.
