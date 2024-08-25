import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal'; 


const SingleTask = ({ task, onEditClick }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    return (
        <div className='item'>
            <div className='p-2 item-title '>
               <span>
                 {task.organization}
                </span>
                <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => onEditClick(task)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between p-2">
                <span className='span'>{task.title}</span>
            </div>
            <div className="row m-0">
                {task.imageUrls && task.imageUrls.length > 0 && (
                    task.imageUrls.map((imageUrl, index) => (
                        <div className="col-md-2 col-4 p-1" key={index}>
                            <img
                                src={imageUrl}
                                alt={`task_image_${index}`}
                                height={"auto"}
                                width={"100%"}
                                onClick={() => handleImage(imageUrl)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    ))
                )}
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Body>
                    <img src={selectedImage} alt="Full image" style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SingleTask;
