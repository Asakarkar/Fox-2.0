const fs = require('node:fs');
const path = require('node:path');

const dependencyPath = require.resolve('buffer-equal-constant-time');
const packagePath = path.join(path.dirname(dependencyPath), 'package.json');
const version = JSON.parse(fs.readFileSync(packagePath, 'utf8')).version;

if (version !== '1.0.1') {
  throw new Error(`Unexpected buffer-equal-constant-time version: ${version}`);
}

const original = "var SlowBuffer = require('buffer').SlowBuffer;";
const replacement = "var SlowBuffer = require('buffer').SlowBuffer || Buffer;";
const source = fs.readFileSync(dependencyPath, 'utf8');

if (source.includes(replacement)) {
  process.exit(0);
}

if (!source.includes(original)) {
  throw new Error('Could not find the expected SlowBuffer declaration to patch');
}

fs.writeFileSync(dependencyPath, source.replace(original, replacement));
