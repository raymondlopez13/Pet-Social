import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                username
                email
            }
        }
    } 
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            username
            email
            password
            pets {
                breed
            }
        }
    }
`;

export const ADD_PET = gql`
    mutation addPet($name:String!,$type:String!,$breed:String!, $weight: String! $vaccinations: String, $medications: String) {
        addPet(name: $name, type: $type, breed: $breed, weight: $weight, vaccinations: $vaccinations, medications: $medications) {
            name
            type
            breed
            weight
            vaccinations
            medications 
        }
    }
`;

export const EDIT_USER = gql `
    mutation editUser($username: String!, $email: String!) {
        editUser(username: $username, email: $email) {
            username
            email
            pets {
                name
            }
        }
    }
`;

export const EDIT_PET = gql `
    mutation editPet($_id: ID!, $name:String,$type:String,$breed:String, $weight: String $vaccinations: String, $medications: String) {
        editPet(_id: $_id, name: $name, type: $type, breed: $breed, weight: $weight, vaccinations: $vaccinations, medications: $medications) {
            username
            email
            pets {
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

export const DELETE_PET = gql `
    mutation deletePet($_id: ID!) {
        deletePet(_id: $_id) {
            name
        }
    }
`;

export const DELETE_USER = gql `
    mutation deleteUser {
        deleteUser {
            username
        }
    }
`;