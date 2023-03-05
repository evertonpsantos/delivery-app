const NUMBER10 = 10;

function translateDatetimeToDate(arr) {
  const mappedArray = arr.map((e) => {
    const toDate = new Date(e.saleDate);
    const date = toDate.toLocaleString();
    const dateString = date.slice(0, NUMBER10);
    const newDate = { ...e, saleDate: dateString };
    return newDate;
  });
  return mappedArray;
}

export default translateDatetimeToDate;
