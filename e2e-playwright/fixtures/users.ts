/**
 * Usuarios do Sauce Demo. O ambiente expoe contas que reproduzem
 * comportamentos defeituosos de proposito, o que permite demonstrar
 * deteccao de defeito e nao apenas caminho feliz.
 */
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'usuario_inexistente', password: 'senha_errada' },
} as const;

export const checkoutData = {
  valid: { firstName: 'Yan', lastName: 'Leal', postalCode: '40000-000' },
  missingPostalCode: { firstName: 'Yan', lastName: 'Leal', postalCode: '' },
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  tshirt: 'Sauce Labs Bolt T-Shirt',
} as const;
