import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
	query getProjects {
		projects {
			id
			name
			status
		}
	}
`;

const GET_PROJECT = gql`
	query getProjects {
		projects {
			id
			name
			status
		}
	}
`;

export { GET_PROJECTS };
