import '@/config/Axios';
import nock from 'nock';

nock('https://api.imgur.com/3')
  .intercept(/.*/, 'OPTIONS')
  .reply(200, undefined, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  })
  .persist();
