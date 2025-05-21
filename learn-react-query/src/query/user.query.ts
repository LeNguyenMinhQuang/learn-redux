import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface IUser {
    id: string;
    name: string;
    email: string;
}

// tái sử dụng querykey
export const QUERY_KEY = {
    getUserPaginate: (page: number) => {
        return ["fetchUsers", page];
    },
    refreshUserPage: () => {
        return ["fetchUsers"];
    },
};

// tái sử dụng useQuery
export const useQueryFetchAllUser = (page: number) => {
    return useQuery({
        queryKey: QUERY_KEY.getUserPaginate(page),
        queryFn: async (): Promise<{ users: IUser[]; total: number }> => {
            const res = await fetch(
                `http://localhost:3000/users?_page=${page}&_limit=5`
            );
            const _ = res.headers.get("X-Total-Count");
            const temp = _ ? parseInt(_) : 1;
            const data = await res.json();
            return { users: data, total: temp };
        },
        placeholderData: keepPreviousData, //giữ data cũ 1 lúc khi fetching data mới
    });
};
