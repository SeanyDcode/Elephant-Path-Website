import { getCollection } from 'astro:content';

// Published blog posts, newest first. Drafts are left out.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getGuides() {
  const guides = await getCollection('guides');
  return guides.sort((a, b) => a.data.order - b.data.order);
}

export async function getBooks() {
  const books = await getCollection('library');
  return books.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
