interface IUsers {
    id: string;
    name: string;
    email: string;
}

interface UsersInitialStatetype {
    listUsers: IUsers[];
}

export type { IUsers, UsersInitialStatetype };
