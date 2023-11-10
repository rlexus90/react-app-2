import { Starship, StarshipsRequest } from '../types/types';
import { requestURL } from '../common/constants';
import axios from 'axios';

export default class APIResponce {
  static async getAllShips(): Promise<StarshipsRequest | undefined> {
    try {
      const request = await axios.get(requestURL);
      const data = await request.data;
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  static async getSearchShips(
    str: string
  ): Promise<StarshipsRequest | undefined> {
    try {
      const url = `${requestURL}?search=${str}`;
      const request = await axios.get(url);
      const data = await request.data;
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  static async getShipFromPage(
    url: string
  ): Promise<StarshipsRequest | undefined> {
    try {
      const request = await axios.get(url);
      const data = await request.data;
      return data;
    } catch (e) {
      return undefined;
    }
  }

  static async getShip(id: string): Promise<Starship | null> {
    const url = `${requestURL}/${id}`;
    try {
      const request = await axios.get(url);
      const data = await request.data;
      return data;
    } catch (e) {
      return null;
    }
  }
}
