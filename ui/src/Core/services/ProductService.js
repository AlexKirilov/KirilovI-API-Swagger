import axiosInstance from "../interceptors/interceptor";

const path = "products";

export async function getProductsList() {
  try {
    return await axiosInstance()
      .get(`/${path}`)
      .then((res) => {
        const data = res && res.data ? res.data : res;
        if (!data?.results || !data?.results?.length) {
          return data;
        } else {
          data.results = data.results.map((prod) => {
            prod.id = prod._id;
            delete prod._id;
            return prod;
          });
          return data;
        }
      })
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}
