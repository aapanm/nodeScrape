import * as cheerio from "cheerio";
import config from "../../config/config.js";
import axios from "axios";
import { storeTruckInfo } from "../dataStore.js";

// function to retrieve the URL of the next page based on current page number.
async function getNextPageUrl(pageUrl, currPage) {
  let url;

  try {
    // Send an HTTP GET request to the provided pageUrl.
    const res = await axios.get(pageUrl);

    // Load the HTML content of the response using Cheerio.
    const $ = cheerio.load(res.data);

    // Create a new Cheerio object for HTML manipulation.
    const html = cheerio.load($.html());

    // Select the pagination element on the page.
    const pagination = html("ul.pagination-list");

    const nextPageLinkExists = pagination
      .find("li[title='Next Page']")
      .attr("aria-disabled");

    if (nextPageLinkExists === "false") {
      const nextPageLink = `${config.scrapeUrl}&&page=${currPage + 1}`;
      // Construct the URL for the next page by combining the base URL and the next page link.
      url = nextPageLink;
    } else if (nextPageLinkExists === "true") {
      url = false;
    }
  } catch (e) {
    // Handle any errors that occur during the process.
    console.log(`An error occurred while finding the next page URL ${e}`);

    throw new Error(e);
  }

  // Return the URL of the next page, if found.
  return url;
}

async function getListIdWithUrl(pageUrl) {
  const idUrl = [];

  try {
    // Send an HTTP GET request to the provided pageUrl.
    const res = await axios.get(pageUrl);

    // Load the HTML content of the response using Cheerio.
    const $ = cheerio.load(res.data);

    // Create a new Cheerio object for HTML manipulation.
    const html = cheerio.load($.html());

    // get all ads and store their id with data
    const articles = html("article.ooa-1t80gpj");

    articles.each((idx, elem) => {
      const article = html(elem);
      const dataId = article.attr("data-id");
      const href = article.find("h1 a").attr("href");

      idUrl.push({ id: dataId, url: href });
    });
  } catch (e) {
    console.log(`error occured while scraping id with url, ${e}`);
  }

  // return stored data;
  return idUrl;
}

async function getTotalAdsCount(pageUrl) {
  let adsCount;
  try {
    // Send an HTTP GET request to the provided pageUrl.
    const res = await axios.get(pageUrl);

    // Load the HTML content of the response using Cheerio.
    const $ = cheerio.load(res.data);

    // Create a new Cheerio object for HTML manipulation.
    const html = cheerio.load($.html());

    // geting results div
    const resultPara = html("p.ev5apm50");

    //finding results count
    adsCount = $(resultPara).find("b").first().text();
  } catch (e) {
    console.log(`an error occured while counting ads, ${e}`);
  }

  //return the ads count result
  return adsCount;
}

async function scrapeTruckItem(pageUrl) {
  // Initialize an empty array to store the scraped truck data.
  const truckData = [];

  try {
    // Log the current scraping progress.
    console.log(`Scraping... ${[pageUrl]}`);

    // Send an HTTP GET request to the provided pageUrl.
    const res = await axios.get(pageUrl);

    // Load the HTML content of the response using Cheerio.
    const $ = cheerio.load(res.data);

    // Create a new Cheerio object for HTML manipulation.
    const html = cheerio.load($.html());

    // Select all article elements that represent truck advertisements on the page.
    const articles = html("article.ooa-1t80gpj");

    // Iterate through each truck advertisement on the page.
    articles.each((idx, elem) => {
      // Create a Cheerio object for the current advertisement.
      const article = html(elem);

      // Extract relevant information from the advertisement.
      const itemId = article.attr("data-id");
      const title = article.find("h1 a").text();
      const price = article.find(".ooa-1wb7q8u.ev7e6t814 h3").text();
      const mileage = article
        .find(".ooa-d3dp2q .ooa-13lipl2 dd[data-parameter='mileage']")
        .text();
      const power = article
        .find(".ooa-d3dp2q .ooa-13lipl2 dd[data-parameter='engine_power']")
        .text();

      // Push the extracted data into the truckData array as an object.
      truckData.push({
        id: itemId,
        title,
        price,
        mileage,
        power,
      });
    });
  } catch (e) {
    // Handle any errors that occur during the scraping process.
    console.log(`An error occurred while scraping truck data: ${e}`);
    throw new Error(e);
  }

  // Return the array containing the scraped truck data.
  return truckData;
}

async function scrapeAllPages(retry = 0) {
  // Initialize variables to keep track of the current page, URL, and scraped data.
  let curPage = 0;
  let url = `${config.scrapeUrl}`;
  const MAX_RETRY = 3; // Maximum number of retry attempts.
  const truckData = [];

  // Check if the retry count is less than the maximum allowed retries.
  while (true) {
    try {
      // Get the URL of the next page to scrape using the getNextPageUrl function.
      const pageUrl = await getNextPageUrl(url, curPage);

      // If no next page URL is found, exit the loop.
      if (!pageUrl) break;

      // Scrape truck information from the current page and add it to the truckData array.
      let truckInfo = await scrapeTruckItem(pageUrl);
      truckData.push(...truckInfo);

      // Increment the current page number and update the URL for the next iteration.
      curPage++;
      url = pageUrl;
    } catch (e) {
      // Handle errors that occur during scraping by retrying.
      retry = retry + 1;
      if (retry > MAX_RETRY) {
        console.log("Max retry limit reached");
        break;
      }

      console.log(`Error occurred, retrying ${retry}... ${e}`);
      // Recursively call the scrapeAllPages function with an incremented retry count.
      return await scrapeAllPages(retry);
    }
  }

  // Return the array containing all scraped truck data.
  return truckData;
}

export {
  getNextPageUrl,
  getListIdWithUrl,
  getTotalAdsCount,
  scrapeTruckItem,
  scrapeAllPages,
};
