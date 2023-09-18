import axios from "axios";
import config from "./config/config.js";
import * as cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";
import { getNextPageUrl, getListIdWithUrl } from "./src/scrap/scrapping.js";

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
    path: "src/data/id_Url.csv",
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

async function main() {
  try {
    const response = await axios.get(config.scrapeUrl);

    const $ = cheerio.load(response.data);

    const nextPageUrls = getNextPageUrl($.html());
    await storeNextPageUrls(nextPageUrls);

    const listIdUrl = getListIdWithUrl($.html());
    await storeListIdUrl(listIdUrl);
  } catch (e) {
    console.log(e);
  }
}

main();
