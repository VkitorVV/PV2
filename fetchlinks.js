import https from 'https';

const urls = [
  'https://ibb.co/RT3t1QGz',
  'https://ibb.co/20qktNNm',
  'https://ibb.co/6cXsWsXL',
  'https://ibb.co/gb0bnvBG',
  'https://ibb.co/SDC7VKR6'
];

urls.forEach(urlStr => {
  https.get(urlStr, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/);
      console.log(urlStr, match ? match[0] : 'not found');
    });
  });
});
