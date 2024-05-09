import './App.css'
import MainPage from './pages/MainPage';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import PageNotFound from "./pages/PageNotFound";
import AuthRootPage from "./pages/Auth/AuthRootPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AdminPages from "./pages/AdminPages";
import AdminPage from "./pages/AdminPage";
import UsersPage from "./pages/User/UsersPage";
import UserPage from "./pages/User/UserPage";
import StoresPage from "./pages/Store/StoresPage";
import StorePage from "./pages/Store/StorePage";
import StoresCreatePage from "./pages/Store/StoresCreatePage";
import {useDispatch, useSelector} from "react-redux";
import {getCurUser, initCurStore, selectToken} from "./redux/slices/auth";
import {useEffect} from "react";
import CategoriesPage from "./pages/Category/CategoriesPage";
import CategoryPage from "./pages/Category/CategoryPage";
import CategoryCreatePage from "./pages/Category/CategoryCreatePage";
import RolesPage from "./pages/Role/RolesPage";
import RolePage from "./pages/Role/RolePage";
import RoleCreatePage from "./pages/Role/RoleCreatePage";
import ProfilePage from "./pages/ProfilePage";
import OrderCreatePage from "./pages/Order/OrderCreatePage";
import OrderArticlePage from "./pages/Order/OrderArticlePage";
import OrderPage from "./pages/Order/OrderPage";
import SupplyPage from "./pages/Order/SupplyPage";
import DemandPage from "./pages/Order/DemandPage";
import OrdersPage from "./pages/Order/OrdersPage";
import StoreArticleCreatePage from "./pages/Article/StoreArticleCreatePage";
import StoreArticlePage from "./pages/Article/StoreArticlePage";
import StoreArticlesPage from "./pages/Article/StoreArticlesPage";


function App() {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)

    useEffect(() => {
        dispatch(initCurStore())
    }, [dispatch])

    useEffect(() => {
        if (token)
            dispatch(getCurUser(token))
    }, [dispatch, token])

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

                    <Route path="articles">
                        <Route
                            path=""
                            element={<StoreArticlesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<StoreArticlePage/>}
                            errorElement={<ErrorPage/>}
                        />
                        <Route
                            path="create"
                            element={<StoreArticleCreatePage/>}
                        />
                    </Route>

                    <Route path="orders">
                        <Route
                            path=""
                            element={<OrdersPage/>}
                        />
                        <Route
                            path=":id"
                        >
                            <Route
                                path=""
                                element={<OrderPage/>}
                            />
                            <Route
                                path="articles/:articleId"
                                element={<OrderArticlePage/>}
                            />
                        </Route>
                        <Route
                            path="create"
                            element={<OrderCreatePage/>}
                        />
                    </Route>

                    <Route path="demand">
                        <Route
                            path=""
                            element={<DemandPage/>}
                        />
                        <Route
                            path=":id"
                        >
                            <Route
                                path=""
                                element={<OrderPage/>}
                            />
                            <Route
                                path="articles/:articleId"
                                element={<OrderArticlePage/>}
                            />
                        </Route>
                    </Route>

                    <Route path="supply">
                        <Route
                            path=""
                            element={<SupplyPage/>}
                        />
                        <Route
                            path=":id"
                        >
                            <Route
                                path=""
                                element={<OrderPage/>}
                            />
                            <Route
                                path="articles/:articleId"
                                element={<OrderArticlePage/>}
                            />
                        </Route>
                    </Route>

                    <Route
                        path="profile"
                        element={<ProfilePage/>}
                    />

                </Route>

                <Route
                    path="/admin"
                    element={<AdminPages/>}
                >
                    <Route
                        path=""
                        element={<AdminPage/>}
                    />
                    <Route
                        path="users"
                    >
                        <Route
                            path=""
                            element={<UsersPage/>}
                        />

                        <Route
                            path=":id"
                            element={<UserPage/>}
                        />
                    </Route>
                    <Route path="stores">
                        <Route
                            path=""
                            element={<StoresPage/>}
                        />
                        <Route
                            path=":id"
                            element={<StorePage/>}
                        />
                        <Route
                            path="create"
                            element={<StoresCreatePage/>}
                        />
                    </Route>
                    <Route path="categories">
                        <Route
                            path=""
                            element={<CategoriesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<CategoryPage/>}
                        />
                        <Route
                            path="create"
                            element={<CategoryCreatePage/>}
                        />
                    </Route>
                    <Route path="roles">
                        <Route
                            path=""
                            element={<RolesPage/>}
                        />
                        <Route
                            path=":id"
                            element={<RolePage/>}
                        />
                        <Route
                            path="create"
                            element={<RoleCreatePage/>}
                        />
                    </Route>
                </Route>

                <Route
                    element={<AuthRootPage/>}
                >
                    <Route
                        path="login"
                        element={<LoginPage/>}
                    />
                    <Route
                        path="registration"
                        element={<RegisterPage/>}
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
