import axios from "axios";
import config from "./config/config.js";
import * as cheerio from "cheerio";

import {
  getNextPageUrl,
  getListIdWithUrl,
  getTotalAdsCount,
  scrapeTruckItem,
  scrapeAllPages,
} from "./src/scrap/scrapping.js";
import { storeTruckInfo, storeListIdUrl } from "./src/dataStore.js";

async function main() {
  try {
    const response = await axios.get(config.scrapeUrl);

    const $ = cheerio.load(response.data);

    const nextPageUrl = await getNextPageUrl(config.scrapeUrl, 1);
    console.log(nextPageUrl);

    const listIdUrl = await getListIdWithUrl(config.scrapeUrl);
    await storeListIdUrl(listIdUrl);

    const totalAdsCount = await getTotalAdsCount(config.scrapeUrl);
    console.log(`total ads count: ${totalAdsCount}`);

    const initalPageTruckData = await scrapeTruckItem(config.scrapeUrl);
    await storeTruckInfo(initalPageTruckData, "initial");

    const allScrapedData = await scrapeAllPages();
    await storeTruckInfo(allScrapedData, "all");
  } catch (e) {
    console.log(e);
  }
}

main();
