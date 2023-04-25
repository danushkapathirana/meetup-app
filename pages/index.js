import { Fragment } from "react"
import Head from "next/head"
import { MongoClient } from "mongodb"

import MeetupList from "@/components/meetups/MeetupList"

const HomePage = (props) => {
  return(
    <Fragment>
      {/* this head and meta data should be applied to all page components */}
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export default HomePage

// page pre-rendering with data (static site generation; SSG)
export const getStaticProps = async () => {
  /**
   * - here we do not want use fetch, because this code execute on the server,
   *   so, sending request to own api end point is redundant
   * - therefore, we can directly code to fetch the data
   */
  const client = await MongoClient.connect("mongodb+srv://admin:d52uuHnusIEGl9bO@meetup.jtbfjgq.mongodb.net/meetups?retryWrites=true&w=majority")
  const db = client.db()

  const meetupCollection = db.collection("meetup")

  // get all meetup data as an array of objects
  const meetup = await meetupCollection.find().toArray()
  console.log(meetup);
  client.close()

  return{
    props: {
      meetups: meetup.map((meetup_data) => ({
        title: meetup_data.title,
        image: meetup_data.image,
        address: meetup_data.address,
        id: meetup_data._id.toString()
      }))
    },
    revalidate: 10
  }
}

// server-side rendering (SSR)
// export const getServerSideProps = async (context) => {
//   const req = context.req
//   const res = context.res

//   return{
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }


// const HomePage = () => {
//   const [loadedMeetup, setLoadedMeetup] = useState([])

//   useEffect(() => {
//     setLoadedMeetup(DUMMY_MEETUPS)
//   }, [])

//   return(
//     <MeetupList meetups={loadedMeetup} />
//   )
// }

/**
 * pre-rendering flaw
 * 
 * - the page is pre-rendered has basically the snapshot
 *   after the first component rendering cycle as its content
 */

/**
 * consider above commented code
 * 
 * - first it will render the component, then it will run useEffect()
 * - therefore, for the first rendering cycle loadedMeetup is an empty array
 * 
 * - after executing useEffect(), it will update useState()
 * - because of that it will re-render the component again
 * - therefore, for the second rendering cycle loadedMeetup will be filled
 * 
 * not good for SEO; why??? think...
 */

/**
 * static generation
 * 
 * - when use this mechanism, page component pre-rendered when you build your application
 * - which means,
 *   by default, your page is not pre-rendered on the fly on the server, when request reaches the server
 *   instead it will pre-rendered when you build your application
 * 
 * - what about if add more meetups after the build??? think... (hint: outdated data)
 * 
 * - to avoid this issue, use another key in the return object (revalidate: )
 * - it  will re-generate the page AFTER EVERY 10 SECONDS, if there requests
 */

/**
 * server-side rendering
 * 
 * - it will re-generate the page FOR EVERY INCOMING NEW REQUESTS
 * - do not pre-rendered during build process
 * 
 * - use this mechanism, if you want access the complete request and response objects
 * and if content changes very frequently
 */
