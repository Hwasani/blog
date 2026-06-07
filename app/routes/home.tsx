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
                                                     .            L.                
  .    .                                            ;W            EW:        ,ft t  
  Di   Dt               ;                ..        f#E         .. E##;       t#E Ej 
  E#i  E#i            .DL               ;W,      .E#f         ;W, E###t      t#E E#,
  E#t  E#t    f.     :K#L     LWL      j##,     iWW;         j##, E#fE#f     t#E E#t
  E#t  E#t    EW:   ;W##L   .E#f      G###,    L##Lffi      G###, E#t D#G    t#E E#t
  E########f. E#t  t#KE#L  ,W#;     :E####,   tLLG##L     :E####, E#t  f#E.  t#E E#t
  E#j..K#j... E#t f#D.L#L t#K:     ;W#DG##,     ,W#i     ;W#DG##, E#t   t#K: t#E E#t
  E#t  E#t    E#jG#f  L#LL#G      j###DW##,    j#E.     j###DW##, E#t    ;#W,t#E E#t
  E#t  E#t    E###;   L###j      G##i,,G##,  .D#j      G##i,,G##, E#t     :K#D#E E#t
  f#t  f#t    E#K:    L#W;     :K#K:   L##, ,WK,     :K#K:   L##, E#t      .E##E E#t
   ii   ii    EG      LE.     ;##D.    L##, EG.     ;##D.    L##, ..         G#E E#t
              ;       ;@      ,,,      .,,  ,       ,,,      .,,              fE ,;.
                                                                               ,                                                                  
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
              href="https://twitter.com/nullptrs"
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
