const { SalesProducts } = require('../database/models/index');
const saleService = require('./salesService');
const productsService = require('./ProductService');
const transformToObject = require('../helpers/transformToObject');

async function findSaleAndProduct(id) {
    try {
      const result = await SalesProducts.findAll({
        where: { saleId: id },
      });

      const dataSale = result.map(async ({ saleId, productId, quantity }) => {
        const saleData = await saleService.findSale(saleId);
        const productData = await productsService.findProduct(productId);

        const obj = transformToObject(saleData, productData, quantity);
        return obj;
      });
      return Promise.all(dataSale);
    } catch (error) {
      return error.message;
    }
}

module.exports = {
  findSaleAndProduct,
};
