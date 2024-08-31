import axios from "axios";

export const statuses = [
  "Pending",
  "Seen",
  "Working",
  "Ontest",
  "Tested",
  "Finished",
  "Updated",
  "Backlog",
];
export const getCollectionName = () => {
  return process.env.NODE_ENV === "development" ? "task_test" : "tasks";
};
export const getCloudnarykeyName = () => {
  return process.env.NODE_ENV === "development" ? "task_test" : "tasks";
};
export const uploadImageToCloudinary = async (images) => {
  const uploads = images.map((image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "hg8nljf5"); // Your Cloudinary upload preset
    return axios
      .post(
        `https://api.cloudinary.com/v1_1/drpcwhlnp/image/upload`, // Corrected endpoint
        formData,
      )
      .then((res) => res.data.url);
  });
  return Promise.all(uploads);
};

