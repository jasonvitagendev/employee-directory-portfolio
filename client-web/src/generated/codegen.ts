import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: `${process.env.GRAPHQL_API}`,
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "src/generated/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
