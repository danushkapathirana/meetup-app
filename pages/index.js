import MeetupList from "@/components/meetups/MeetupList"

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
]

const HomePage = (props) => {
  return(
    <MeetupList meetups={props.meetups} />
  )
}

export default HomePage

// page pre-rendering with data (static site generation; SSG)
// export const getStaticProps = async () => {
//   return{
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//     revalidate: 10
//   }
// }

// server-side rendering (SSR)
export const getServerSideProps = async (context) => {
  const req = context.req
  const res = context.res

  return{
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}


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
