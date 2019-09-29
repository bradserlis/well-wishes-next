import React, { Component } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Link from 'next/Link';
import styles from '../style.scss';

class Home extends Component {
  render() {
    return(
      <div>
        <Head>
          <title>Well Wishes</title>
        </Head>
        <Nav />
        <div className='main-section'>
          <h1 className='title'>Well Wishes</h1>
          <Link href='/search'>
            <a>Search</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
