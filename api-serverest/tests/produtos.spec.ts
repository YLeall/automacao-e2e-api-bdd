import { test, expect } from '@playwright/test';
import { novoUsuario, novoProduto } from '../helpers/factory';

/**
 * CT-API-PRD - Produtos, com autorizacao por perfil.
 * Demonstra o uso de token e a separacao entre usuario comum e administrador.
 */
test.describe('CT-API-PRD - Produtos', () => {
  async function autenticar(
    request: import('@playwright/test').APIRequestContext,
    administrador: 'true' | 'false' = 'true',
  ): Promise<string> {
    const usuario = novoUsuario(administrador);
    await request.post('/usuarios', { data: usuario });
    const login = await request.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    });
    return (await login.json()).authorization;
  }

  test('CT-API-PRD-01 - GET /produtos retorna 200 e lista com contrato esperado', async ({ request }) => {
    const resposta = await request.get('/produtos');

    expect(resposta.status()).toBe(200);
    const corpo = await resposta.json();
    expect(corpo).toHaveProperty('quantidade');
    expect(Array.isArray(corpo.produtos)).toBe(true);

    const [primeiro] = corpo.produtos;
    expect(primeiro).toMatchObject({
      nome: expect.any(String),
      preco: expect.any(Number),
      descricao: expect.any(String),
      quantidade: expect.any(Number),
      _id: expect.any(String),
    });
  });

  test('CT-API-PRD-02 - administrador cadastra produto e recebe 201', async ({ request }) => {
    const token = await autenticar(request, 'true');

    const resposta = await request.post('/produtos', {
      headers: { Authorization: token },
      data: novoProduto(),
    });

    expect(resposta.status()).toBe(201);
    const corpo = await resposta.json();
    expect(corpo.message).toContain('Cadastro realizado com sucesso');
    expect(corpo).toHaveProperty('_id');
  });

  test('CT-API-PRD-03 - usuario comum nao cadastra produto e recebe 403', async ({ request }) => {
    const token = await autenticar(request, 'false');

    const resposta = await request.post('/produtos', {
      headers: { Authorization: token },
      data: novoProduto(),
    });

    expect(resposta.status()).toBe(403);
    expect((await resposta.json()).message).toContain('Rota exclusiva para administradores');
  });

  test('CT-API-PRD-04 - produto com nome duplicado retorna 400', async ({ request }) => {
    const token = await autenticar(request, 'true');
    const produto = novoProduto();

    const primeira = await request.post('/produtos', {
      headers: { Authorization: token },
      data: produto,
    });
    expect(primeira.status()).toBe(201);

    const segunda = await request.post('/produtos', {
      headers: { Authorization: token },
      data: produto,
    });
    expect(segunda.status()).toBe(400);
    expect((await segunda.json()).message).toContain('Já existe produto com esse nome');
  });

  test('CT-API-PRD-05 - DELETE /produtos/{id} remove o produto cadastrado', async ({ request }) => {
    const token = await autenticar(request, 'true');

    const criacao = await request.post('/produtos', {
      headers: { Authorization: token },
      data: novoProduto(),
    });
    const { _id } = await criacao.json();

    const resposta = await request.delete(`/produtos/${_id}`, {
      headers: { Authorization: token },
    });

    expect(resposta.status()).toBe(200);
    expect((await resposta.json()).message).toContain('excluído com sucesso');
  });

  test('CT-API-PRD-06 - busca por nome inexistente retorna lista vazia com 200', async ({ request }) => {
    const resposta = await request.get('/produtos?nome=produtoQueCertamenteNaoExiste123456');

    expect(resposta.status()).toBe(200);
    const corpo = await resposta.json();
    expect(corpo.quantidade).toBe(0);
    expect(corpo.produtos).toHaveLength(0);
  });
});
