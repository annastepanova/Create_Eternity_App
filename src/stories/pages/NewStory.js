import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/Validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/AuthContext'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import './StoryForm.css'


const NewStory = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
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
      },
      genre: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  )

  const history = useHistory()

  const storySubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('content', formState.inputs.content.value)
      formData.append('genre', formState.inputs.genre.value)
      formData.append('image', formState.inputs.image.value)

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/stories', 
        'POST', 
        formData,
        { Authorization: 'Bearer ' + auth.token}
      )
      history.push('/' + auth.userId + '/stories')  
    }
    catch (err) {
    }
  }



  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="story-form" onSubmit={storySubmitHandler}>
        { isLoading && <LoadingSpinner asOverlay />}
        <Input 
        id="title"
        element="input" 
        type="text" 
        label="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid title"
        onInput={inputHandler}/>
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          maxlength="250"
          errorText="Please enter a valid description (min 5 characters)"
          onInput={inputHandler} />
        <Input
          id="content"
          element="textarea"
          type="text"
          label="Content"
          rows="6"
          maxlength="3000"
          validators={[VALIDATOR_MINLENGTH(25)]}
          errorText="Please enter a valid content (min 25 characters)"
          onInput={inputHandler} />
        <Input
          id="genre"
          element="input"
          type="text"
          label="Genre"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid genre"
          onInput={inputHandler} />
          <ImageUpload 
            id="image" 
            onInput={inputHandler}
            errorText="Please provide an image"/>
        <Button type="submit" disabled={!formState.isValid}>
          ADD STORY
        </Button>
      </form>
    </> 

  )
}

export default NewStory
