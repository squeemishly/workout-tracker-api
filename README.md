#### Workout Tracker API

## Welcome to Workout Tracker API. You can do stuff here.

Here's some things you can do:

# Lifts

See a list of lifts:
GET '/api/v1/lifts'

See a single lift:
GET '/api/v1/lifts/:id'
- Returns a 400 if you give an id for a lift that does not exist

Add a new lift:
POST '/api/v1/lifts'
- creates a new food with the parameters: { lift: { name: "lift name" } }
- If a lift is successfully created, the lift will be returned.
- If the lift is not successfully created, a 400 status code will be returned. The name field is required.

Edit a lift:
PUT 'api/v1/lifts/:id'
- Updates an existing lift with the parameters: { lift: { name: "edited name" } }
- If the lift is successfully updated, the lift will be returned.
- If the lift is not successfully updated, a 400 status code will be returned. The name field is required.

Delete a lift:
DELETE '/api/v1/lifts/:id'
- Deletes the lift with the id passed in.
- If the lift can't be found, a 404 will be returned.

# Bodyareas

See a list of bodyareas:
GET '/api/v1/bodyareas'

See a single bodyarea:
GET '/api/v1/bodyareas/:id'
- Returns a 400 if you give an id for a bodyarea that does not exist

Add a new bodyarea:
POST '/api/v1/bodyareas'
- creates a new food with the parameters: { bodyarea: { name: "bodyarea name" } }
- If a bodyarea is successfully created, the bodyarea will be returned.
- If the bodyarea is not successfully created, a 400 status code will be returned. The name field is required.

Edit a bodyarea:
PUT 'api/v1/bodyareas/:id'
- Updates an existing bodyarea with the parameters: { bodyarea: { name: "edited name" } }
- If the bodyarea is successfully updated, the bodyarea will be returned.
- If the bodyarea is not successfully updated, a 400 status code will be returned. The name field is required.

Delete a bodyarea:
DELETE '/api/v1/bodyareas/:id'
- Deletes the bodyarea with the id passed in.
- If the bodyarea can't be found, a 404 will be returned.
