import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.type('json').send('Hello World!');
});

app.listen(3000, () => {});

process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})
