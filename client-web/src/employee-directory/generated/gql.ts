/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "#graphql\nquery GetEmployees($limit: Int, $offset: Int, $id: String) {\n    allEmployees(limit: $limit, offset: $offset, id: $id) {\n        id\n        first_name\n        last_name\n        birth_date\n        department {\n            id\n            dept_name\n        }\n    }\n}": types.GetEmployeesDocument,
    "#graphql\n    query SearchEmployeeByFullName($fullName: String, $limit: Int = 5) {\n        searchEmployeeByFullName(full_name: $fullName, limit: $limit) {\n            id\n            full_name\n            highlight\n        }\n    }": types.SearchEmployeeByFullNameDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\nquery GetEmployees($limit: Int, $offset: Int, $id: String) {\n    allEmployees(limit: $limit, offset: $offset, id: $id) {\n        id\n        first_name\n        last_name\n        birth_date\n        department {\n            id\n            dept_name\n        }\n    }\n}"): (typeof documents)["#graphql\nquery GetEmployees($limit: Int, $offset: Int, $id: String) {\n    allEmployees(limit: $limit, offset: $offset, id: $id) {\n        id\n        first_name\n        last_name\n        birth_date\n        department {\n            id\n            dept_name\n        }\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "#graphql\n    query SearchEmployeeByFullName($fullName: String, $limit: Int = 5) {\n        searchEmployeeByFullName(full_name: $fullName, limit: $limit) {\n            id\n            full_name\n            highlight\n        }\n    }"): (typeof documents)["#graphql\n    query SearchEmployeeByFullName($fullName: String, $limit: Int = 5) {\n        searchEmployeeByFullName(full_name: $fullName, limit: $limit) {\n            id\n            full_name\n            highlight\n        }\n    }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;