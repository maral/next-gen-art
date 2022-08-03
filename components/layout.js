import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'

const name = 'Generative Art Attempts'
export const siteTitle = 'Generative Art Attempts'

export default function Layout({ children, home, title, wide, noLogo }) {
  return (
    <>
      <div className={wide ? styles.containerWide : styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {!noLogo && (
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/gen-art/images/profile.png"
                  className={utilStyles.borderCircle}
                  height={250}
                  width={250}
                  alt={name}
                />
              </a>
            </Link>
          )}
          <h1 className={utilStyles.heading2Xl}>{title ?? name}</h1>
        </header>
        <main>{children}</main>
      </div>
      <div className={styles.container}>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
