//pages/[uid].js
import React from 'react'
import { Client } from '../../prismic-configuration'
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs";
import styles from '../../styles/Post.module.css'
import Header from '../../components/Header';


export default function Post({ data }) {
  return (

    <React.Fragment>
      <Header/>

    <div className={styles.recipeContainer}>
        <img className={styles.postImage} src={data.image.url} />
   
      <h1>{RichText.asText(data.title)}</h1>
      <h4>{RichText.asText(data.subtitle)}</h4>
      
        
          {data.recipe_part.map((part, index) => (
            <div className={styles.recipeWrapper} key={index}>
              <h2>Hráefni:</h2>
              <div className={styles.postIngredients}>
                {RichText.render(part.ingredients)}
              </div>            
              <h2>Aðferð:</h2>
              <div className={styles.postInstructions}>
                {part.instructions}
              </div>
            </div>
          ))}
      

      <p>{data.notes}</p>
      <small>{RichText.render(data.attribute)}</small>
    </div>

    </React.Fragment>
  );
}


export async function getStaticProps({params}) {
  const client = Client();
  const { data } = (await client.getByUID('recipe', params.uid))

  return {
    props: {
      data
    },
  };
}

export async function getStaticPaths() {
  const client = Client();
   const { results } = await client.query(
     Prismic.Predicates.at("document.type", "recipe")
   )

  const paths = results.map(post => ({
    params: {
      uid: post.uid,
    },
  }))

   return {
    paths,
    fallback: false,
   }
 }
