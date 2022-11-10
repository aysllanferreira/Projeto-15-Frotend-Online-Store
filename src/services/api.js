export async function getCategories() {
  // Implemente aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductByCategory(param) {
  const url = ` https://api.mercadolibre.com/sites/MLB/search?category=${param}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getProductById(param) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const url = `https://api.mercadolibre.com/items/${param}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// API Categories https://api.mercadolibre.com/sites/MLB/categories
// API CategoryAndQuery https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
// API ProductById https://api.mercadolibre.com/items/$PRODUCT_ID
