This README provides an overview of the frontend part of our hackathon project. It outlines the technologies used, setup instructions, and basic usage guidelines. The frontend is built using React and interacts with the smart contracts deployed on the Celo blockchain.

## Technologies Used

**React**: A JavaScript library for building user interfaces. It enables us to create interactive and dynamic components, manage application state, and facilitate seamless updates.

**Web3.js**: A JavaScript library that allows interaction with the Celo blockchain. Web3.js provides functions to connect to the blockchain, interact with smart contracts, and retrieve data.

Setup Instructions
Follow these steps to set up the frontend for local development:

Clone the repository:
```git clone <repository-url>```

Navigate to the frontend directory:
```cd frontend```

Install the required dependencies:
```npm install```

```npm start```

This command will start the frontend application on [link][http://localhost:3000/], and any changes made to the source code will automatically trigger hot-reloading.

Usage
Once the frontend is set up and running, you can access the application in your web browser. The application provides a user interface to interact with the smart contracts deployed on the Celo blockchain.

Ensure that you have a Celo-compatible wallet (such as Valora) installed and connected to the Celo network. The frontend will prompt you to connect your wallet.

After connecting your wallet, you can navigate through the different features of the application, such as:

Viewing contract data: The frontend fetches data from the smart contracts and displays it in a user-friendly format.

Interacting with contracts: The frontend provides forms or buttons to trigger contract functions or transactions. You can interact with the contracts by submitting these forms or initiating transactions through the UI.

Please note that the frontend assumes the smart contracts are deployed and available on the specified Celo network. If you encounter any issues or errors, ensure that the contracts are deployed correctly and accessible.
