# Candidate Library 
In this file are listed the libs that can be usefull.


## Shared contrats from schema
Shared contract between micro-services

GOAL: all micro-services codebase uses same definition of messages/events

### Generation
Generate specific language obj/class of contract/message/event starting from a Json Schema (
 `draft-07` schema is the most supported by generators) 

Usefull tool -->
[QuickType](https://github.com/glideapps/quicktype)

[npm quicktype link](https://www.npmjs.com/package/quicktype/v/15.0.254)
*"quicktype generates strongly-typed models and serializers from JSON, JSON Schema, TypeScript, and GraphQL queries, making it a breeze to work with JSON type-safely in many programming languages."*

```bash 
npx quicktype -s schema <schema-folder> -l <target-language> <flags> -o <out-folder>
```

### Validation
If needed (validation costs) you can check if received json message adhere to the schema (there are all fields and type are as expected)

- Typescript --> 
  - [ajv](https://ajv.js.org/) best one
  - *[zod](https://zod.dev/) (unofficial support for JSON Schema)*
- Scala / Kotlin (JVM) --> [json-schema-validator](https://mvnrepository.com/artifact/com.networknt/json-schema-validator)