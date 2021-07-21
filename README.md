# TheOldNet Webring

---

This is a basic webring for TheOldNet.

As a first pass, I decided not to use a database, that can be added later. The websites live in a file called `websites.yaml` in the root of the directory until we have a database.

This file should probably not be in a public repo once there are real websites, especially if we decide to keep the email of the owner of the website as well.

## Running the service

In order to run the service you need to run `yarn` first to install the dependencies.

Then there are the following commands:

- `yarn start` - Runs the service as is.
- `yarn dev` - Runs the service with auto-restart when files are changed.
- `yarn tsc` - Compiles the service from Typescript to Javascript.
