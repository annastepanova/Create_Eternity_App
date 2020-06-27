import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import './UserItem.css'

const UserItem = (props) => {

  return (
    <li className="user-item">
        <Card className="user-item_content">
          <Link to={`/${props.id}/stories`}>
            <div className="user-item_image">
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name}/>
            </div>
            <div className="user-item_info">
              <h2>{props.name}</h2>
              <h3>
                {props.storycount} {props.storycount === 1 ? 'Story' : 'Stories'}
              </h3>
            </div>
          </Link>
        </Card>
    </li>
  )

}

export default UserItem
