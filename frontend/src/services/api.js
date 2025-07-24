import axios from 'axios'
export const fetchStatesByCountryId = async () => {
    try {
        const response = await axios.post(import.meta.env.VITE_STATES_API_URL, {
            country_id: 233
        })
       return response
    }
    catch (e) {
        console.log('FETCHING STATES ERRROR', e)
    }
}