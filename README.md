# Notes to Self

### Inputs

- User Settings work is setting up the inputs to be more functional
- Updating the Editable Form List to be more flexible for other submissions too
  - Perhaps this should be more abstract - the inner form component should do the un-wrapping of values and such.

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
