/** Gera massa de dados unica por execucao, evitando colisao entre rodadas. */
export function novoUsuario(administrador: 'true' | 'false' = 'true') {
  const carimbo = Date.now() + Math.floor(Math.random() * 1000);
  return {
    nome: `QA Portfolio ${carimbo}`,
    email: `qa.portfolio.${carimbo}@teste.com`,
    password: 'senhaSegura123',
    administrador,
  };
}

export function novoProduto() {
  const carimbo = Date.now() + Math.floor(Math.random() * 1000);
  return {
    nome: `Produto QA ${carimbo}`,
    preco: 250,
    descricao: 'Produto criado pela suite automatizada de testes de API',
    quantidade: 10,
  };
}
