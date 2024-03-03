import app from './app.js';
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Central is running on port: " + PORT)
});
