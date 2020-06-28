import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Button from '../../shared/components/FormElements/Button'
import { useHttpClient } from '../../shared/hooks/http-hook'
import './StoryText.css'

const StoryText = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStory, setLoadedStory] = useState()
  const storyId = useParams().storyId
  const history = useHistory()


  useEffect(() => {
    const fetchStory = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/stories/${storyId}`)
        setLoadedStory(responseData.story)
      }
      catch (err) {
      }
    }
    fetchStory()
  }, [sendRequest, storyId])

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedStory && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Can't find story</h2>
        </Card>
      </div>
    )
  }

  const goBack = () => {
    history.push('/users')
  }


  return (
    <>
    <ErrorModal error={error} onClear={clearError} />
      <div className="text_container">
        <Card>
          <div className="text">
            <p>{loadedStory.content}</p>
            <Button onClick={goBack} className="back">Back</Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StoryText
