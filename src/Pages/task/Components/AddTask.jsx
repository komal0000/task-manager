import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";
import { useAuth } from "../../../Context/AuthContext";
import { getCollectionName } from "../../../Constants";
import $ from "jquery";

const AddTask = ({ db, closeAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    env: "",

  });
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const { user } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    try {
      await addDoc(collection(db, getCollectionName()), {
        title: formData.title,
        organization: formData.organization,
        status: "Pending",
        env: formData.env,
        user: user.email,
        imageUrl,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      closeAdd(false);
      setFormData({ title: "", organization: "" });
      setImage(null);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    $('.dropify').dropify();
  }, [])
  return (
    <div className="popup">
      <div className="popup-back" onClick={closeAdd}></div>
      <div className="popup-inner">
        <div className="popup-header bg-white text-dark sticky-top px-3 pt-3 d-flex align-items-center justify-content-between">
          <h6 className="m-0">Add New Task</h6>
          <button className="close-btn" onClick={closeAdd}>
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
              <input
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
              <textarea type="text" name="env" id="env" onChange={handleInputChange} value={formData.env} className="form-control" />
            </div>
            {/* <div className="form-group">
              <label htmlFor="image">Image</label>
              <input type="file" name="Image" id="image" className="form-control dropify" onChange={(e)=>setImage(e.target.files[0])}/>
            </div> */}
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
