import axios from 'axios'
export const fetchStatesByCountryId = async () => {
    try {
        const response = await axios.post(import.meta.env.VITE_STATES_API_URL, {
            country_id: 233
        })
        return response?.data?.data
    }
    catch (e) {
        console.log('FETCHING STATES ERRROR: ', e)
    }
}



export const fetchCitiesBasedOnStateId = async (stateId) => {
    try {
        const response = await axios.post(import.meta.env.VITE_CITY_API_URL,{
            state_id:stateId
        })
        return response?.data?.data
    }
    catch (e) {
        console.log('FETCHING CITIES ERROR: ', e)
    }
}