# Release Planning Meeting (RPM)

## Release Goals and Plan

### Release 1

The goal of release 1 is to allow users to sign up and log in to the web app, accessing major features provided by the Orchestra. After users are logged in, users should be able to:

* Use a basic calendar to generate events
* Add/remove connected devices
* See and log in on a specific device to schedule
* View bots on the marketplace
* View description of a specific bot

User stories to be completed during the release 1:

* Signup and Login

	* (1) As a new user, I want to create a unique account that I can log back into so that I can save and securely access my services (Orchestra).

* Calendar

	* (21) As a standard user, I want to be able to use a calendar to generate events, so that I can use them as triggers.

* Device Status

	* (2) As a standard user, I want to see all my connected devices so that I can automate my bots on a device.
	* (3) As a standard user, I want to log in on a specific device so that I could schedule bots to run on that specific device (Cogitavit).
	* (19) As a standard user, I should be able to add/remove a device from list of devices I can automate from so that I can remove automation for a specific device.

* Marketplace

	* (9) As a standard user, I want to be able search for a bot on marketplace by name or tags so that I can search for a specific automation task.
	* (10) As a standard user, I should be able to see a detailed page about the description of the bot (via the marketplace) and it's source code so that I can understand the behaviour of the bot when it performs a task.

### Release 2

The goal of release 2 is to allow users to install the bots and connect with devices. Users should be able to:

* See a dashboard with a summary of all connected devices and bots
* Upload bots on the marketplace
* Install bots from the marketplace
* See all installed bots and connect them to specific devices

User stories to be completed during the release 2:

* Home (Dashboard)

	* (17) As a standard user, I should be able to see a dashboard with a summary of all my devices connected and my bots installed so that I can adjust scheduling of the bots if required.

* My Bots

	* (16) As a standard user, I should be able to see all the bots installed on a specific device and on all devices so that I add or remove bots if needed.

* Device Status

	* (8) As a standard user, I should be able to select the devices I want to the bot to be installed so that I can run a specific bot on a specific device.

* Marketplace

	* (4) As a developer, I want to upload my bots (Executable file) on marketplace so that other user could install and run the bot on the devices.
	* (5) As a standard user, I want to download pre-made bots from marketplace so that I can automate my tasks.

### Release 3

The goal of release 3 is to allow users to schedule bots and devices, so they can execute certain tasks in different orderings. Users should be able to:

* Connect local custom bots with the calendar
* Schedule and execute bots on devices
* See status results of bots and devices
* Release an updated version of the bots on the marketplace
* Leave comments about bots on the marketplace

User stories to be completed during the release 3:

* My Bots

	* (7) As a standard user, I should be able to arrange the order of execution of the bots so that I can custom task in different orderings.
	* (14) As a standard user, I should be able execute my bots based on triggers/events I selected so that I can run my bots a specific environment.
	* (15) As a standard user, I should be able to see the status results of my bots on the web app after execution so that I can resolve any errors or warnings with the bots.
	* (18) As a standard user, I should be able to see all the pending jobs on my local device so that I schedule or abort the bots if needed.

* Marketplace

	* (11) As a standard user, I should be able to rate and comment on the bots so that I can share my experience using the bot.
	* (12) As a developer of the bot, I should be able to reply to the comments of user's review with a distinct visual so that I can respond to the feedback.
	* (13) As a developer, I should be able to release an updated version of my bot so that users can have their bugs fixed or have new features.

### Release 4

The goal of release 4 is to allow users to customize events and bots locally. Users should be able to:

* Import custom bots locally and schedule them
* Import .ics files into the calendar
* Import/export source code on the bot description

User stories to be completed during the release 4:

* Calendar

	* (20) As a standard user I should be able to import custom bots locally and have the web app display all locally created profiles/bots so that I can schedule or automate tasks using that bot.
	* (22) As a standard user, I want to be able to import .ics files into the calendar and manipulate events.

* Marketplace

	* (6) As a standard user, I should be able to import/export my source code on the bot description (marketplace) page so that other users can download and customize it according to their use.

## Potential Sprint Goals

Goal for Sprint 1: Setup internals of application; get base of components ready so we can build up on them in future sprints.

Goal for Sprint 2: Work on bot builder and allow bots to be uploaded, installed, and connected with devices.

Goal for Sprint 3: Work on scheduling bots, executing bots on devices, and displaying the status of bots and devices.

Goal for Sprint 4: Work on local customization of events and bots.