## DevHub Misc Scripts

### parity-check.sh

This script is for checking the HTML content between two DevHub environments.

#### Setup

For setup, start by running this command to give executable permissions:

```sh
chmod 777 ./scripts/parity-check.sh
```

Once done, we will install several other dependencies needed. This is in Ruby. [The sitediff guide can walk through installation of these](https://github.com/evolvingweb/sitediff/blob/master/INSTALLATION.md#macos).

Once done, run the script from the root of this repo by doing the following:

```sh
./scripts/parity-check.sh https://www.mongodb.com/developer <STAGING_SITE> <PATH_TO_ARTICLE>
```
