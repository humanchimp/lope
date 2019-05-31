import babel from "@babel/core";
import generate from "@babel/generator";
import canter from "@topl/canter";
import { promise as matched } from "matched";

type Config =
  | {
      include: string[];
      exclude: string[];
    }
  | string[]
  | string;

const entry = "\0@topl/lope:entry-point";

export default function(config: Config) {
  let include = [];
  let exclude = [];

  if (config) {
    configure(config);
  }

  return {
    options(options: { input: string }) {
      if (options.input && options.input !== entry) {
        configure(options.input);
      }
      options.input = entry;
    },

    resolveId(id: string): string {
      if (id === entry) {
        return entry;
      }
    },

    async load(id: string): Promise<string> {
      if (id === entry) {
        if (!include.length) {
          return "";
        }
        const patterns = include.concat(exclude.map(pattern => `!${pattern}`));
        const matches = await matched(patterns, { realpath: true });

        return `${matches
          .map(
            (path, i) =>
              `import { $suite$ as suite${i} } from ${JSON.stringify(path)};`
          )
          .join("\n")};
import { of } from "@topl/hiho";
export default function (options) {
  return of(${[...matches.keys()].map(i => `suite${i}(options)`).join(',')});
};`;
      }
    },

    transform(code: string, filename: string): { map: string; code: string } {
      const ast = babel.parse(code);
      const { visitor } = canter(filename);

      babel.traverse(ast, visitor);

      return generate(
        ast,
        { sourceMaps: true, sourceFileName: filename },
        code
      );
    }
  };

  function configure(config: Config) {
    if (typeof config === "string") {
      include = [config];
    } else if (Array.isArray(config)) {
      include = config;
    } else {
      include = config.include || [];
      exclude = config.exclude || [];
    }
  }
}
