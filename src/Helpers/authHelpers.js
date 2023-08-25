export const loginUser = async (credential) => {
  try {
    const res = await fetch("https://videorecorder-backend-api.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
