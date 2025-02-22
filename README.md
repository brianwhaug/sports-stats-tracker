# My Vue App

This is a Vue.js application built with Vite and Pinia for state management. 

Create a set of stats to track during a sports game; track those stats during a game on mobile/tablet.

## Project Structure

```
sports-stats-tracker
├── src
│   ├── assets          # Static assets like images and stylesheets
│   ├── components      # Vue components
│   │   └── HelloWorld.vue  # A sample component that displays a greeting
│   ├── router          # Vue Router setup
│   │   └── index.ts    # Router instance with routes
│   ├── store           # Pinia store setup
│   │   └── game-stats-data-store.ts  # Store instance with state, getters, and actions
│   ├── views           # Vue views
│   │   └── EndGame.vue # View for the end game summary
│   ├── App.vue         # Root component of the application
│   ├── main.ts         # Entry point of the application
│   ├── style.css       # Global styles
├── public
│   └── index.html      # Main HTML file
├── package.json        # NPM configuration file
├── tsconfig.json       # TypeScript configuration file
├── vite.config.ts      # Vite configuration file
├── postcss.config.js   # PostCSS configuration file
├── tailwind.config.js  # Tailwind CSS configuration file
└── README.md           # Project documentation
```

## Getting Started

To get started with the application, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-vue-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see your application in action.

## Usage

- Modify the `src/components/HelloWorld.vue` file to change the greeting message.
- Use the `src/store/index.ts` file to manage your application's state with Pinia.
- Customize the `src/App.vue` file to change the layout and structure of your application.

## License

This project is licensed under the MIT License.