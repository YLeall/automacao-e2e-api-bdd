import { test, expect, APIRequestContext } from '@playwright/test';
import { novoUsuario } from '../helpers/factory';

/**
 * CT-API-USR - CRUD de usuarios do ServeRest.
 * Valida status, contrato de resposta e tratamento de erro.
 */
test.describe('CT-API-USR - Usuarios', () => {
  let criadoId: string;

  test('CT-API-USR-01 - POST /usuarios cria usuario e retorna 201 com id', async ({ request }) => {
    const usuario = novoUsuario();
    const resposta = await request.post('/usuarios', { data: usuario });

    expect(resposta.status()).toBe(201);
    const corpo = await resposta.json();
    expect(corpo.message).toContain('Cadastro realizado com sucesso');
    expect(corpo).toHaveProperty('_id');
    expect(typeof corpo._id).toBe('string');
    criadoId = corpo._id;
  });

  test('CT-API-USR-02 - POST /usuarios com email duplicado retorna 400', async ({ request }) => {
    const usuario = novoUsuario();
    const primeira = await request.post('/usuarios', { data: usuario });
    expect(primeira.status()).toBe(201);

    const segunda = await request.post('/usuarios', { data: usuario });
    expect(segunda.status()).toBe(400);
    expect((await segunda.json()).message).toContain('Este email já está sendo usado');
  });

  test('CT-API-USR-03 - POST /usuarios sem campos obrigatorios retorna 400 detalhando os campos', async ({ request }) => {
    const resposta = await request.post('/usuarios', { data: {} });

    expect(resposta.status()).toBe(400);
    const corpo = await resposta.json();
    expect(corpo).toHaveProperty('nome');
    expect(corpo).toHaveProperty('email');
    expect(corpo).toHaveProperty('password');
  });

  test('CT-API-USR-04 - GET /usuarios retorna 200 e lista com contrato esperado', async ({ request }) => {
    const resposta = await request.get('/usuarios');

    expect(resposta.status()).toBe(200);
    const corpo = await resposta.json();
    expect(corpo).toHaveProperty('quantidade');
    expect(Array.isArray(corpo.usuarios)).toBe(true);

    const [primeiro] = corpo.usuarios;
    expect(primeiro).toMatchObject({
      nome: expect.any(String),
      email: expect.any(String),
      administrador: expect.any(String),
      _id: expect.any(String),
    });
  });

  test('CT-API-USR-05 - GET /usuarios/{id} inexistente retorna 400 com mensagem clara', async ({ request }) => {
    const resposta = await request.get('/usuarios/idQueNaoExiste00');

    expect(resposta.status()).toBe(400);
    expect((await resposta.json()).message).toContain('não encontrado');
  });

  test('CT-API-USR-06 - PUT /usuarios/{id} altera o cadastro e retorna 200', async ({ request }) => {
    const usuario = novoUsuario();
    const criacao = await request.post('/usuarios', { data: usuario });
    const { _id } = await criacao.json();

    const resposta = await request.put(`/usuarios/${_id}`, {
      data: { ...usuario, nome: 'Nome Atualizado pela Suite' },
    });

    expect(resposta.status()).toBe(200);
    expect((await resposta.json()).message).toContain('alterado com sucesso');

    const consulta = await request.get(`/usuarios/${_id}`);
    expect((await consulta.json()).nome).toBe('Nome Atualizado pela Suite');
  });

  test('CT-API-USR-07 - DELETE /usuarios/{id} remove o cadastro e retorna 200', async ({ request }) => {
    const criacao = await request.post('/usuarios', { data: novoUsuario() });
    const { _id } = await criacao.json();

    const resposta = await request.delete(`/usuarios/${_id}`);
    expect(resposta.status()).toBe(200);
    expect((await resposta.json()).message).toContain('excluído com sucesso');

    const consulta = await request.get(`/usuarios/${_id}`);
    expect(consulta.status()).toBe(400);
  });
});
