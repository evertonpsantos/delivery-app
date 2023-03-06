function translateDatetimeToDate(arr) {
  const mappedArray = arr.map((e) => {
    const toDate = new Date(e.saleDate);
    const year = toDate.getUTCFullYear();
    const month = toDate.getUTCMonth() + 1;
    const day = toDate.getUTCDate();
    const dateString = `${month}-${day}-${year}`;
    const newDate = { ...e, saleDate: dateString };
    return newDate;
  });
  return mappedArray;
}

export default translateDatetimeToDate;
