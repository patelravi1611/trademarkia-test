/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
dotenv.config({path: '.env.local'});
import {createServer} from 'http';
import {parse} from 'url';
import next from 'next';
const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
  dir: './',
  conf: {
    reactStrictMode: true,
    swcMinify: true,
  },
  assetPrefix:
    process.env.AWS_NEXT_ASSETS_DOMAIN !== undefined ? process.env.AWS_NEXT_ASSETS_DOMAIN : '',
  images: {
    domains: [
      process.env.AWS_BUCKET_NAME + '.s3.' + process.env.AWS_DEFAULT_REGION + '.amazonaws.com',
    ],
    deviceSizes: [360, 375, 420, 640, 767, 1080, 1200, 1440, 1920],
  },
});

const handle = app.getRequestHandler();
import {CronJob} from 'cron';

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const {pathname, query} = parsedUrl;
    handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

if (process.env.NEXT_PUBLIC_INSTANCE_ENV == 'PRODUCTION') {
  //
}
