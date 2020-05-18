import Head from 'next/head'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Josh Larson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-black mb-4">Josh Larson</h1>

      - Software engineer
      - Work at Vox Media
      - Passionate about solving hard problems and creating good developer experiences

      WRITING
      - Main blog (MDX posts from here)
      - Inside Rafter
      - Building Barkpass
      - Archive (WP)

      PROJECTS
      - Barkpass
      - Rafter
      - Fresa
      - Full Stack Fundamentals (on-hold)
      - Lifeboat (archived)

      GLANCES
      - Videos with Barrett
      - Good pics I want to share
      - Livestreams
      - Other quirky things
    </div>
  )
}
