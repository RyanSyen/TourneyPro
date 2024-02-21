const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`;

export const fetchTodos = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const addTodo = async (text: string) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Error: ", error);
  }
};

// export const updateTodo = async (id: string, text: string) => {
//   const res = await axiosInstance.put(`${BASE_URL}/${id}`, text);
//   return res.data;
// };

export const deleteTodo = async (id: string) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Error: ", error);
  }
};
