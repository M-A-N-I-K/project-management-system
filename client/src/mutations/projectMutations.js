import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
	mutation AddProject(
		$name: String!
		$description: String!
		$status: ProjectStatus!
		$clientId: ID!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			id
			name
			description
			status
			client {
				name
				email
				phone
				id
			}
		}
	}
`;

const UPDATE_PROJECT = gql`
	mutation UpdateProject(
		$name: String!
		$description: String!
		$status: ProjectStatusUpdate!
		$id: ID!
	) {
		updateProject(
			name: $name
			description: $description
			status: $status
			id: $id
		) {
			id
			name
			description
			status
		}
	}
`;

const DELETE_PROJECT = gql`
	mutation DeleteProject($id: ID!) {
		deleteProject(id: $id) {
			id
		}
	}
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
