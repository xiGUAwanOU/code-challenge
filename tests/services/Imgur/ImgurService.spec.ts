import ImgurService from '@/services/Imgur/ImgurService';
import nock from 'nock';

describe('ImgurService', () => {
  it('should send the correct HTTP request to the Imgur server', async () => {
    const scope = nock('https://api.imgur.com/3', {
      reqheaders: {
        'Authorization': `Client-ID ${process.env.VUE_APP_CLIENT_ID}`,
      },
    })
      .defaultReplyHeaders({
        'Access-Control-Allow-Origin': '*',
      })
      .get('/gallery/top/viral/day/1')
      .query({ showViral: true })
      .reply(200, { data: [] });

    const response = await ImgurService.getGallery({
      section: 'top',
      sort: 'viral',
      window: 'day',
      page: 1,
      showViral: true,
    });

    expect(scope.isDone()).toBe(true);
    expect(response).toEqual({ data: [] });
  });

  it('should send the correct HTTP request to the Imgur server without window specified', async () => {
    const scope = nock('https://api.imgur.com/3', {
      reqheaders: {
        'Authorization': `Client-ID ${process.env.VUE_APP_CLIENT_ID}`,
      },
    })
      .defaultReplyHeaders({
        'Access-Control-Allow-Origin': '*',
      })
      .get('/gallery/hot/viral/1')
      .query({ showViral: false })
      .reply(200, { data: [] });

    const response = await ImgurService.getGallery({
      section: 'hot',
      sort: 'viral',
      page: 1,
      showViral: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(response).toEqual({ data: [] });
  });
});
