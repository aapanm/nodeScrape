# Web Scraping using Node.js

This Node.js script is designed to scrape data from the Otomoto website for Mercedes-Benz trucks. The script performs the following tasks:

1. **Get Next Page URL**: `getNextPageUrl` function from [scrapping.js](/src/scrap/scrapping.js) finds the next pagination page link to scrape data

2. **Add Items Function**: `getListIdWithUrl` from [scrapping.js](/src/scrap/scrapping.js) Fetches item URLs and item IDs (unique identifiers used on the portal) from the list page.

3. **Get Total Ads Count Function**: `getTotalAdsCount` from [scrapping.js](/src/scrap/scrapping.js) provides information on how many total advertisements exist for the provided initial URL.

4. **Scrape Truck Item Function**: `scrapeTruckItem` from [scrapping.js](/src/scrap/scrapping.js) scrapes individual truck ads and parses them into a structured format, including item ID, title, price, mileage, and power.

5. **Scrape All Pages, All Ads**: `scrapeAllPages` from [scrapping.js](/src/scrap/scrapping.js) script runs the above functions to scrape data from all pages and all ads matching the specified criteria.

##Data Storage

All the scraped data are stored in the [data](/src/data/) folder in different files.

1. `storeListIdUrl` from [dataStore.js](/src/dataStore.js) file stores all items id and urls in [ItemIdWithUrl.csv](/src/data/ItemIdWithUrl.csv) file

1. `storeTruckInfo` from [dataStore.js](/src/dataStore.js) file stores all the truck information. Inital Page truck info are stored in [InitialPageTruckInfo.csv](/src/data/InitialPageTruckInfo.csv) and all scraped data are stored in [AllTruckInfo.csv](/src/data/AllTruckInfo.csv) file

## Prerequisites

Before running the script, make sure you have the following prerequisites:

- Node.js installed on your machine.

## Installation

To install and set up the project on your local machine, follow these steps:

1. Clone the Git repository using the following command:

   ```bash
   git clone https://github.com/aapanm/nodeScrape
   ```

2. Change to the project directory:

   ```bash
   cd nodeScrape
   ```

3. Install the project dependencies by running:

   ```bash
   npm install
   ```

## Running the Project

Once you have completed the installation and configuration steps, you can run the project using the following command:

```bash
npm start
```

## Running the Project using Docker

You can also run the project with docker. To make that happen first insatll Docker and then run the following commands in the terminal:

1. Pull Docker image

```bash
Docker pull aapanm13/node_scrape
```

2. Run Docker image

```bash
Docker run aapanm13/node_scrape
```
