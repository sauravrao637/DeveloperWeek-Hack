## Inspiration
Looking at and using the staking platforms available, there was a strong desire to create something that might truly help raise the concerns. We continued to explore the available projects and came up with the concept to develop secure, transparent decentralized and dependable staking service and calculate rewards on-chain, leveraging the features and capabilities of the Celo blockchain.  So, We came up with Vault Boost's staking service where users can stake their wallets and participate by using the camoStaking contract. The contract oversees the staking process, keeps track of user behavior, and calculates payouts based on preset mechanisms.

## What it does
The Vault Boost addresses all these issues by following below principle-
- The user stakes complete wallet instead of an individual NFT. All the stake-able NFTs will automatically start generating rewards as soon as they enter the user wallet.
- The user does not transfer the assets to the contract and thus is free to transfer them and move around without having a need to go and un-stake it. This complies with the ownership concept of dApp.
- The Base Price for rewards is fixed thus the stakers can rest assured the staking mechanism and reward rate will not be changed.
- The Claim Reward is done on a per wallet basis and the transaction cost does not change with the amount of NFTs and is minimal.

## How we built it
Vault Boost uses **Celo** blockchain for the user accounts and user authentication. The user can stake their wallet using the account on Celo blockchain.

#### We have demonstrated the staking using CamoNFT (ERC721) collection.
1. We added few attributes in the NFT struct that can be used by Vault Boost, including
- `entryTimeStamp`:- when did the asset entered the owner's wallet
- `stakeClaimedTimeStamp` :- when did the user has been last rewarded, enhancing the user experience and maximizing earning potential

2. We added some utility functions in the contract which can be called by authorized staking service (VaultBoost in this case) to update these variables and get a list of tokens held by any user.
#### Staking Service
1. VaultBoost uses camoStaking contract developed by us and deployed on **Celo**, to assure users that no one can change the reward mechanism later and they will keep getting rewarded automatically.
2. A script makes a call to contract every one hour to distribute the incentives to all the users.
3. When the user uses Claim Reward, the accumulated tokens are then transferred to the user's wallet by the contract.
 
####  Rewarding Token
 VaultBoost uses CAMO Token (ERC720) developed by us to reward the user for staking, fostering active participation and engagement.
The token has a fixed MAX_SUPPLY and all the tokens are held by stakingService at the beginning.

## Challenges we ran into
Despite getting to the hackathon a touch late, our team spent much time doing in-depth research on current platforms. We were able to collect knowledge and pinpoint areas for innovation using this method. A truly creative approach, however, requires a lot of time and work to design.
Although our user interface might seem simple, it actually acts as a practical proof of concept, demonstrating the essential features of our system. However, contract development took up the majority of our work and offered its own set of difficulties. Integrating various components and ensuring smooth functionality required our meticulous attention, and we encountered several errors along the way.

Some of the challenges we faced regarding the blockchain aspect of projects were:-

- Understanding Celo and Solidity: As Celo is a relatively less explored blockchain platform, we had to familiarize ourselves with its features and architecture. Additionally, we needed a strong grasp of Solidity, the programming language used for developing smart contracts on Celo (One of the major plus points of Celo). We studied the Celo documentation and Solidity best practices to ensure we had a good understanding of both.
- Code Auditing: Security vulnerabilities in smart contracts can lead to significant financial losses or exploitation. To mitigate this risk, we conducted a thorough code audit. We carefully reviewed the code for potential security flaws, such as unchecked external calls.
Testing: Testing was a crucial part for uncovering bugs and vulnerabilities in smart contracts.We used testing frameworks like Truffle or Hardhat to automate the testing process and wrote js scripts for interaction with contracts.
- Gas Optimization: Celo, like other blockchain platforms, has limited resources in terms of gas (transaction fees) and computational power. We focused on optimizing the gas usage of the smart contracts to minimize costs and improve efficiency. We utilized techniques such as reducing unnecessary storage operations, avoiding dynamically sized data structures, and avoiding expensive operations like loops when possible.

## Accomplishments that we're proud of
The creation of a safe and effective staking solution, the addition of novel features, the development of the camoStaking contract, successful integration and script execution, the creation of the CAMO Token, and the capacity to meet project deadlines are all examples of Vault Boost's accomplishments.

## What we learned
Throughout the journey of developing Vaultboost, we encountered various challenges and learned valuable lessons related to Solidity, Celo, React, and more. Here's an overview of our experience:

Solidity: During the hackathon, we dove deep into Solidity and learned its syntax, features, and best practices. We explored concepts such as contract structure, data types, function modifiers, and inheritance to ensure robust and efficient smart contract development.

Celo Blockchain: As a team, we familiarized ourselves with the Celo ecosystem, including its architecture, consensus mechanism, and smart contract deployment process. We leveraged Celo's developer documentation, libraries, and tools to facilitate the deployment and interaction with our smart contracts.

React: In addition to smart contract development, we built a frontend interface using React. We employed its components and state management capabilities to create an intuitive and responsive user experience. Integrating React with the Celo blockchain allowed us to interact with our smart contracts seamlessly.

Web3.js: To interact with the Celo blockchain and smart contracts from our React frontend, we utilized the Web3.js library. Web3.js provided us with the necessary functionality to connect to the Celo network, interact with smart contracts, and retrieve data from the blockchain. We learned how to handle transactions, call contract functions, and listen for events using Web3.js.

Security Considerations: Throughout the development process, we emphasized the security of our smart contracts. We were diligent in implementing best practices and adhering to the principles of secure coding. This included avoiding common vulnerabilities like reentrancy, implementing proper access control mechanisms, validating inputs, and conducting thorough testing and code reviews to identify potential security risks.

Deployment and Testing: Deploying smart contracts on the Celo blockchain required understanding the deployment process and utilizing appropriate deployment tools such as Truffle or Hardhat. We configured deployment scripts, managed contract migrations, and ensured that the contracts were correctly deployed and functional. Furthermore, we implemented a comprehensive testing strategy, including unit testing and integration testing, to validate the functionality and behavior of our smart contracts.

By collectively working on Solidity, Celo, React, and incorporating security measures, we were able to develop and deploy secure smart contracts on the Celo blockchain. Our experience not only expanded our technical expertise but also provided valuable insights into the interplay between different technologies and their role in building decentralized applications.

Apart from the technical aspects few of the key lessons we learned as a team-
Effective Communication and Collaboration, Leveraging Individual Skills and Expertise, Agile Project Management, Problem-Solving and Resourcefulness, Security and Quality Assurance, and Time Management and Prioritization

## What's next for VaultBoost
Looking ahead, the next phase for VaultBoost involves further refining our reward calculation system. While our current on-chain approach has its advantages and disadvantages, we recognize the need to offer a more versatile and customizable solution to cater to different staking requirements.

While the contracts have been thoroughly audited by us, it's always beneficial to have a fresh pair of eyes review the smart contracts. To further enhance security, we ought to seek external security audits from professionals with expertise in blockchain security. These audits can help identify any overlooked vulnerabilities and provide recommendations for improvements. 

Our immediate focus is on attracting individuals and projects whose needs align with the solution we currently offer. However, we have ambitious plans to expand the scope of our solution in the future and use more of Celo's functionalities into our system. Our goal is to develop a comprehensive framework that can seamlessly integrate with a wide range of projects and address diverse staking needs. We aspire to become a go-to staking solution provider for projects across various industries, enabling them to integrate our technology seamlessly and unlock the benefits of staking for their respective ecosystems.
