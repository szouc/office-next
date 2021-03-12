import { IUser } from '../resolvers/Mutation';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type IIUser = IUser | { created: string }

export default function GetAllUsers({ users }: { users: IUser[] }): JSX.Element {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} {user.email} {user.created}</li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps<{ users: IIUser[] }> = async () => {
  const users = await prisma.user.findMany();
  const stringifyUsers = users.map(user => ({ ...user, created: JSON.stringify(user.created) }));
  return {
    props: { users: stringifyUsers },
    revalidate: 1
  };
};
