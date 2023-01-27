import { Api } from "./Api";

const API = new Api();

export default {
  async uploadFile({ file, pet_id }: { file: File; pet_id: string }) {
    API.setAuthorization();
    API.setFormHeader();
    const { data } = await API.uploadFile(file, pet_id);
    return data;
  },
  async getFile(pet_id: string) {
    API.setAuthorization();
    const { data } = await API.get(`file/${pet_id}`);
    return data;
  },
};
