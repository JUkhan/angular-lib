const { execSync } = require('child_process');
const fs = require('fs');

const args = process.argv.slice(2);
let branchName;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-b' && i + 1 < args.length) {
    branchName = args[i + 1];
    break;
  }
}

if (!branchName) {
  console.error('Branch name is required with the -b flag.');
  process.exit(1);
}

const initialCommitHash = 'b65ba53';
const basePath = 'dist/streamstech/ui-sdk';
const gitDir = '.git'
const gitignorePath = '.gitignore'

try {
  console.log('Building the project...');
  execSync('npm run lib:build', { stdio: 'inherit' });

  console.log('Changing directory to /dist/streamstech/ui-sdk...');
  process.chdir(basePath);

  console.log('Initializing git repository...');
  execSync('git init', { stdio: 'inherit' });

  try {
    execSync('git remote get-url origin', { stdio: 'ignore' });
    console.log('Remote origin already exists. Skipping addition.');
  } catch (error) {
    console.log('Adding remote origin...');
    execSync('git remote add origin https://github.com/JUkhan/uisdk.git', { stdio: 'inherit' });
  }

  console.log('Fetching from remote...');
  execSync('git fetch', { stdio: 'inherit' });

  const branches = execSync(`git ls-remote --heads origin ${branchName}`).toString();
  const branchExists = branches.includes(`refs/heads/${branchName}`);
  if (branchExists) {
    console.log(`Branch ${branchName} exists in remote. Deleting...`);
    execSync(`git push origin --delete ${branchName}`);
    console.log(`Branch ${branchName} deleted from remote successfully.`);
  } else {
    console.log(`Branch ${branchName} does not exist in remote.`);
  }

  if (fs.existsSync(gitignorePath)) {
    console.log('Removing .gitignore file...');
    fs.unlinkSync(gitignorePath);
  } else {
    console.log('.gitignore file not found.');
  }

  console.log(`Checking if branch '${branchName}' exists...`);
  try {
    execSync(`git rev-parse --verify ${branchName}`, { stdio: 'ignore' });
    console.log(`Branch '${branchName}' already exists. Deleting the existing branch.`);
    execSync(`git branch -D ${branchName}`, { stdio: 'inherit' });
  } catch (error) {
    console.log(`Branch '${branchName}' does not exist. Proceeding to create a new one.`);
    console.log('Creating a new branch...');
    execSync(`git checkout -b ${branchName} ${initialCommitHash}`, { stdio: 'inherit' });
  }

  try {
    console.log('Committing changes...');
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -q -m "Npm package version: ${branchName}"`, { stdio: 'ignore' });
  } catch (error) {
    console.error('Error executing git commands:', error.message);
  }

  console.log('Pushing branch to remote...');
  execSync(`git push -u origin ${branchName}`, { stdio: 'inherit' });

  removeGitDirectory(gitDir)

  console.log('Git commands executed successfully!');
} catch (error) {
  console.error('Error executing git commands:', error.message);
  removeGitDirectory(gitDir)
  process.exit(1);
}

function removeGitDirectory(gitDir) {
  try {
    console.log("Removing .git directory...");
    execSync(`npx rimraf ${gitDir}`);
    console.log(".git directory removed successfully.");
  } catch (error) {
    console.error("Error removing .git directory:", error.message);
  }
}