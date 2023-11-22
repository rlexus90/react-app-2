import { HttpResponse, http } from 'msw';
import { respMock, respMockOneFilm } from '../respMock';

export const handlers = [
  http.get('https://moviesdatabase.p.rapidapi.com/titles', () => {
    return HttpResponse.json(respMock);
  }),
  http.get(
    'https://moviesdatabase.p.rapidapi.com/titles/search/title/q',
    () => {
      return HttpResponse.json(respMock);
    }
  ),
  http.get(
    'https://moviesdatabase.p.rapidapi.com/titles/search/title/qw',
    () => {
      return HttpResponse.json(respMock);
    }
  ),
  http.get('https://moviesdatabase.p.rapidapi.com/titles/tt21361444', () => {
    return HttpResponse.json(respMockOneFilm);
  }),
  http.get('https://moviesdatabase.p.rapidapi.com/titles/wrong', () => {
    return HttpResponse.json(null);
  }),
];
