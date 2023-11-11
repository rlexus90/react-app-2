import { RequestAns } from '../types/types';
import { HEADERS, REQUEST_URL } from '../common/constants';
import axios from 'axios';

export default class APIResponce {
  static async getMoviePage(
    page = '1',
    limit = '10'
  ): Promise<RequestAns | undefined> {
    try {
      const request = await axios.get(REQUEST_URL, {
        params: {
          page,
          limit,
        },
        headers: HEADERS,
      });
      const data = await request.data;
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  static async getSearchMovie(
    str: string,
    page = '1',
    limit = '10'
  ): Promise<RequestAns | undefined> {
    try {
      const request = await axios.get(REQUEST_URL + `/search/title/${str}`, {
        params: {
          page,
          limit,
        },
        headers: HEADERS,
      });
      const data = await request.data;
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  static async getMovie(id: string): Promise<RequestAns | undefined> {
    try {
      const request = await axios.get(`${REQUEST_URL}/${id}`, {
        headers: HEADERS,
      });
      const data = await request.data;
      return data;
    } catch (e) {
      return undefined;
    }
  }
}
