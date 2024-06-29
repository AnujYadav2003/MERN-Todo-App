const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const todomodel = require("./models/todo");
const todo = require("./models/todo");
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

mongoose.connect("mongodb+srv://anujyadav12122003:96aYSjNpJKM6eWHD@cluster0.bwc4aa5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.on('connected', () => console.log('DB connected'));

app.get("/", async (req, res) => {
    const todo = await todomodel.find({});
    res.send(todo);
})
app.post("/addtodo", (req, res) => {
    const { text } = req.body;
    todomodel.create({ text })
        .then((data) => {
            console.log("added sccessfully")
            console.log(data);
            res.send(data);
        })

})
app.put("/update", async (req, res) => {
    const { _id, text } = req.body;

    const doc = await todomodel.findById(_id)
    if (!doc) {
        res.send("Document not found");
        return;
    }
    doc.text = text;
    await doc.save();
    res.send("updated ");
})
app.delete("/delete", async (req, res) => {
    const { _id } = req.body; 
    await todomodel.findByIdAndDelete(_id).then(() =>
        res.status(200).json({ message: "deleted successfully" })
    )
})
app.listen(port, () => {
    console.log(`App is running on ${port}`)
})