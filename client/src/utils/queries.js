import gql from 'graphql-tag';

export const USER = gql `
    query user($username: String!) {
        user(username: $username) {
            username
            email
            pets {
                _id
                name
                type
                breed
                weight
                medications
                vaccinations
            }
        }
    } 
`;