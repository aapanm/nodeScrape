import * as cheerio from "cheerio";

function getNextPageUrl(html) {
  const $ = cheerio.load(html);

  const url = [];

  const nextPageLink = $("a");

  nextPageLink.each((idx, elem) => {
    const href = $(elem).attr("href");
    if (href) url.push({ url: href });
  });

  return url;
}

function getListIdWithUrl(html) {
  const $ = cheerio.load(html);
  const idUrl = [];

  const articles = $("article.ooa-1t80gpj");

  articles.each((idx, elem) => {
    const article = $(elem);
    const dataId = article.attr("data-id");
    const href = article.find("h1 a").attr("href");

    idUrl.push({ id: dataId, url: href });
  });

  return idUrl;
}

function getTotalAdsCount(html) {
  const $ = cheerio.load(html);
  const resultPara = $("p.ev5apm50");
  const count = $(resultPara).find("b").first().text();
  return count;
}

function scrapeTruckItem(html) {
  const $ = cheerio.load(html);
  const truckData = [];

  const articles = $("article.ooa-1t80gpj");

  articles.each((idx, elem) => {
    const article = $(elem);
    const itemId = article.attr("data-id");
    const title = article.find("h1 a").text();
    const price = article.find(".ooa-1wb7q8u.ev7e6t814 h3").text();

    const mileage = article
      .find(".ooa-d3dp2q .ooa-13lipl2 dd[data-parameter='mileage']")
      .text();

    const power = article
      .find(".ooa-d3dp2q .ooa-13lipl2 dd[data-parameter='engine_power']")
      .text();

    truckData.push({
      id: itemId,
      title,
      price,
      mileage,
      power,
    });
  });

  return truckData;
}

export { getNextPageUrl, getListIdWithUrl, getTotalAdsCount, scrapeTruckItem };
