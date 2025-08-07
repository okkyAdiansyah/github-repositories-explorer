import axios from "axios";
import { dataTransfrorm } from "@utils/transformer/dataTransform";
import type { IResponseUsername, IResponseUserRepos } from "@lib/types/response";

export const fetchUsername = async (q: string): Promise<IResponseUsername[]> => {
    const res = await axios.get(`https://api.github.com/search/users?q=${q}+in:login&per_page=5`);
    const formatted = dataTransfrorm.usersList(res.data.items);
    
    return formatted;
}

export const fetchRepo = async (url: string): Promise<IResponseUserRepos[]> => {
    const res = await axios.get(url);
    const formatted = dataTransfrorm.reposList(res.data);

    return formatted;
}