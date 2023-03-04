const NUMBER10 = 10;
const NUMBER4 = 4;
const NUMBER5 = 5;
const NUMBER7 = 7;
const NUMBER8 = 8;

function translateDatetimeToDate(arr) {
  const mappedArray = arr.map((e) => {
    const date = e.saleDate.toString();
    const sliceDate = date.slice(0, NUMBER10);
    const year = sliceDate.slice(0, NUMBER4);
    const month = sliceDate.slice(NUMBER5, NUMBER7);
    const day = sliceDate.slice(NUMBER8, NUMBER10);

    const stringDate = `${day}/${month}/${year}`;
    const a = { ...e, saleDate: stringDate };
    return a;
  });
  return mappedArray;
}

export default translateDatetimeToDate;
