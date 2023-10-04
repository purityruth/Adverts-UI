import { apiSlice } from './apiSlice'

export const apiContentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        // create advert
        createAdvert: builder.mutation({
            query: (formData) => ({
                url: '/advert/create/',
                method: 'post',
                body: formData, // Assuming formData is an object with the necessary data
            }),
        }),

    })
})

export const {
    useCreateAdvertMutation
} = apiContentSlice;