import infra from "./build/eslint-plugin-infra/index.js";
import { BUILD_VARIABLES } from './build/const/webpack.js';

export default [
  {
    files: ["src/*.js"],
    plugins: { infra },
    rules: {
      "infra/strict-const": ['error', Object.keys(BUILD_VARIABLES)]
    }
  }
];
