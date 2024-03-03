import app from './app.js';
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("PServer is running on port: " + PORT)
});
