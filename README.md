# Getting Started

The NextJS and FastAPI images are stored in Deploy -> Container Registry in GitLab. Use these instructions to pull the images onto your local environment and launch the containers. These should all be done in the `data-foundry-2023` directory.

1. Authenticate with the Container Registry on your laptop. This must be done every time you restart your laptop. There are two main ways to do this:
- Login using your GitLab username and password:
```bash
docker login gitlab-registry.oit.duke.edu
```
(You can copy the command above from Deploy -> Container Registry -> CLI Commands -> Login.) Press Enter, and you will be prompted to enter your GitLab username and password. If login is successful, you will receive the message "Login succeeded".

Note that this method only works if Two-Factor Authentication (2FA) is disabled in your GitLab. If your 2FA is enabled, or for any other reason the above method does not work, you need to use the second method.
- Login using a personal access token:
If you do not have a personal access token set up in your GitLab account, follow these steps to create one: [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). In order to grant read/write (push/pull) access to your token, in the "Select scopes" section, you must enable at least `read_registry` and `write_registry`. 

In a terminal, run
```bash
docker login -u <username> -p <access_token> $CI_REGISTRY
```
For more information on authenticating with the Container Registry, see here: [authenticate with Container Registry](https://docs.gitlab.com/ee/user/packages/container_registry/authenticate_with_container_registry.html).

2. In your `compose.yml` file, at the end of the `image` lines of the two services (`app` and `fastapi`), change the part after the last colons (right after `data-foundry-2023-app` and `data-foundry-2023-fastapi`) to the name of the branch you are currently on (for example, `main` or `dockerize`.) This part corresponds to the image tag. Since every branch creates their own images with the same name but different tags (you can view this in the Container Registry), you need to change the tag to your branch name to ensure you are pulling the correct image for your branch.

3. In a terminal, run
```bash
docker compose up
```
Note that it might take a while for Docker to pull the images and launch them (can be up to 2-3 minutes in my experience.)

### Pushing to GitLab
Thanks to the configurations in the `.gitlab-ci.yml` file, every time you commit and push code to GitLab, GitLab will automatically build and push new images to the Container Registry, with the appropriate tag (your current branch name).

### Side note:
Docker is heavily cached, so after your first time pulling the images from the Registry, Docker will cache those images. All subsequent times you run `docker compose up`, instead of pulling the images again, Docker will just use the previously-cached images. This helps save a lot of time, but it can also be a pain if you have a major error and you want to edit the images and launch new containers.

To resolve this issue and force Docker to create new images based on your new code, run the following commands:
1. Stop all running containers by using `Ctrl + C`.
2. Delete all stopped containers, networks, and cached images by running
```bash
docker system prune -a
```
3. Launch the containers again:
```bash
docker compose up
```




