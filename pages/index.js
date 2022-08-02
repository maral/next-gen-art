import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from 'components/layout'
import utilStyles from 'styles/utils.module.css'
import { getSortedProjects } from 'lib/projects'

export async function getStaticProps() {
  const projects = getSortedProjects()
  return {
    props: {
      projects,
    },
  }
}

export default function Home({ projects }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to the home of my various generative art attempts.</p>
        <p>
          Each project should contain one or more pages where you can customize
          and generate your own picture. Have fun!
        </p>
        <p>
          This web app is open source and was made in{' '}
          <a href="https://nextjs.org/">Next.js</a>, the generative art uses{' '}
          <a href="https://p5js.org/">p5.js</a>, if you are interested, check
          the code on <a href="https://github.com/maral/next-gen-art">GitHub</a>
          .
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>Projects</h2>
        <ul className={utilStyles.list}>
          {projects.map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
