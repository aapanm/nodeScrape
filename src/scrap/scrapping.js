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

export { getNextPageUrl, getListIdWithUrl };
