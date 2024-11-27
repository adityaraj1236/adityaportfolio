import Intro from '@/components/intro'
import React from 'react'
import {MDXRemote} from 'next-mdx-remote/rsc'

import { Cone } from 'lucide-react'
import RecentPosts from '@/components/recent-posts'

function Homepage() {


  const content = `
  # This is a markdown heading
  
  `



  return (
   <section className='py-24 font-serif'>
    <div className="container max-w-3xl"> 
      <h1 className="text-3xl font-bold">
        <Intro/>
        

        <RecentPosts/>
      </h1>
    </div>
   </section>
  )
}

export default Homepage