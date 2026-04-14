import { CityListRes } from "../types/Cinema";
import apiInstance from "./apiInstance";

const cinemaApi = {
  listCity: () : Promise<CityListRes[]> => {
    return apiInstance.get("Cinemas/admin");
  }
};

export default cinemaApi;