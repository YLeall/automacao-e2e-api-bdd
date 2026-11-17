import { test, expect } from '@playwright/test';
import { novoUsuario } from '../helpers/factory';

/**
 * CT-API-AUTH - Login e controle de acesso por token.
 */
test.describe('CT-API-AUTH - Autenticacao', () => {
  test('CT-API-AUTH-01 - POST /login com credenciais validas retorna 200 e token Bearer', async ({ request }) => {
    const usuario = novoUsuario();
    await request.post('/usuarios', { data: usuario });

    const resposta = await request.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    });

    expect(resposta.status()).toBe(200);
    const corpo = await resposta.json();
    expect(corpo.message).toContain('Login realizado com sucesso');
    expect(corpo.authorization).toMatch(/^Bearer /);
  });

  test('CT-API-AUTH-02 - POST /login com senha incorreta retorna 401', async ({ request }) => {
    const usuario = novoUsuario();
    await request.post('/usuarios', { data: usuario });

    const resposta = await request.post('/login', {
      data: { email: usuario.email, password: 'senhaErrada999' },
    });

    expect(resposta.status()).toBe(401);
    expect((await resposta.json()).message).toContain('inválidos');
  });

  test('CT-API-AUTH-03 - POST /login com email nao cadastrado retorna 401', async ({ request }) => {
    const resposta = await request.post('/login', {
      data: { email: 'nao.existe.aqui@teste.com', password: 'qualquerSenha' },
    });

    expect(resposta.status()).toBe(401);
  });

  test('CT-API-AUTH-04 - POST /produtos sem token retorna 401', async ({ request }) => {
    const resposta = await request.post('/produtos', {
      data: { nome: 'Sem token', preco: 10, descricao: 'teste', quantidade: 1 },
    });

    expect(resposta.status()).toBe(401);
    expect((await resposta.json()).message).toContain('Token de acesso ausente');
  });

  test('CT-API-AUTH-05 - POST /produtos com token invalido retorna 401', async ({ request }) => {
    const resposta = await request.post('/produtos', {
      headers: { Authorization: 'Bearer token.invalido.aqui' },
      data: { nome: 'Token invalido', preco: 10, descricao: 'teste', quantidade: 1 },
    });

    expect(resposta.status()).toBe(401);
  });
});
