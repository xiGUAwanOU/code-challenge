import Axios from 'axios';
import { GetGalleryParams, GetGalleryResponse } from './ImgurTypes';

class ImgurService {
  public async getGallery(params: GetGalleryParams): Promise<GetGalleryResponse> {
    const url = `https://api.imgur.com/3/gallery/${params.section}/${params.sort}/${params.window}/${params.page}`;
    const urlQuery = { 'showViral': params.showViral };

    const response = await Axios.get(url, { params: urlQuery });

    return response.data;
  }
}

export default new ImgurService();
