import { Dispatch } from 'react';

export interface RequestAns {
  page: number;
  next: string;
  entries: number;
  results: Film[];
}

export interface RequestAnsOneFilm {
  page?: number;
  next?: string;
  entries?: number;
  results: Film;
}

export interface Film {
  _id: string;
  id: string;
  primaryImage?: null | {
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
    displayableProperty?: {
      value: {
        plainText: string;
        __typename: string;
      };
      __typename: string;
    };
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    categories?: [Record<string, string>];
    canHaveEpisodes?: boolean;
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
    year?: number | null;
    endYear?: null | number;
    __typename?: string;
  };
  releaseDate?: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
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
