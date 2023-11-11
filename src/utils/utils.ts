import APIResponce from '../controller/APIResponse';
import { RequestAns, RespParam } from '../types/types';

export const queryToAPI = async ({
  searchValue,
  page,
  limit,
}: RespParam): Promise<RequestAns | undefined> => {
  if (searchValue)
    return await APIResponce.getSearchMovie(searchValue, page, limit);
  return await APIResponce.getMoviePage(page, limit);
};
