const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');
const app = express();
const parser = new Parser();

app.use(cors());

app.get('/vnexpress-health-news', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://vnexpress.net/rss/suc-khoe.rss');
    // Lấy 6 tin đầu, parse ảnh từ description
    const news = feed.items.slice(0, 6).map(item => {
      const imgMatch = item.content && item.content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
      return {
        title: item.title,
        link: item.link,
        description: item.contentSnippet,
        image: imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd21?auto=format&fit=crop&w=400&q=80'
      };
    });
    res.json(news);
  } catch (e) {
    res.status(500).json({ error: 'Lỗi lấy tin tức' });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log('VnExpress Health News API running on http://localhost:' + PORT)); 