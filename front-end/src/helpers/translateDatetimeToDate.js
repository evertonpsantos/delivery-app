function translateDatetimeToDate(arr) {
  const mappedArray = arr.map((e) => {
    const toDate = new Date(e.saleDate);
    const year = toDate.getUTCFullYear();
    const month = toDate.getUTCMonth() + 1;
    let day = toDate.getUTCDate();
    if (day.length < 2) {
      day = `0${day}`;
    }
    const dateString = `${month}/${day}/${year}`;
    const newDate = { ...e, saleDate: dateString };
    return newDate;
  });
  return mappedArray;
}

export default translateDatetimeToDate;
