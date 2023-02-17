import {Resolvers} from "./generated/graphql";

export const resolvers: Resolvers = {
    Query: {
        async allStaffs() {
            return [
                {
                    id: "12345",
                    name: "jason",
                    age: 88,
                    department: "IT",
                },
                {
                    id: "456",
                    name: "juliet",
                    age: 25,
                    department: "IT",
                },
            ];
        },
    },
};
