import { CityListRes, CreateCinemaReq, CreateRoomReq } from "../types/Cinema";
import apiInstance from "./apiInstance";

const cinemaApi = {
  listCity: (city? : string) : Promise<CityListRes[]> => {
    return apiInstance.get('Cinemas/admin',{ params:{
      city
    }});
  },
  createCinema: (newCinema: CreateCinemaReq) => {
    return apiInstance.post('Cinemas', newCinema);
  },
  createRoom: (newRoom : CreateRoomReq) => {
    return apiInstance.post('Cinemas/Room', newRoom)
  }
};

export default cinemaApi;