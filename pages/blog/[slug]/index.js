import rehypeHighlight from "rehype-highlight";
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'


export default function BlogItem({ mdxContent, frontMatter }) {
    return (
        <div className="flex justify-center mx-auto items-center flex-col my-4  p-2 w-full px-2 overflow-hidden">
            <div className="h-48 bg-[#4a91cf] rounded-lg flex justify-center items-center flex-col px-4 py-2 shadow-md my-7 w-full">
                <h1 className="font-medLarg text-3xl font-serif text-gray-100 mt-2">
                    {frontMatter.title}
                </h1>
                <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm text-gray-900">
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
                        {frontMatter.publishedAt}
                    </div>
                </div>
            </div>

            <article className="prose prose-stone prose-headings:capitalize prose-a:text-blue-600 w-full px-3">
                <MDXRemote {...mdxContent} />
            </article>
        </div>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/blog'))
    const paths = files.map(fileName => ({
        params: { slug: fileName.replace(".mdx", "") }
    }))

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('content/blog', slug + ".mdx"), 'utf-8')
    const { data: frontMatter, content } = matter(markdownWithMeta)
    const mdxContent = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [[rehypeHighlight, {
                ignoreMissing: true,

            }]]
        }
    })
    return {
        props: {
            frontMatter,
            mdxContent
        }

    }

}