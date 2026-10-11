// AI SyntheticaPulse - Full-Stack HTTP Server & Agent API
const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.yaml': 'text/yaml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper: HTTP GET request to external services with timeout
function fetchExternal(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AISyntheticaPulse/2.0'
      },
      timeout: 6000
    }, (res) => {
      // Follow redirect if 301/302
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchExternal(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

// Live Web Search Service (DuckDuckGo Instant Answer & Wikipedia APIs)
async function performLiveWebSearch(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const results = [];

  try {
    // 1. DuckDuckGo Instant Answer API
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetchExternal(ddgUrl);
    if (ddgRes.status === 200) {
      try {
        const ddgData = JSON.parse(ddgRes.data);
        if (ddgData.AbstractText && ddgData.AbstractURL) {
          results.push({
            title: ddgData.Heading || cleanQuery,
            snippet: ddgData.AbstractText,
            url: ddgData.AbstractURL,
            source: ddgData.AbstractSource || 'DuckDuckGo Instant Answer'
          });
        }
        if (Array.isArray(ddgData.RelatedTopics)) {
          for (const item of ddgData.RelatedTopics.slice(0, 3)) {
            if (item.Text && item.FirstURL) {
              results.push({
                title: item.Text.split(' - ')[0] || cleanQuery,
                snippet: item.Text,
                url: item.FirstURL,
                source: 'DuckDuckGo Knowledge'
              });
            }
          }
        }
      } catch (err) {
        // Fall through
      }
    }
  } catch (err) {
    console.error('DDG Search warning:', err.message);
  }

  // 2. Wikipedia Search API for authoritative factual retrieval
  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cleanQuery)}&limit=3&namespace=0&format=json`;
    const wikiRes = await fetchExternal(wikiUrl);
    if (wikiRes.status === 200) {
      try {
        const wikiData = JSON.parse(wikiRes.data);
        const titles = wikiData[1] || [];
        const descriptions = wikiData[2] || [];
        const urls = wikiData[3] || [];
        for (let i = 0; i < titles.length; i++) {
          if (titles[i] && urls[i]) {
            results.push({
              title: titles[i],
              snippet: descriptions[i] || `Comprehensive overview and reference documentation for ${titles[i]} on Wikipedia.`,
              url: urls[i],
              source: 'Wikipedia'
            });
          }
        }
      } catch (err) {
        // Fall through
      }
    }
  } catch (err) {
    console.error('Wikipedia Search warning:', err.message);
  }

  return results;
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Route: Live Web Search (/api/search?q=...)
  if (pathname === '/api/search' && req.method === 'GET') {
    const query = parsedUrl.query.q || '';
    if (!query) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Search query parameter (q) is required' }));
      return;
    }

    try {
      const results = await performLiveWebSearch(query);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        query,
        count: results.length,
        timestamp: new Date().toISOString(),
        results
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to execute search', details: error.message }));
    }
    return;
  }

  // API Route: Health & Configuration Check (/api/health)
  if (pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      app: 'AI SyntheticaPulse',
      version: '2.0.0',
      uptime: process.uptime(),
      features: {
        liveWebSearch: true,
        speechSynthesis: true,
        speechRecognition: true,
        hanaITSupport: true
      }
    }));
    return;
  }

  // Static File Serving
  let reqPath = pathname === '/' ? '/index.html' : pathname;
  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA Fallback to index.html
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ AI SyntheticaPulse server active on port ${PORT}`);
  console.log(`🌐 Live Web Search API: http://localhost:${PORT}/api/search?q=test`);
});
