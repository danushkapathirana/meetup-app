import MeetupDetails from "@/components/meetups/MeetupDetails"

const MeetupDetailsPage = () => {
    return(
        <MeetupDetails image="" title="" address="" description="" />
    )
}

export default MeetupDetailsPage

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId

    console.log(meetupId)

    return{
        props: {
            meetupData: {
                image: "",
                id: "",
                title: "",
                address: "",
                description: ""
            }
        }
    }
}

export const getStaticPaths = async () => {
    return{
        fallback: false,
        paths: [
            // this is one version of object that url might be
            {
                params: {
                    meetupId: "m1",
                }
            }
        ]
    }
}


/**
 * getStaticPaths()
 * 
 * - need to export in a page component file
 * adn if it is a dynamic page(dynamic url) and also if you are using getStaticProps()
 * 
 * 
 * - POINTS -
 * 
 * - next.js need to know which id values it should pre-generate the page
 * - this is not pre-generated when a user visits this page with a specific value in the URL,
 *   but during the build process
 * 
 * - So here we need to pre-generated for all the URLs,
 *   for all the meetup ID values users might be entering at runtime.
 * 
 * - And if they enter an ID for which we didn't pre-generate the page,
 *   they will see a 404 error
 * 
 * - fallback: false -> tells path contains all supported meetup ids,
 *   anything enter it will show 404 error
 * 
 * - this object needs to have a paths key,
 * - which is an array contains multiple objects that represent one object per version of
 *   this dynamic page
 */

/**
 * - EXTRA NOTE -
 * 
 * getStaticProps() => 
 * - not execute on the client side or server side but, on the build process (if use "validate" key, it will execute on the server side)
 *   therefore, you can execute any code that would normally run on server (accessing file system / connect database securely)
 *         
 * getServerSideProps() => run the server after the deployment
 * 
 * getStaticPaths() => 
 * 
 * - all these function validate only for page components inside page folder
 */
