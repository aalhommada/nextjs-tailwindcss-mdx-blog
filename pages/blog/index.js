import Link from "next/link";
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export default function Blog({ posts }) {
    return (
        <div className="flex flex-col justify-center items-center max-w-3/4 mt-[60px] ">
            <h1 className="text-3xl font-medLarg text-primary text-center my-3 underline ">
                Latest Blog Articles
            </h1>
            <div className="my-4 w-full">
                {posts.map((post) => {
                    return (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.frontMatter.slug}
                            className="flex flex-col justify-center items-center my-1 md:w-3/4 md:mx-auto"
                        >
                            <div className="bg-gray-50  m-1 px-3 py-2 rounded-lg shadow-md w-full hover:bg-gray-200">
                                <span className="font-bold text-xl font-medLarg hover:underline mb-3 capitalize md:text-2xl">
                                    {post.frontMatter.title}
                                </span>
                                <br />
                                <span className=" text-md mb-3 capitalize md:text-2xl">
                                    {post.frontMatter.excerpt}
                                </span>
                                <div className="flex  mt-2 gap-1 items-center">
                                    <span className="rounded-lg bg-red-200 px-2 py-1 font-medLarg">
                                        {post.frontMatter.publishedAt}
                                    </span>
                                    <div className="flex">
                                        {post.frontMatter.tages.map((tag, index) => {
                                            return (
                                                <span
                                                    key={`post-tags-item-${index}`}
                                                    className="rounded-lg bg-gray-400 m-1 px-2 py-1 text-white"
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}


export async function getStaticProps() {
    const postsFiles = fs.readdirSync(path.join(`content/blog`))
    const posts = postsFiles.map(fileName => {
        const postsMarkdownWithMeta = fs.readFileSync(path.join(`content/blog`, fileName), 'utf-8')
        const slug = fileName.split('.')[0]
        const { data: frontMatter, content } = matter(postsMarkdownWithMeta)
        return {
            slug,
            frontMatter,
            content
        }
    })

    return {
        props: {
            posts: posts.sort((a, b) => {
                return (
                    Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
                );
            })
        }
    }
}

