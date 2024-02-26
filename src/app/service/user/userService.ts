const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`;

export const getUser = (id: string) => {
  try {
    const res = fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("data: ", data);
        return data;
      })
      .then((data) => console.log(data));
  } catch (error) {
    console.error("Error: ", error);
  }
};
