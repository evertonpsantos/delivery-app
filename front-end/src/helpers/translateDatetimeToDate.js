function translateDatetimeToDate(arr) {
  const mappedArray = arr.map((e) => {
    const toDate = new Date(e.saleDate);
    const year = toDate.getUTCFullYear();
    let month = (toDate.getUTCMonth() + 1).toString();
    let day = toDate.getUTCDate().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    if (month.length < 2) {
      month = `0${month}`;
    }
    const dateString = `${day}/${month}/${year}`;
    const newDate = { ...e, saleDate: dateString };
    return newDate;
  });
  return mappedArray;
}

export default translateDatetimeToDate;
