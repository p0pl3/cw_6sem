import './App.css'
import MainPage from './pages/MainPage';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import PageNotFound from "./pages/PageNotFound";


function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route
                    path=""
                    element={<RootPage/>}
                    errorElement={<ErrorPage/>}
                >
                    <Route
                        path=""
                        element={<MainPage/>}
                    />
                </Route>
                <Route
                    path="*"
                    element={<PageNotFound/>}
                />
            </Route>
        )
    )

    return (
        <RouterProvider router={router}/>
    )
}

export default App;
