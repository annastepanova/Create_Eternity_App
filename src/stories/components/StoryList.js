import React from 'react'
import Card from '../../shared/components/UIElements/Card'
import StoryItem from './StoryItem'
import Button from '../../shared/components/FormElements/Button'
import './StoryList.css'


const StoryList = (props) => {

  if (props.items.length === 0) {

    return (
    <div className="story-list center">
      <Card>
        <h2>No stories found. May be create one?</h2>
        <Button to="/stories/new">Share a story</Button>
      </Card>
    </div>
    )
  }

  return (
    <>
      <ul className="story-list">
        {props.items.map(story => {
          return <StoryItem 
                  key={story.id} 
                  id={story.id} 
                  image={story.image} 
                  title={story.title} 
                  description={story.description} 
                  content={story.content} 
                  genre={story.genre} 
                  creatorId={story.creator}
                  onDelete={props.onDeleteStory}
                  // onClick={showText}
                />
      })}
      </ul> 
    </>
  )
}

export default StoryList
