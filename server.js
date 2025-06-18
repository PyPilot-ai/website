const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use((req, res, next) => {
  if (!path.extname(req.path)) {
    const htmlPath = path.join(__dirname, req.path + '.html');
    if (require('fs').existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 