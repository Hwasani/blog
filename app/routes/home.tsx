import type { Route } from "./+types/home";
import { slugsToMetadata } from "~/posts/metadata.const";
import { BlogLink } from "~/components/post_link";
import { Link } from "react-router";

export default function Home() {
  const posts = Object.values(slugsToMetadata).map(
    ({ frontmatter }) => frontmatter
  );
  return (
    <div className="w-full md:w-[700px] lg:w-[900px] flex lg:flex-col">
      <pre
        className="text-center font-mono text-[0.45rem] sm:text-[0.6rem] md:text-sm lg:text-xs overflow-x-auto text-gradient-animated hidden lg:block"
        aria-hidden
      >
        {`        
          ▄▄▄   ▄▄▄ ▄▄▄▄  ▄▄▄  ▄▄▄▄   ▄▄▄▄    ▄▄▄▄▄▄▄   ▄▄▄▄   ▄▄▄    ▄▄▄ ▄▄▄▄▄ 
          ███   ███ ▀███  ███  ███▀ ▄██▀▀██▄ █████▀▀▀ ▄██▀▀██▄ ████▄  ███  ███  
          █████████  ███  ███  ███  ███  ███  ▀████▄  ███  ███ ███▀██▄███  ███  
          ███▀▀▀███  ███▄▄███▄▄███  ███▀▀███    ▀████ ███▀▀███ ███  ▀████  ███  
          ███   ███   ▀████▀████▀   ███  ███ ███████▀ ███  ███ ███    ███ ▄███▄ 
        `}
      </pre>

      <div className="flex flex-col w-full md:w-[900px] md:border-[1px] md:border-transparent border-solid p-4 transition-all border-gradient-animated">
        <main className="space-y-4">
          <div className="flex gap-2">
            <span className="lg:hidden">nullpt.rs</span>
            <a
              target="_blank"
              href="https://github.com/nullpt-rs"
              className="text-neutral-500 hover:text-white hover:underline"
              rel="noreferrer"
            >
              github
            </a>
            <a
              target="_blank"
              href="https://twitter.com/hwasan111"
              className="text-neutral-500 hover:text-white hover:underline"
              rel="noreferrer"
            >
              twitter
            </a>
            <a
              target="_blank"
              href="https://hwasani.com/feed.rss"
              className="text-neutral-500 hover:text-white hover:underline"
              rel="noreferrer"
            >
              rss
            </a>
          </div>

          <ul className="space-y-1 list-disc list-inside">
            {posts
              .filter((post: any) => !post?.hidden)
              .sort((p, p2) => Date.parse(p2.date) - Date.parse(p.date))
              .map((post, postIndex) => (
                <BlogLink
                  tabIndex={postIndex}
                  key={post.slug}
                  date={post.date}
                  author={post.author}
                  href={`/${post.slug}`}
                >
                  {post.name}
                </BlogLink>
              ))}
          </ul>
        </main>
        <footer className="mt-4">
          <span>
            <span className="text-neutral-500">
              Content on this site is licensed
            </span>{" "}
            <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY-NC-SA 4.0
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
