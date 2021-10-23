import axios from "axios";

export class SongService {
    private baseUrl = process.env.REACT_APP_BACKEND_URL;

    public async search(searchTerm: string) {
        let requestUrl = `${this.baseUrl}/songs`;
        if (searchTerm) {
            requestUrl += `?searchTerm=${searchTerm}`;
        }
        const response = await axios.get(requestUrl);
        return response?.data;
    }
}