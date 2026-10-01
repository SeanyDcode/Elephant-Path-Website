import { getCollection } from 'astro:content';

// Published blog posts, newest first. Drafts are left out.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Library order: alphabetical by title, ignoring a leading "The", "A", or "An"
// the way libraries and bookstores do.
const sortTitle = (title: string) => title.replace(/^(the|a|an)\s+/i, '');

export async function getBooks() {
  const books = await getCollection('library');
  return books.sort((a, b) =>
    sortTitle(a.data.title).localeCompare(sortTitle(b.data.title), 'en', { sensitivity: 'base' })
  );
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
