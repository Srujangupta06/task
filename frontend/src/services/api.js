import axios from 'axios'
import { NUMBER_OF_RECORDS } from '../utils/constants'

const info = import.meta.env

export const fetchStatesByCountryId = async () => {
    try {

        const response = await axios.post(info.VITE_STATES_API_URL, {
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
        const response = await axios.post(info.VITE_CITY_API_URL, {
            state_id: stateId
        })
        return response?.data?.data
    }
    catch (e) {
        console.log('FETCHING CITIES ERROR: ', e)
    }
}


export const fetchUsers = async (currentPage) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/job-seeker/list?page=${currentPage}&limit=${NUMBER_OF_RECORDS}`
        );

        if (response.status === 200) {
            return [response.data?.data, response.data?.totalCount];
        }
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
};
