import { createObjectCsvWriter } from "csv-writer";

async function storeListIdUrl(list) {
  const csvWriter = createObjectCsvWriter({
    path: "src/data/ItemIdWithUrl.csv",
    header: [
      { id: "id", title: "ID" },
      { id: "url", title: "URL" },
    ],
    alwaysQuote: true,
  });

  try {
    await csvWriter.writeRecords(list);
    console.log("data id and links recorded");
  } catch (e) {
    console.log(e);
  }
}

async function storeTruckInfo(turckInfo, type) {
  let path;

  if (type === "all") {
    path = "src/data/AllTruckInfo.csv";
  }

  if (type === "initial") {
    path = "src/data/InitialPageTruckInfo.csv";
  }
  const csvWriter = createObjectCsvWriter({
    path,
    header: [
      { id: "id", title: "ID" },
      { id: "title", title: "TITLE" },
      { id: "price", title: "PRICE" },
      { id: "mileage", title: "MILEAGE" },
      { id: "power", title: "POWER" },
    ],
    alwaysQuote: true,
  });

  try {
    await csvWriter.writeRecords(turckInfo);
    console.log("truck info recorded");
  } catch (e) {
    console.log(e);
  }
}

export { storeTruckInfo, storeListIdUrl };
