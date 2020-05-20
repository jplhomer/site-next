export async function getBarkpassPosts() {
  const url = 'https://building.barkpass.com/feed.json';
  const res = await fetch(url);
  const data = await res.json();

  return data.items;
}
