import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../../Context/AuthContext";
import { getCollectionName, uploadImageToCloudinary } from "../../../Constants";


const AddTask = ({ db, closeAdd }) => {
  const [lock,setLock]=useState(false);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    env: "",
  });
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 6) {
      setImages(files);
    } else {
      alert('Cannot add more than 6 images at once');
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(lock){
      console.log('locked');
      return;
    }
    setLock(true);
    try {
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await uploadImageToCloudinary(images);
      }

      await addDoc(collection(db, getCollectionName()), {
        title: formData.title,
        organization: formData.organization,
        status: "Pending",
        env: formData.env,
        user: user.email,
        imageUrls, 
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      closeAdd(false);
      setFormData({ title: "", organization: "", env: "" });
      setImages([]);
    } catch (e) {
      console.error('Error uploading images or adding task:', e);
    }

    setLock(false);

  };

  return (
    <div className="popup">
      <div className="popup-back" onClick={() => closeAdd(false)}></div>
      <div className="popup-inner">
        <div className="popup-header bg-white text-dark sticky-top px-3 pt-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0">Add New Task</h6>
          <button className="close-btn" onClick={() => closeAdd(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <hr />
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                name="organization"
                id="organization"
                onChange={handleInputChange}
                className="form-control"
                value={formData.organization}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Task</label>
              <textarea
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
                className="form-control"
                value={formData.title}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="env">Env</label>
              <textarea
                name="env"
                id="env"
                onChange={handleInputChange}
                value={formData.env}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Images</label>
              <input
                type="file"
                name="images"
                id="images"
                className="form-control"
                multiple
                onChange={handleImage}
                accept=".png,.jpg,.jpeg,.webp"
              />
            </div>
            <div className="form-actions bg-white">
              <button type="submit" className="bg-white text-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
