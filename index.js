const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const port = 5000;


app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.oh0s98i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//collections
let dataCollection;

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        dataCollection = client.db('learningDB').collection('data')


        // data related API's
        app.get('/data', async (req, res) => {
            res.send(await dataCollection.find(req.body).toArray())
        })
        app.post('/data', async (req, res) => {
            res.send(await dataCollection.insertOne(req.body))
        })





        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
app.get('/', async (req, res) => {
    res.send('Server is running...')
})
app.listen(port, () => console.log(`Server is running on port: ${port}`))