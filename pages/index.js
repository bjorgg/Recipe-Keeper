import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { Client } from '../prismic-configuration'
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs";
import Header from '../components/Header';

export default function Home({ posts }) {
  console.log(posts)


  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe Keeper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className={styles.listContainer}>
        {posts.results.map((post) => (
          <div className={styles.listItem} key={post.uid}>
            <Link href="posts/[id]" as={`/posts/${post.uid}`}>
              <a>
                <img className={styles.listImage} src={post.data.image.url} />
                <h2>{RichText.asText(post.data.title)}</h2> 
              </a>
            </Link>
            </div>
            
          ))}
      </div>

    </div>
  )
}
export async function getStaticProps(context) {
  const client = Client();
   const data = await client.query(
     Prismic.Predicates.at("document.type", "recipe"),
     {orderings: "[document.last_publication_date]" }
   )
   
   return {
     props: {
       posts: data,
    
     },
   }
}

// Kannski bæta við revalidate: 1 og if !data í getStaticProps hér og í [uid].js
// virkar fínt með fallback: true, þarf þá að breyta því.