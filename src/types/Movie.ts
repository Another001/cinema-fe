export interface MovieGetRes{
  id: number,
  name : string,
  duration: number,
  genre: string,
  releaseDate: string,
  figure:string,
  describe?: string,
  cast?: string,
  director?: string,
  title?: string,
  language? : string,
  trailer?:string,
}

export interface MovieCreateReq{
  name: string,
  title: string,
  describe:string,
  duration: number,
  releaseDate: string,
  endDate: string,
  genre: string,
  director: string,
  cast: string,
  figure: string,
  language:string,
  trailer:string,
}