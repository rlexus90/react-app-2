import { HEADERS, REQUEST_URL } from '@/common/constants';
import { RequestAns, RequestAnsOneFilm, RespParam } from '@/types/types';
import axios from 'axios';

axios.defaults.baseURL = REQUEST_URL;

export const filmApi = {
  async getFilmsPage({ search, page = '1', limit = '10' }: RespParam) {
    let url = '';
    if (search) url = `/search/title/${search}`;

    const { data } = await axios.get<RequestAns>(url, {
      headers: HEADERS,
      params: { page, limit },
    });
    return data;
  },

  async getFilm(id: string) {
    const { data } = await axios.get<RequestAnsOneFilm>(`/${id}`, {
      headers: HEADERS,
    });
    return data.results;
  },
};
