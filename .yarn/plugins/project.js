module.exports = {
  name: `plugin-project`,
  factory: require => {
    const { BaseCommand } = require('@yarnpkg/cli');
    const { Configuration, Project, Manifest } = require('@yarnpkg/core');

    class ProjectCommand extends BaseCommand {
      static paths = [['project']];

      async execute() {
        const manifest = await Manifest.tryFind(this.context.cwd);
        // const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        // const { project } = await Project.find(configuration, this.context.cwd);
        //
        // const activeWorkspace = project.tryWorkspaceByCwd(this.context.cwd);
        // const manifest = activeWorkspace.manifest;

        const meta = {
          name: manifest.name.name,
          version: manifest.raw.version,
          author: manifest.raw.author,
          description: manifest.raw.description,
          dependencies: []
        }

        Object.entries(manifest.raw.dependencies).forEach(([key, value]) => {
          meta.dependencies.push(`${key}: ${value}`);
        });

        this.context.stdout.write(JSON.stringify(meta));

        return 0;
      }
    }

    return {
      commands: [ProjectCommand]
    };
  }
};
