import axios from "axios";
import config from "./config/config.js";
import * as cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";
import {
  getNextPageUrl,
  getListIdWithUrl,
  getTotalAdsCount,
  scrapeTruckItem,
} from "./src/scrap/scrapping.js";

async function storeNextPageUrls(urls) {
  const csvWriter = createObjectCsvWriter({
    path: "src/data/links.csv",
    header: [{ id: "url", title: "URL" }],
    alwaysQuote: true,
  });
  try {
    await csvWriter.writeRecords(urls);
    console.log("links recorded!");
  } catch (e) {
    console.log(e);
  }
}

async function storeListIdUrl(list) {
  const csvWriter = createObjectCsvWriter({
    path: "src/data/item_id_with_url.csv",
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

async function storeTruckInfo(turckInfo) {
  const csvWriter = createObjectCsvWriter({
    path: "src/data/inital_page_truck_info.csv",
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

async function main() {
  try {
    const response = await axios.get(config.scrapeUrl);

    const $ = cheerio.load(response.data);

    const nextPageUrls = getNextPageUrl($.html());
    await storeNextPageUrls(nextPageUrls);

    const listIdUrl = getListIdWithUrl($.html());
    await storeListIdUrl(listIdUrl);

    const totalAdsCount = getTotalAdsCount($.html());
    console.log(`total ads count: ${totalAdsCount}`);

    const scrapedTruckData = scrapeTruckItem($.html());
    await storeTruckInfo(scrapedTruckData);
  } catch (e) {
    console.log(e);
  }
}

main();
