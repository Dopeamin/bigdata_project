import axios from "axios";

export class BackEndService {
  static findAll = async () => {
    try {
      const response = await axios.get("http://localhost:3000/persons");

      return await response.data;
    } catch (e) {
      console.log(e);
    }
  };
}
