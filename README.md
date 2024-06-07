# Noodle's House

[![BuildAndDeploy SWA:ThankfulPebble](https://github.com/bparker-github/noodles-house/actions/workflows/azure-static-web-apps-thankful-pebble-0fd322f0f.yml/badge.svg?branch=main)](https://github.com/bparker-github/noodles-house/actions/workflows/azure-static-web-apps-thankful-pebble-0fd322f0f.yml)

The intention of this site is to collect data, add automation to daily activity, and generally extend into the digital space of "my house".
First pass is to get the foundation laid, get friends added into it, and then contributing ideas as I work through the myriad of inevitable bugs.

## Technology

### UI

The UI is built using **Vue3** via _Typescript_ with _TailwindCss_ and _HeadlessUI_ as the main visual backbone. The tailwind theme has been customized with "nh" colors for consistency.

### Database

**AzureSQL** is the data backend of the website. It's a standalone instance within the _Azure_ Portal.
Migrations are all done manually for now - yikes.

### API

**Azure Functions API** - _NodeJS/Typescript SDK_ is used to write simple wrappers or guards around data automations within the same repository.

### General

These are all bound into the same "**Azure Static Web Apps**" instance, with the UI accessing the API and Database directly. The front, back, and database-connection code is all deployed together - for now, the database migrations are separate and problematic.

---

## Tasks

### Visual

- Dark Mode
- Transitions-safe, or extra transitions

### Data

- Hook up to Application Insights
- Add automatic migrations somehow - typeorm?

---

## Notes

### 12/30/23

- User Settings are starting to get hooked up!
- Determine new/existing and use PUT/POST for update/create.
- Update permissioning.
- Determine if the editable info list should post entire models, or if it should continually execute 'PATCH' requests
- Create a better shared repo-concept for more data-api hookups later.

### 1/13/24

- Update the API to actually use migrations pls
- The API needs better CREATE guards
  - Create model-field-omitter to generate "create-dto" out of the model
  - Typically omit shared fields like 'createdAt/By' and 'id'
  - Allow extending to omit anything specific per model.
- Submit loading state isn't great
- Text area rightDrag bar isn't pretty
- Page-navigation transitions
- Double log-in on first start

### 3/2/24

- Login stable
- User Settings, Tasks stable
  - Utilizes both the Functions API and Data API
  - The Functions API is used for guarded-routes
  - The Data API is used for safe-fetching of generic objects. Still uses SWA auth.
- Next main step is TLC to the Tasks

  - This will help the next features be gathered from friends
  - Main features required:
    - Audit trail (event log below?)
    - View/Edit single issue.
    - New fields:
      - Some kinda status
      - Some kinda progress bar/status
      - Description + Label + Feedback/comments?
    - Delete issues
    - Admin panel to manage issues?

- Another major to-do is managing "roles" within Azure SWA for specific users.
  - I must elevate myself first!!! Perhaps do-able from AzurePortal.
  - Second attempt is an admin panel within SWA to control invites.
