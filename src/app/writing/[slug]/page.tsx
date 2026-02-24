"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-mono text-ash text-sm">Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.article
        className="min-h-screen pt-28 pb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="/#writing"
              className="inline-flex items-center gap-1 text-xs text-stone hover:text-ink transition-colors font-mono mb-10"
            >
              ← Back
            </a>

            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[10px] text-stone">{post.date}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-stone" />
              <span className="font-mono text-[10px] text-stone">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-10">
              {post.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-semibold text-ink mt-10 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[15px] text-charcoal leading-[1.75] mb-5"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /\*([^*]+)\*/g,
                      '<em class="text-ink not-italic">$1</em>'
                    ),
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </motion.article>
      <Footer />
    </>
  );
}
