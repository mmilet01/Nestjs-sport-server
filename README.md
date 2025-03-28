# Sports Management Server

## Description
Sports Management Server is a backend server designed to manage a sports complex’s programs. It provides a secure, RESTful API for managing sports classes, handling user registration and authentication, and enabling role-based access for both general users and admin staff. The server includes endpoints for filtering classes, retrieving detailed class information, and allowing users to apply for classes—all documented via Swagger.

## Key Features
- **User Registration & Authentication**: Secure registration and login using email and password.
- **Role-Based Authorization**: Different roles (e.g., admin, user) control access to sports and user management features.
- **Sports Classes Management**:
  - **Filtering & Retrieval**: Endpoints like `/classes?sports=Basketball,Football` allow users to filter and list sports classes.
  - **Detailed Information**: Retrieve complete class details (week schedule, duration, description) through endpoints like `/classes/{id}`.
  - **Application Process**: Users can apply for sports classes. They can see the schedule and spots available within the selected class. Other details like location can be added easily.
- **Admin Dashboard**: Admin users can perform full CRUD operations on sports classes.
- **API Documentation**: Interactive API docs generated with Swagger for easy exploration and testing.

## Technologies Used
- **Backend**: Node.js with NestJS framework and TypeScript.
- **Database**: PostgreSQL managed via TypeORM.
- **Authentication**: Passport with JWT strategy.
- **Tests**: Minor testing via Jest.
- **API Documentation**: Swagger (via the NestJS Swagger module).
