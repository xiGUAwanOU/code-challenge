import ImgurService from '@/services/imgur/ImgurService';
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
      .get('/gallery/hot/time/day/1')
      .query({ showViral: true })
      .reply(200, { data: [] });

    const response = await ImgurService.getGallery({
      section: 'hot',
      sort: 'time',
      window: 'day',
      page: 1,
      showViral: true,
    });

    expect(scope.isDone()).toBe(true);
    expect(response).toEqual({ data: [] });
  });
});
