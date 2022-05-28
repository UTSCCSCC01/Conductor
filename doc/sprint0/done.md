### Our definition of done

End result:

We expect to build an application that includes 2 main components. These are:

1.
Orchestra, our web interface/portal for managing installed bots/programs on connected user devices. Each user will be provided with capabilities to append, schedule, edit/manage (to some extent), and shop for community written bots. Orchestra will also provide the interface for installing bots in 1 of 2 ways, via a bot's repo's pre-built executable, or via a bot's source code, which will consequently need to be compiled/built by the user (along with the corresponding updates to Cogitavit). A user's local collection of bots on a device will be syncable with their profile for Orchestra on the cloud.

2.
Cogitavit, which will be a device/platform specific service (ex. daemon) whose contents reflects that of the corresponding device specific data and UI/UX elements of Orchestra. Cogitavit will be responsible for managing the application payloads (i.e. executables and code) in order to set them up on user devices in a such a way that cooperates with the coordination of their execution which is accomplished via Orchestra.


__Before marking user story as done:
- A team member has reviewed and approved on Jira
- User Story has been completed
		- The functionality implied by the user story has been implemented
		- The code is merged into main branch after being reviewed by everyone
- Changes to the codebase are documented
- All tests pass
		- No Bugs
		- Unit Testing Passed
		- Integration testing Passed
