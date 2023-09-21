import { createObjectCsvWriter } from "csv-writer";

async function storeListIdUrl(list) {
  /*
  list parameter expects data in shape of
  [
    {
      'id': 123456,
      'url': 'https://.....'
    }
  ]
  */
  // Create a CSV writer object to write data to a CSV file.
  const csvWriter = createObjectCsvWriter({
    path: "src/data/ItemIdWithUrl.csv", // Specify the file path for the CSV file.
    header: [
      { id: "id", title: "ID" }, // Define the CSV file headers (ID and URL).
      { id: "url", title: "URL" },
    ],
    alwaysQuote: true, // Ensure that values are enclosed in double quotes in the CSV file.
  });

  try {
    // Write the records in the 'list' array to the CSV file using the CSV writer.
    await csvWriter.writeRecords(list);

    // Log a success message when the data is successfully recorded.
    console.log("Data IDs and links recorded");
  } catch (e) {
    // Handle any errors that occur during the writing process and log the error message.
    console.log(e);
  }
}

async function storeTruckInfo(truckInfo, type) {
  /*
  truckInfo parameter expects data in shape of
  [
    {
      'id': 123456,
      'title': 'abcsd',
      'price': 1234,
      'mileage': xyw km,
      'power': 1200
    }
  ]
  */

  let path;

  // Determine the file path based on the 'type' parameter.
  if (type === "all") {
    path = "src/data/AllTruckInfo.csv"; // Path for storing information of all trucks.
  }

  if (type === "initial") {
    path = "src/data/InitialPageTruckInfo.csv"; // Path for storing information of trucks from the initial page.
  }

  // Create a CSV writer object to write data to the specified CSV file.
  const csvWriter = createObjectCsvWriter({
    path, // Use the determined file path.
    header: [
      { id: "id", title: "ID" },
      { id: "title", title: "TITLE" },
      { id: "price", title: "PRICE" },
      { id: "mileage", title: "MILEAGE" },
      { id: "power", title: "POWER" },
    ],
    alwaysQuote: true, // Ensure that values are enclosed in double quotes in the CSV file.
  });

  try {
    // Write the truck information records in the 'truckInfo' array to the CSV file using the CSV writer.
    await csvWriter.writeRecords(truckInfo);

    // Log a success message when the truck information is successfully recorded.
    console.log("Truck information recorded");
  } catch (e) {
    // Handle any errors that occur during the writing process and log the error message.
    console.log(e);
  }
}

export { storeTruckInfo, storeListIdUrl };
