// import { useAuthGeral } from 'src/features/auth/authHook';


import { BrowserRouter, Routes as RoutesWrapper, Route, } from 'react-router-dom';
import ListarImovel from 'src/views/public/ListarImovel/ListarImovel';



import Login from 'src/views/public/Login';

const Routes = () => {

    // const { auth: { Authenticated, user }, } = useAuthGeral()

    const router = () => {

        // const token = localStorage.getItem("sysSportToken");
        // if (token && Authenticated && user.role === "ADMINGERAL") {

        //     return RoutesAdminGeral()


        // }

        return <BrowserRouter>

            <RoutesWrapper>
                <Route path="/*" element={<ListarImovel />} />
                {/* <Route path="/*" element={<Login />} /> */}

            </RoutesWrapper>
        </BrowserRouter>


    }

    return router()



}

export default Routes