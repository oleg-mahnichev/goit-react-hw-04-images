import axios from 'axios';

const API_KEY = '38375403-409fa10b1f66841faf3e919b8';
const API_URL = 'https://pixabay.com/api/';

const fetchImages = async (query, page) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: query,
                page,
                key: API_KEY,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export default fetchImages;
