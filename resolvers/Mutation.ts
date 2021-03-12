import { IContext } from '../pages/api/graphql';

type Role = 'USER' | 'ADMIN';

export interface IUser {
  id: number,
  name?: string | null,
  email: string,
  role: Role,
  created: Date
}

interface ISignupData {
  name?: string | null,
  email: string,
  password: string,
}

interface ILoginData {
  email: string,
  password: string
}

const signup = async (
  _: void,
  args: ISignupData,
  context: IContext
): Promise<IUser | never> => {
  const user = await context.prisma.user.create({
    data: { ...args }
  });
  if (!user) throw new Error('create user failed');
  return user;
};

const login = async (
  _: void,
  args: ILoginData,
  context: IContext
): Promise<IUser | never> => {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
  if (!user) throw new Error('User need to sign up.');
  if (user.password === args.password)
    return user;
  else
    throw new Error('Password is not correct.');
};

export { signup, login };
