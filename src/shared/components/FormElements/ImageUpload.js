import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'
import './ImageUpload.css'



const ImageUpload = (props) => {
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState()

  const fileAttachRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const attachedHandler = event => {
    let attachedFile
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1)  {
      attachedFile = event.target.files[0]
      setFile(attachedFile)
      setIsValid(true)
      fileIsValid = true
    }
    else {
      setIsValid(false)
      fileIsValid = false
    }
    props.onInput(props.id, attachedFile, fileIsValid)
  }

  const attachImageHandler = () => {
    fileAttachRef.current.click()
  }

  return (
    <div className="form-control">
      <input 
        id={props.id} 
        ref={fileAttachRef}
        style={{display: 'none'}} 
        type="file" 
        onChange={attachedHandler}
        accept=".jpg,.jpeg,.png"
      />
      <div className={`image_upload ${props.center && 'center'}`}>
        <div className="image_upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview"/>}
          {!previewUrl && <p>Please attach an image</p>}
        </div>
        <Button type="button" onClick={attachImageHandler}>ATTACH IMAGE</Button>
      </div>
      {!isValid && <p>{props.textError}</p>}
    </div>
  )

}

export default ImageUpload
