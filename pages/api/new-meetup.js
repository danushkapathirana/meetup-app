import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if(req.method === "POST") {
        const { title, image, address, description } = req.body

        const client = await MongoClient.connect("mongodb+srv://admin:d52uuHnusIEGl9bO@meetup.jtbfjgq.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db()

        const meetupCollection = db.collection("meetup")

        const response = await meetupCollection.insertOne({
            title: title,
            image: image,
            address: address,
            description: description
        })

        client.close()

        res.status(201).json({message: "Data inserted successfully!"})
    }
}

export default handler

/**
 * - this code never end up on the client side,
 * - so, it's okay to secure credentials
 */