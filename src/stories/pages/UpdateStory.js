import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/AuthContext'
import './StoryForm.css'


const UpdateStory = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedStory, setLoadedStory] = useState()
  const storyId = useParams().storyId
  const history = useHistory()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      content: {
        value: '',
        isValid: false
      }
    },
    false
  )

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/stories/${storyId}`)
        setLoadedStory(responseData.story)
        setFormData(
          {
            title: {
              value: responseData.story.title,
              isValid: true
            },
            description: {
              value: responseData.story.description,
              isValid: true
            },
            content: {
              value: responseData.story.content,
              isValid: true
            }
          },
          true
        )
      }
      catch (err) {
      }
    }
    fetchStory()
  }, [sendRequest, storyId, setFormData])
  
  const storyUpdateSubmitHadler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stories/${storyId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          content: formState.inputs.content.value,
        }),
        { 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      )
      history.push('/' + auth.userId + '/stories')
    }
    catch (err) {}
  }

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

  return ( 
    <>
      <ErrorModal error={error} onClear={clearError}/>
      {!isLoading && loadedStory && <form className="story-form" onSubmit={storyUpdateSubmitHadler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={loadedStory.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        maxlength="250"
        errorText="Please enter a valid description (min 5 characters)"
        onInput={inputHandler}
        initialValue={loadedStory.description}
        initialValid={true}
      />
      <Input
        id="content"
        element="textarea"
        label="Content"
        validators={[VALIDATOR_MINLENGTH(25)]}
        maxlength="3000"
        rows="6"
        errorText="Please enter a valid content (min 25 characters)"
        onInput={inputHandler}
        initialValue={loadedStory.content}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE STORY
      </Button>
    </form>
    }
  </>
  )
}

export default UpdateStory
