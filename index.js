// Import necessary libraries and modules.
import axios from "axios"; // For making HTTP requests.
import config from "./config/config.js"; // Configuration file.
import * as cheerio from "cheerio"; // For parsing HTML content.

// Import functions for web scraping and data storage.
import {
  getNextPageUrl,
  getListIdWithUrl,
  getTotalAdsCount,
  scrapeTruckItem,
  scrapeAllPages,
} from "./src/scrap/scrapping.js";
import { storeTruckInfo, storeListIdUrl } from "./src/dataStore.js";

// Main function to execute the web scraping process.
async function main() {
  try {
    // Send an HTTP GET request to the initial URL specified in the configuration.
    const response = await axios.get(config.scrapeUrl);

    // Load the HTML content of the response using Cheerio.
    const $ = cheerio.load(response.data);

    // Get the URL of the next page using the getNextPageUrl function.
    const nextPageUrl = await getNextPageUrl(config.scrapeUrl, 1);
    console.log(nextPageUrl);

    // Fetch a list of item IDs with their corresponding URLs using the getListIdWithUrl function.
    const listIdUrl = await getListIdWithUrl(config.scrapeUrl);

    // Store the list of item IDs and URLs to a file using the storeListIdUrl function.
    await storeListIdUrl(listIdUrl);

    // Get the total count of advertisements using the getTotalAdsCount function.
    const totalAdsCount = await getTotalAdsCount(config.scrapeUrl);
    console.log(`Total ads count: ${totalAdsCount}`);

    // Scrape truck information from the initial page using the scrapeTruckItem function.
    const initialPageTruckData = await scrapeTruckItem(config.scrapeUrl);

    // Store the scraped truck information to a file with the "initial" type.
    await storeTruckInfo(initialPageTruckData, "initial");

    // Scrape truck information from all pages and all ads using the scrapeAllPages function.
    const allScrapedData = await scrapeAllPages();

    // Store all scraped truck information to a file with the "all" type.
    await storeTruckInfo(allScrapedData, "all");
  } catch (e) {
    // Handle and log any errors that occur during the scraping process.
    console.log(e);
  }
}

// Execute the main function to start the web scraping process.
main();
