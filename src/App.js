import Main from "./pages/main"
import { Routes, Route } from "react-router-dom"

function App() {
   return (
      <div className="App">
         <Routes>
            {/* {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}>
                           {route.children &&
                              route.children.map((childRoute, childIndex) => (
                                 <Route key={childIndex} path={childRoute.path} element={childRoute.element} />
                              ))}
                        </Route>
                     ))} */}
            <Route exact path="/" element={<Main />} />
         </Routes>
      </div>
   )
}

export default App
