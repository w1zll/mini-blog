const app = require('./app');
const { env } = require('./env');

app.listen(env.PORT, () => {
   console.log(`API listening on http://localhost:${env.PORT}`);
});
