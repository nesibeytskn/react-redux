import {HashRouter, Routes, Route} from 'react-router-dom'
import { connect } from 'react-redux'



import Footer from './components/footer'
import Header from './components/header'

import Home from './pages/home'
import Login from './pages/login'
import Categories from './pages/categories'
import Services from './pages/services'
import Register from './pages/register'
import useApi from './hooks/useApi'
import { SET_CATEGORIES } from './redux/reducers/categoriesReducer'






function App(props) {
  console.log('>> APP PROPS', props)

  const api = useApi()
  if( props.categoriesState.initialized === false){
    api.get('https://api.adoptez1artisan.com/public/categories/listMainCategories')
    .then((response)=> {
      console.log('>> RES CATEGORY LIST', response)

      const action ={
          type: SET_CATEGORIES,
          payload:{
            categories: response.data.data,
          },
        }
      
      props.dispatch(action)

    })
    .catch((err)=> {
      console.error('>>ERR CATEGORY LIST', err)
    })

  }

  
  return (
    <div className="container py-3">
      <Header/>
      <HashRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="categories:slug" element={<Categories/>}/>
          <Route path="services" element={<Services/>}/>
          <Route path="register" element={<Register/>}/>

        </Routes>

      </HashRouter>
      <Footer/>
      
    </div>
  );
}

const mapStateToProps =(state) => {
  console.log('>> MAP STATE', state)
  return {
    ...state,
  }
}

export default connect(mapStateToProps) (App);
