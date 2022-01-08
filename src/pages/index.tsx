import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

// 3 formas de fazer chamada API com NEXT
// Client-side
// Server-side
// Static Site Generation

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero} >
          <span>👏 Hey, welcome</span>
          <h1>
            News about < br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img
          src='/images/avatar.svg'
          alt='Girl coding'
        />
      </main>
    </>
  );
}


// SSG (static site generation) - utilizo apenas em paginas que podem ser estáticas
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KFf0yIX3Q7QuNktIOMWyzfX', {
    expand: ['product'] // all product infos
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 60s * 60 = 1h * 24 = 1d = 24 hours
  }
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1KFf0yIX3Q7QuNktIOMWyzfX', {
//     expand: ['product'] // all product infos
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   }

//   return {
//     props: {
//       product
//     },
//   }
// }

