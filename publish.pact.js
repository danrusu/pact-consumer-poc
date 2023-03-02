const pact = require('@pact-foundation/pact-node');
const path = require('path');
const childProcess = require('child_process');

if (!process.env.CI && !process.env.PACT_PUBLISH) {
  console.log('Skipping Pact publish.');
  process.exit(0);
}

const gitHash = runGitCmd('git rev-parse --short HEAD');
const gitBranch = runGitCmd('git rev-parse --abbrev-ref HEAD');

const pactBroker = process.env.PACT_BROKER_BASE_URL;
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

if (!(pactBroker && pactBrokerToken)) {
  console.error(
    'To publish a PACT, the following env vars are required: PACT_BROKER_BASE_URL, PACT_BROKER_TOKEN.',
  );
  process.exit(1);
}

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pact', 'pacts')],
  pactBroker,
  pactBrokerToken,
  consumerVersion: gitHash,
  branch: gitBranch,
};

pact
  .publishPacts(opts)
  .then(() => {
    [
      'Pact contract publishing complete!',
      `Consumer branch: ${gitBranch}`,
      `Consumer version (git hash): ${gitHash}`,
      `Head over to ${pactBroker} to see your published contracts.`,
    ].forEach(text => console.log(text));
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e);
  });

function runGitCmd(cmd) {
  return childProcess.execSync(cmd).toString().trim();
}
