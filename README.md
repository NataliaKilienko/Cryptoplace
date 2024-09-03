# Cryptoplace

Cryptoplace is a web application that provides real-time cryptocurrency market data, analytics, and news. Built with React and Vite, the platform offers a responsive and interactive user experience, making it a powerful tool for both casual users and professional traders.

## Features

### 1. **Real-Time Cryptocurrency Monitoring**
   - **Top Gainers and Losers**: View the top gaining and losing cryptocurrencies based on 24-hour price changes. The data is visualized using bar charts, making it easy to compare different assets.
   - **Search Functionality**: Search for specific cryptocurrencies and view detailed information, including historical data, market cap, and more.
   - **Favorites**: Users can add cryptocurrencies to their favorites for quick access.

### 2. **Market Analytics**
   - **Real-Time Analytics**: The platform offers real-time market data and analytics to help users track their crypto investments and market trends.
 
### 3. **Responsive Design**
   - **Mobile-First Approach**: The application is designed with a mobile-first approach, ensuring optimal performance and usability on both mobile devices and desktops.
   - **Responsive Sidebar**: The sidebar menu adapts to different screen sizes and includes a burger menu for easy navigation on smaller screens.

### 4. **Interactive User Interface**
   - **Animations**: Smooth animations and transitions are implemented using GSAP (GreenSock Animation Platform) for a dynamic and engaging user experience.
   - **Hover Effects**: Interactive hover effects on buttons and other elements enhance user engagement.

### 5. **Real-Time News**
   - **Crypto News**: Stay updated with the latest cryptocurrency news, filtered by your favorite assets. The news is fetched from the CryptoPanic API and displayed in real-time.
   - **Filter Options**: Users can filter news based on categories such as "bullish," "bearish," or specific assets.


## Technologies Used

### 1. **Frontend**
   - **React.js**: A JavaScript library for building user interfaces, providing a component-based architecture and efficient rendering using the virtual DOM.
   - **Vite**: A build tool that provides a faster and leaner development experience for modern web projects. It's used instead of Create React App for better performance.
   - **React Router**: Handles the routing in the application, enabling navigation between different pages and views.
   - **GSAP (GreenSock Animation Platform)**: A powerful animation library used to create smooth, high-performance animations and transitions across the application.
   - **Chart.js**: A JavaScript library used to create responsive, interactive charts for data visualization.

### 2. **APIs**
   - **CoinGecko API**: Provides cryptocurrency market data, including current prices, market caps, historical data, and more.
   - **CryptoPanic API**: Supplies real-time news related to cryptocurrencies, which is integrated into the platform's news section.

### 3. **State Management**
   - **React Context API**: Manages global state across the application, allowing for efficient data sharing between components.

### 4. **Styling**
   - **SCSS**: A CSS preprocessor that adds power and elegance to the basic language, allowing for variables, nested rules, and mixins.
   - **Responsive Design**: The UI is designed to be fully responsive, adapting to various screen sizes from mobile devices to desktops.

### 5. **Utilities**
   - **Environment Variables**: `.env` files are used to securely store API keys and other sensitive information.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/NataliaKilienko/cryptoplace.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cryptoplace
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_COINGECKO_API_KEY=your_coingecko_api_key
    VITE_CRYPTOPANIC_API_KEY=your_cryptopanic_api_key
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
Once the development server is running, you can access the application in your web browser. You can search for cryptocurrencies, view the top gainers and losers, and read the latest news related to the crypto market.

## File Structure
- **src/**: Contains the source code for the project.
  - **api/**: API calls to fetch cryptocurrency data and news.
  - **assets/**: Images and icons used in the application.
  - **components/**: Reusable components such as the Sidebar, Footer, and various sections.
  - **context/**: Context files for managing global state across the application.
  - **pages/**: Pages corresponding to different routes like Home, News, and SearchPage.
  - **utils/**: Utility functions used across the application.

## Contributing
If you want to contribute to this project, feel free to fork the repository and submit a pull request. Any contributions, whether bug fixes, new features, or improvements, are welcome.
