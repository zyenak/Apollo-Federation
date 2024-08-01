export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface QueryResolvers {
    users: () => User[];
    user: (_: any, args: { id: string }) => User | undefined;
  }
  
  export interface UserResolvers {
    __resolveReference: (user: { id: string }) => User | undefined;
  }
  