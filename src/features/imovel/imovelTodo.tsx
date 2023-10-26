import { rtkApi } from "../rtkquery";


export const todoAPI = rtkApi.injectEndpoints({

    endpoints: (builder) => ({
        listImovel: builder.query<any[], any>({

            query: () => {
                return {
                    url: '/imovel',
                    method: 'GET'
                }

            }
        })
    })
})