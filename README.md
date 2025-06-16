# Doctor's Appointment Booking
Book your appointment with the doctor through this application. 

## Technical Stack

This is a hybrid app that uses **NextJS** as the frontend and **Flask** as the API backend.

- The NextJS frontend is running on `http://localhost:3000` and can be found in the `/app` folder.
- The Flask APIs are hosted under the `/api` folder, under the Python file `/api/index.py`
- On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.
- The database used here is a simple SQL database hosted statically in the `/api` folder.
- We connect to the database using the SQLAlchemy library, which will automatically create a new database upon running of the Flask application if not already created.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) (The port can be changed in `package.json` and `next.config.js`).

## Demo
![demo-vid.gif](public/demo-vid.gif)

You can also view the demo video in the `/public` folder