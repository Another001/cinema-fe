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