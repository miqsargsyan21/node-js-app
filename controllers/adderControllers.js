exports.addItem = (req, res) => {
    const {body} = req
    console.log({body})

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: "Item added"}))
}