import axios from "axios";

export const statuses = ["Pending", "Seen", "Working","Ontest", "Tested", "Finished", "Updated", "Backlog"];
export const getCollectionName=()=>{
    return process.env.NODE_ENV === 'development' ? 'task_test' : 'tasks';
};

export const uploadImageToCloudinary = async (images) => {
    const uploads = images.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "fp5cicub"); // Your Cloudinary upload preset
      return axios.post(
        `https://api.cloudinary.com/v1_1/dwclw3s0d/image/upload`, // Corrected endpoint
        formData
      ).then(res => res.data.url);
    });
    return Promise.all(uploads);
  };