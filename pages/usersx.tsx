import { useQuery, gql } from '@apollo/client';
import { IUser } from '../resolvers/Mutation';

const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      role
      created
    }
  }
`;

const GetAllUsers = (): JSX.Element | never => {
  const { loading, error, data } = useQuery<{ getAllUsers: IUser[] }>(
    GET_USERS,
    {
      pollInterval: 500
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    return (
      <ul>
        {data.getAllUsers.map((user) => (
          <li key={user.id}>{user.name} {user.email} {user.role} {user.created}</li>
        ))}
      </ul>
    );
  } else throw new Error('No user');
};

export default GetAllUsers;
