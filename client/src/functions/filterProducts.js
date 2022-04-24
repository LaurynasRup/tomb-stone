export const filterProducts = (products, filterInputs, fn) => {
  let newArr = [...products];
  if (filterInputs.barcode !== '') {
    newArr = newArr.filter(item =>
      item.barcode.toString().includes(filterInputs.barcode)
    );
  }
  if (filterInputs.type !== '') {
    newArr = newArr.filter(
      item => item.product.product_type === filterInputs.type
    );
  }
  if (filterInputs.length !== '') {
    newArr = newArr.filter(item => item.dimensions.long >= filterInputs.length);
  }
  if (filterInputs.height !== '') {
    newArr = newArr.filter(
      item => item.dimensions.short >= filterInputs.height
    );
  }
  if (filterInputs.width !== '') {
    newArr = newArr.filter(item => item.dimensions.width >= filterInputs.width);
  }
  if (filterInputs.place !== '') {
    newArr = newArr.filter(item =>
      item.warehouse_location.includes(filterInputs.place)
    );
  }
  if (filterInputs.reserved !== '') {
    newArr = newArr.filter(
      item => item.reserved.isReserved === strToBool(filterInputs.reserved)
    );
  }

  const copyArr = [...newArr];

  if (filterInputs.sort === '') {
    newArr = copyArr;
  }
  if (filterInputs.sort === 'length_asc') {
    newArr = newArr.sort((a, b) => a.dimensions.long - b.dimensions.long);
  }
  if (filterInputs.sort === 'length_desc') {
    newArr = newArr.sort((a, b) => b.dimensions.long - a.dimensions.long);
  }
  if (filterInputs.sort === 'height_asc') {
    newArr = newArr.sort((a, b) => a.dimensions.short - b.dimensions.short);
  }
  if (filterInputs.sort === 'height_desc') {
    newArr = newArr.sort((a, b) => b.dimensions.short - a.dimensions.short);
  }
  if (filterInputs.sort === 'width_asc') {
    newArr = newArr.sort((a, b) => a.dimensions.width - b.dimensions.width);
  }
  if (filterInputs.sort === 'width_desc') {
    newArr = newArr.sort((a, b) => b.dimensions.width - a.dimensions.width);
  }

  fn([...newArr]);
};

const strToBool = str => {
  if (str === 'true') return true;
  if (str === 'false') return false;
  return;
};
