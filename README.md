# Slice of Lyf

## Overview
Slice of Lyf web app offers a gamified experience that turns each stay into an adventure, enhancing both guest satisfaction and loyalty. Upon first time onboarding, guests answer a few fun trivia questions, enabling the app to customize quests based on their interests and personality. They can then embark on solo or group quests, such as finding specific people, exploring unique places, or trying new activities. Additionally, hidden quests unlock through AR scans on objects in guest rooms or common areas, revealing exclusive challenges in augmented reality. By creating memorable and personalized experiences, Lyf fosters deeper connections with its guests, encouraging them to return and share their unique experiences, thus building long-term loyalty and enhancing brand satisfaction


Slice of Lyf directly supports Lyf’s vision of experience-led social living and addresses their expansion goals. By gamifying the guest experience through personalized quests and AR-enabled hidden challenges, the app encourages meaningful exploration, connection, and interaction among guests, embodying Lyf’s core values of curiosity, togetherness, and freedom. This approach helps standardize Lyf’s guest experience in a unique way, offering a distinctive “Lyf Adventure” no matter the property location. As Lyf grows to 150 properties by 2030, this gamified, experience-focused app ensures a consistent yet personalized guest journey, enhancing satisfaction, encouraging repeat visits, and strengthening loyalty.

![Application architeture](./docs/design_system.png)

This repository contains two primary components:

1. Backend: A backend application that uses PostgreSQL as the database and leverages OpenAPI to analyze and generate personality predictions based on user personality Q&A. This backend application also has the capability to store and read objects model for detection.

2. Frontend: A TypeScript-based application built with Vue.js, MapLibre, and MindAR. This frontend application can detect objects and display 3D images accordingly.

We use Git for collaboration on both applications. For the frontend, we utilize Netlify to streamline development and trigger CI/CD deployments whenever code is merged into the `main` branch.

The complete application is also deployed on a VPS for production purposes.

## Getting started on your local machine

### Prerequisites

- Install node version 18
- Install postgres version 15
- Create the database, migrate table, and seed data [database setup instructions](./backend/db/readme.db.md).

### Setup
1. Set the environment
    - Backend

      .env
      ```txt
      PORT=<PORT NUMBER>
      DATABASE_URL=<STRING DATABASE URL>
      OPENAI_API_KEY=<API KEY FOR OPENAI>
      FRONTEND_BASE_URL=<FRONTEND URL>
      ```
    - Frontend

      .env
      ```txt
      VITE_PUBLIC_API_URL=<BACKEND URL>
      ```

2. Build and start the applications
  - Backend: cd ./backend && npm install && npm run dev
  - Frontend: cd ./frontend && npx pnpm install && npx pnpm dev

3. Seed the quest and object model for detection [see setup guideline](./frontend/docs/USAGE.md)

4. For the API docs, you can import the postman collection provided [postman collection](angelhack-grand_final.postman_collection.json)


## Deployment

This application is already deployed to the cloud,
you can find by scan this QR code.

### QR code staging
![QR code staging](./docs/qr_staging.png)

### QR code staging
![QR code production](./docs/qr_production.png)
