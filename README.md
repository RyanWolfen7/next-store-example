# Next-Store-Example
Runtime for the codebase is NodeJS 16 with React, NextJS, and Redux powering the frontend to connect to a private GraphQL Strapi API: displaying customizable ecommerce content

## Local Docker Setup Linux/Windows/Mac

### Prerequisites 

- MUST have Docker Hub account with read access to `next-store-example-docker` organization
- Install and open `Docker Desktop` 
- [Windows Only] verify `WSL v2` inside `Powershell` by running `wsl -l -v`: should have Ubuntu running on version 2
- [Windows Only] Open `Docker Desktop` -> `Settings` -> turn on `Expose daemon on tcp://localhost:2375 without TLS` -> `Apply & Restart`
- [Windows Only] Open `Docker Desktop` -> `Settings` -> turn on `Use the WSL 2 based enginge` -> `Apply & Restart`Prerequisites

### Get Necessary Files
1. `git clone https://github.com/RyanWolfen7/next-store-example.git && cd Next-Store-Example`
- Current Working Directory (CWD) should remain the same for the rest of setup: at base of repo

### Initiate Docker
2. Start Docker
```bash
ifconfig lo0 alias 127.0.4.0 up # Mac only
docker-compose up -d
```

### Setup Local CA
Step (3) may be skipped if the root CA has already been added in a previous installation
3. Trust `CA.pem` as root CA
- container MUST be running which is performed in step (3)
- (3a) get file `CA.pem` by running this command
```bash
#make sure the current working directory is at the root of the repo
docker cp next-store-example-app:/node/certs/CA.pem ./
```
- (3b) Follow OS specific directions here to add `CA.pem` as a trusted root certificate authroity: https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/#installing-root-cert

### Setup DNS
4. Add the following line to the `hosts` file
```
#Next-Store-Example
127.0.4.0 store.next-store-example.tech
```
- [Linux/Mac] add lines to `/etc/hosts` in text editor of choice -> save and quit  
- [Windows] open `Notepad` as `Administrator` -> navigate to `C:\Windows\System32\drivers\etc\hosts` inside file explorer (may need to tell file explorer to dispaly all files) -> add lines to file -> save and quit

### Verify Installation
5. Inside browser, visit `https://store.next-store-example.tech` 
- MUST have `wp_beanstalk` Docker containers running to be able to login

# When to rebuild image
Rebuild the image when any of the following are true
- `package.json` or `package-lock.json` has changed
- `server.js` has changed
To rebuild image, do run the following:
```bash
docker-compose up -d --build node
```

# Debug
1. Once Docker is running, go to the debugger section in `VSCode` (Crtl+Shift+D) and click `Docker: Attach to Node` to attach to the container.
2. Set code breakpoints (if any) and exception breakpoints (if any).
3. Go to website and perform a flow of actions to hit the breakpoint(s) desired. 
