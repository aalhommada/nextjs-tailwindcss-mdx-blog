import Head from 'next/head'

export default function Home() {
  return (
    <div className='relative'>
      <Head>
        <title>Nextjs blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className='mt-7 text-5xl font-veryLarg text-center '>This is the home page</h2>
    </div>
  )
}
