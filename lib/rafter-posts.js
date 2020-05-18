import * as xml2js from "xml2js";

export async function getRafterPosts() {
  const url = "https://blog.rafter.app/rss.xml";
  const res = await fetch(url);
  const text = await res.text();
  const xml = await xml2js.parseStringPromise(text);
  const feed = xml.rss.channel[0].item;

  return feed.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    date: item.pubDate[0],
    content: item["content:encoded"][0],
  }));
}
