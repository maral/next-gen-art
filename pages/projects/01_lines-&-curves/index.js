import Head from 'next/head'
import Layout from 'components/layout'
import utilStyles from 'styles/utils.module.css'
import SketchList from 'components/sketchList'

export async function getStaticProps() {
  const sketches = [
    {
      id: 'curvy-mosaic',
      title: 'Curvy Mosaic',
    },
    {
      id: 'cubic-graffiti',
      title: 'Cubic Graffiti',
    },
  ]
  return {
    props: {
      sketches,
      project: '01_lines-&-curves',
      title: 'Lines & Curves',
    },
  }
}

export default function Home({ sketches, project, title }) {
  return (
    <Layout title={title}>
      <Head>
        <title>Lines &amp; Curves</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          My first generative art project. It started with the tutorial called{' '}
          <a
            href="https://theibbster.medium.com/a-gentle-introduction-to-coding-by-making-generative-art-c7f0a7b744a6"
            target="_blank"
            rel="noreferrer"
          >
            A gentle introduction to coding by making generative art
          </a>{' '}
          by Ibby EL-Serafy. I kept adding ideas and many of them were good
          enough to get their own page here.
        </p>
      </section>

      <SketchList data={sketches} project={project} />
    </Layout>
  )
}
