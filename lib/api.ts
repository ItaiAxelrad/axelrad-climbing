'use server';

import fs from 'fs';
import matter from 'gray-matter';
import { basename, dirname, extname, join, parse } from 'path';

type Frontmatter = {
  title: string;
  author: string;
  location?: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
};

export interface Post extends Frontmatter {
  order: number;
  dir: string;
  slug: string;
  content: string;
}

function getAllMdFiles(dir: string): string[] {
  let mdFiles: string[] = [];

  // Read the directory contents
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // If entry is a directory, recursively gather MD files
      mdFiles = mdFiles.concat(getAllMdFiles(fullPath));
    } else if (entry.isFile() && extname(entry.name) === '.md') {
      // If entry is a file and has a .md extension, add it to the list
      mdFiles.push(fullPath);
    }
  }

  return mdFiles;
}

function readMdFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const parsedContent = matter(rawContent);
  return parsedContent;
}

function getMdData(dir: string) {
  const mdFiles = getAllMdFiles(dir);
  return mdFiles.map((file) => {
    const { data, content } = readMdFile(file);

    return {
      dir: basename(dirname(file)),
      slug: parse(file).name,
      ...(data as Frontmatter),
      content,
    } as Post;
  });
}

export default async function getPosts(collection: string): Promise<Post[]> {
  const dir = join(process.cwd(), 'content', collection);
  const posts = getMdData(dir);
  return posts
    .sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
    )
    .map((post, index) => ({ ...post, order: index }))
    .reverse();
}
