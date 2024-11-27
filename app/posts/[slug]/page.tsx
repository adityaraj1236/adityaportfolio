import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import MDXContent from '@/components/mdx-content';
import { getPosts, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug })); // Ensure this returns an array of { slug: string }
}

interface PostProps {
  params: { slug: string };
}

export default async function Post({ params }: PostProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // Renders a 404 page if the post is not found
  }

  const { metadata, content } = post;
  const { title, image, author, publishedAt } = metadata;

  return (
    <section className="pb-24 pt-32">
      <div className="container max-w-3xl">
        <Link
          href="/posts"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to posts</span>
        </Link>

        {image && (
          <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title || 'Post image'}
              className="object-cover"
              fill
            />
          </div>
        )}

        <header>
          <h1 className="title">{title}</h1>
          <p className="mt-3 text-xs text-muted-foreground">
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className="prose mt-16 dark:prose-invert">
          <MDXContent source={content} />
        </main>

        <footer className="mt-16">
          {/* Add newsletter form or other footer elements if needed */}
        </footer>
      </div>
    </section>
  );
}
