
export const typeDefs = `#graphql
  type Persona {
    nombre: String!
    id: ID!
  }

  type Planeta {
    id: ID!
    nombre: String!
    personas: [Persona]!
  }

  type Dimension {
    id: ID!
    nombre: String!
    planetas: [Planeta]!
  }

  type Tardis {
    id: ID!
    camuflaje: String!
    regeneracion: Int!
    anoActual: Int!
    dimensiones: [Dimension]!
  }

  type Query {
    getTardis(id: ID!): Tardis!
    getDimension(id: ID!): Dimension!
    getPlaneta(id: ID!): Planeta!
    getPersona(id: ID!): Persona!
    allTardis: [Tardis]!
  }

  type Mutation {
    putTardis(id: ID!, camuflaje: String!, regeneracion: Int!, anoActual: Int!, dimensionesID: [ID]!): Tardis!
    putDimension(id: ID!, nombre: String!, planetasID: [ID]!): Dimension!
    putPlaneta(id: ID!, nombre: String!, personasID: [ID]!): Planeta!
    putPersona(id: ID!, nombre: String!): Persona!

    deleteTardis(id: ID!): Tardis!
    deleteDimension(id: ID!): Dimension!
    deletePlaneta(id: ID!): Planeta!
    deletePersona(id: ID!): Persona!

    postTardis(camuflaje: String!, regeneracion: Int!, anoActual: Int!, dimensionesID: [ID]!): Tardis!
    postDimension(nombre: String!, planetasID: [ID]!): Dimension!
    postPlaneta(nombre: String!, personasID: [ID]!): Planeta!
    postPersona(nombre: String!): Persona!

      }
`;
