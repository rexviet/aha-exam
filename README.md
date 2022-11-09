# Sumary

This project is the home assignment for applying to **Senior Backend Developer** at Avancevl (AVL).

Live Product: https://aha-web.chaunguyen.dev/

Swagger Document: https://aha-exam-api.chaunguyen.dev/docs/

## Tech Stack:

- For Front-end, I am using HTML, CSS, JS, JQuery.
- For Dashboard, I originally planned to use Retool, but there were many problems with sharing permissions to public viewer can see the embedded dashboard, so I have programmed it by my self.
- For Back-end, I am using NGINX as a preverse proxy for my NodeJS application, which is written in NestJS Framework, Clean Architecture.
- For Authentication, I am using Firebase Auth, with 03 providers: Email - Password, Facebook Auth, Google Auth.
- For Email sending, I am using MailJet.
- For Database, I am uing PostgresDB to store main data, and Redis to store Session data.
- For the background async jobs, I am using AWS SNS as topic and AWS SQS as queue.

## Techniques:

- Clean Architecture
- Dependency Inversion Principle
- Outbox Transactional Pattern
- Session based Authentication

# Detail Design

## 1. Database Design

![Db design](db_design.png 'DB Design')
All tables have `id` column as a Primary Key with Auto Increment value, this is extremely useful if in the future we need to change data on a table with many records.

Table `user` is used for storing User information. We just use Firebase for authentication only, all user's data are stored in our database.

Table `user_action` is used for storing user's actions, which API, which method they call.

Table `outboxes` is used to implement Outbox Transactional Pattern. I will explain detail later.

Table `migration` is used to run TypeORM migrations. Each action that makes change to database schema such as create table, alter table, create contraint,... have to be defined as SQL scripts, and will be run sequentially by TypeORM migration.

## **2. Flows**

### **2.1 Sign Up**

#### **_2.1.1 By Email - Password_**

![SignUp via email-password](email-signup-flow.png 'Email Sign Up Flow')

1. FrontEnd (Web browser) call API, send email, password, and confirm password
2. After validation steps, API call to Firebase via Firebase Admin SDK to create a new user with email and password.
3. API start a transaction to write 2 records to DB, one for new user record to `users` table, one for outbox record to `outboxes` table, reference to the created user.
4. 4.1. - API create a new session and store to Redis.

   4.2. - CronJob App check for new record in `outboxes` table.

5. 5.1 API return response to FrontEnd.

   5.2 If there's any new record, it CronJob App will call publish a new message to relate AWS SNS Topic (`cdc-user-created`)

6. Topic `cdc-user-created` will fanout the new message to all queues that subscribe to that topic. In this case is `email-cdc-user-created` queue.
7. EmailConsumer App picks message from SQS `email-cdc-user-created` queue.
8. With a new message from previous step, EmailConsumer App will generate a custom token via Firebase SDK, attach the token as the redirect URL param, and call to MailJet with the redirect URL to send verification email to user.
9. After verification and be redirected to web page, Frontend will pick the custom token in URL param, and call `signInWithCustomToken` with Firebase SDK to sign in, get the JWT access token.
10. FrontEnd use the JWT access token from previous step, call API exchange session to create a new session in server, and store the session id in Cookie. From now on, FrontEnd can use the session id in Cookie to call any API to Backend.

#### 2.1.2 **_By Social (Google/Facebook)_**

![SignUp via social](social-signup-flow.png 'Social Sign Up Flow')

1. FrontEnd use Firebase SDK to authenticate with Google/Facebook provider, receive the JWT access token.
2. FrontEnd use the JWT access token from previous step, call API exchange session.
3. API App verify the token with Firebase.
4. If the token is valid, create a new user record and store to `users` table.
5. API create a new session and store to Redis
6. API return the session id to Frontend.

### **2.2 Sign In**

![SignIn flow](signin-flow.png 'Sign In Flow')

1. FrontEnd use Firebase SDK to authenticate with Password/Google/Facebook provider, receive the JWT access token.
2. FrontEnd use the JWT access token from previous step, call API exchange session.
3. API App verify the token with Firebase.
4. API create a new session and store to Redis
5. API return the session id to Frontend.

### **2.3 Tracking User Actions**

![Tracking Action flow](tracking-actions-flow.png 'Tracking Action flow')

1. FrontEnd call to any API that protected by AuthenticatedGuard.
2. AuthenticatedGuard will validate the session id, if success:

   2.1 Send a message to queue `user-authenticated`

   2.2 Continue the request with request handler, then return response to FrontEnd.

3. UserActionConsumer App picks message from SQS `user-authenticated` queue.
4. With a new message from previous step, create a transaction, write 2 records to DB, one for new user action record to `user_actions` table, one for outbox record to `outboxes` table, reference to the created user action.
5. CronJob App check for new record in `outboxes` table.
6. If there's any new record, it CronJob App will call publish a new message to relate AWS SNS Topic (`cdc-user-action-created`)
7. Topic `cdc-user-action-created` will fanout the new message to all queues that subscribe to that topic. In this case is `user-cdc-user-action-created` queue.
8. UserConsumer App picks message from SQS `user-cdc-user-action-created` queue.
9. With a new message from previous step, UserConsumer App will update to `users` table. If the request in step 1 is calling to exchange session API, the UserConsumer App will increase the number of times logged in and last action's timestamp. Otherwise, only last action's timestamp field is updated.
