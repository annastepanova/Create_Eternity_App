import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Home from './Home'
import Users from './user/pages/Users'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/AuthContext'
import { useAuth } from './shared/hooks/auth-hook'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

const NewStory = React.lazy(() => import('./stories/pages/NewStory'))
const UserStories = React.lazy(() => import('./stories/pages/UserStories'))
const StoryText = React.lazy(() => import('./stories/components/StoryText'))
const UpdateStory = React.lazy(() => import('./stories/pages/UpdateStory'))
const Auth = React.lazy(() => import('./user/pages/Auth'))


const App = () => {

  const { token, login, logout, userId } = useAuth()

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/:userId/stories" component={UserStories} />
        <Route exact path="/stories/new" component={NewStory} />
        <Route exact path="/stories/update/:storyId" component={UpdateStory} />
        <Route exact path="/stories/read/:storyId/" component={StoryText} />
        <Redirect to="/" />
      </Switch>
    )
  }
    else {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/:userId/stories" component={UserStories} />
          <Route exact path="/stories/read/:storyId/" component={StoryText} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      )
    }
  
 
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token, 
      userId: userId, 
      login: login, 
      logout: logout}}>
      <Router>
        <MainNavigation/>
          <main id="center">
            <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
              {routes}
            </Suspense>
          </main>
      </Router>
    </AuthContext.Provider>
  )
  
}

export default App
