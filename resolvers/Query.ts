import { IContext } from '../pages/api/graphql';

type Role = 'USER' | 'ADMIN';

export interface IUser {
  id: number,
  name?: string | null,
  email: string,
  role: Role,
  created: Date
}

interface IUserQuery {
  email: string
}

const getAllUsers = async (
  _: null,
  __: null,
  context: IContext
): Promise<IUser[]> => {
  const users = await context.prisma.user.findMany();
  if (!users) throw new Error('No users');
  return users;
};

const getUserById = async (
  _: null,
  args: IUserQuery,
  context: IContext
): Promise<IUser> => {
  const user = await context.prisma.user.findFirst({
    where: { email: args.email }
  });
  if (!user) throw new Error('User dont exist.');
  return user;
};

export { getAllUsers, getUserById };