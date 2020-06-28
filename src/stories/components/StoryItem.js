import React, { useState, useContext } from 'react'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/AuthContext'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './StoryItem.css'


const StoryItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const showDeleteWarning = () => {
    setShowConfirmModal(true)
  }

  const cancelDelete = () => {
    setShowConfirmModal(false)
  }

  const confirmDelete = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/stories/${props.id}`, 
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        })
      props.onDelete(props.id)
    }
    catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
    <Modal
      show={showConfirmModal} 
      onCancel={cancelDelete}
      header="Are you sure?" 
      footerClass="story-item__modal-actions" 
      footer={
        <>
        <Button inverse onClick={cancelDelete}>CANCEL</Button>
        <Button danger onClick={confirmDelete}>DELETE</Button>
        </>
    }>
      <p>Do you want to proceed and delete this story?</p>
    </Modal>
    <li className="story-item">
      <Card className="story-item__content">
        {isLoading && <LoadingSpinner asOverlay/>}
        <div className="story-item__image">
          <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title}/>
        </div>
        <div className="story-item__info">
          <h2>{props.title}</h2>
          <h3>{props.genre}</h3>
          <p>{props.description}</p>
        </div>
        <div className="story-item__actions">
          <Button to={`/stories/read/${props.id}`}>READ</Button>
          {auth.userId === props.creatorId && (
            <Button edit to={`/stories/update/${props.id}`}>EDIT</Button>
          )}
            {auth.userId === props.creatorId && (
            <Button danger onClick={showDeleteWarning}>DELETE</Button>
          )}
        </div>
      </Card>
    </li>
    </>
  )
}

export default StoryItem
