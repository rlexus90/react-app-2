import { Dispatch } from 'react';

export interface RequestAns {
  page: number;
  next: string;
  entries: number;
  results: Film[];
}

export interface Film {
  _id: string;
  id: string;
  primaryImage?: {
    id: string;
    width: number;
    height: number;
    url: string;
    caption: {
      plainText: string;
      __typename: string;
    };
    __typename: string;
  };
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
  titleText: {
    text: string;
    __typename: string;
  };
  originalTitleText: {
    text: string;
    __typename: string;
  };
  releaseYear?: {
    year?: number;
    endYear?: null;
    __typename?: string;
  };
  releaseDate?: {
    day?: null;
    month?: null;
    year?: number;
    __typename?: string;
  };
}

export interface RespParam {
  searchValue?: string;
  page?: string;
  limit?: string;
}

export interface RespContextValue {
  respParam: RespParam;
  setRespParam: Dispatch<RespParam>;
  filmResp: RequestAns | undefined;
  setFilmResp: Dispatch<RequestAns | undefined>;
  isFilmLoad: boolean;
  setIsFilmLoad: Dispatch<boolean>;
}
