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
  
  import { Request } from 'express';

export interface Context {
  user?: any; // Replace 'any' with a more specific type for your user object
}

export type ContextFunction = (req: Request) => Context;
