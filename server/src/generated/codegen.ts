// generated by graphql-code-generator init
// https://www.apollographql.com/docs/apollo-server/workflow/generate-types/
import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "src/static/schema.graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;