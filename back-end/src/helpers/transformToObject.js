const transformToObject = (a, b, quantity) => {
  const obj = {
    id: a.id,
    totalPrice: a.totalPrice,
    saleDate: a.saleDate,
    status: a.status,
    name: b.name,
    price: b.price,
    urlImage: b.urlImage,
    quantity,
  };
  return obj;
};

module.exports = transformToObject;
