export default {
  meta: {
    messages: {
      runtime: 'Wrong usage of runtime const, please use globalThis.{{name}}',
      buildTime: 'Wrong usage of buildtime const, please use {{name}} without globalThis',
    },
    schema: {
      type: "array",
    },
  },

  create(context) {
    return {
      Identifier(node) {
        const { name, parent } = node;
        const isBuildTimeVar = context.options[0].includes(name);

        if (name === name.toUpperCase()) {
          if (parent.type === 'VariableDeclarator' && !isBuildTimeVar) {
            context.report({
              node,
              messageId: "runtime",
              data: { name }
            });
          }

          if (parent.type === 'MemberExpression' && isBuildTimeVar && parent.object.name === 'globalThis') {
            context.report({
              node,
              messageId: "buildTime",
              data: { name }
            });
          }
        }
      }
    }
  }
}
