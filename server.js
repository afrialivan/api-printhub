import app from './app.js'

const PORT = 3000

app.get("/", (req, res) => {
  res.send(`server running in port ${PORT}`)
})

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
})