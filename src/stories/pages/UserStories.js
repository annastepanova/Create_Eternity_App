import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StoryList from '../components/StoryList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hook'


const UserStories = () => {
  const [loadedStories, setLoadedStories] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const userId = useParams().userId

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stories/user/${userId}`
        )
        setLoadedStories(responseData.stories)
      }
      catch (err) {

      }
      
    }
    fetchStories()
  }, [sendRequest, userId])

  const storyDeletedHandler = (deletedStoryId) => {
    setLoadedStories(prevStories => prevStories.filter(story => story.id !== deletedStoryId))
  }

  
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      { isLoading && (
          <div className="center">
            <LoadingSpinner/>
          </div>
        )
      }
      { !isLoading && loadedStories && <StoryList items={loadedStories} onDeleteStory={storyDeletedHandler}/>}
    </>
  )
}


export default UserStories
