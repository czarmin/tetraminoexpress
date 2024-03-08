const express = require("express")
const app = express()
const fs = require("fs")

app.use(express.static("public"))

app.get("/leaderboard", (req, res) => {
    res.status(200).download("./public/leaderboard.csv")
})

app.post("/add", (req, res) => {
    var nev = req.query.nev,
        pont = req.query.pont,
        szint = req.query.szint,
        szel = req.query.szel,
        hossz = req.query.hossz
    if(!nev || !pont || !szint || !szel || !hossz) {
        res.sendStatus(400)
        return
    }
    let file = fs.readFileSync("./public/leaderboard.csv", {encoding: "ascii"})
    file += `${nev};${pont};${szint};${szel};${hossz}\n`
    fs.writeFileSync("./public/leaderboard.csv", file);
    res.sendStatus(200)
})

app.listen(3001)
