const contractAddress = '0x55Fcf47886C508F2269bB14D48cBfddd819E3bBe'; // Contract address on BSC Testnet
        const contractABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "NewMessage",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_content",
                        "type": "string"
                    }
                ],
                "name": "sendMessage",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAllMessages",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "sender",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "content",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct ChatDapp.Message[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        // Connect to MetaMask
        async function connectWallet() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const account = accounts[0]; // User's account address
                    console.log("Connected account:", account);
                    return account;
                } catch (error) {
                    console.error("User rejected the request:", error);
                }
            } else {
                alert("Please install MetaMask!");
            }
        }

        // Show user's address (MetaMask address)
        async function connectAndShowAddress() {
            const account = await connectWallet();
            if (account) {
                document.getElementById("userAddress").innerText = `Connected as: ${account}`;
            }
        }

        // Send a message through MetaMask
        async function sendMessage(content) {
            if (!content) return; // Ensure content is not empty
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                const tx = await contract.sendMessage(content);
                await tx.wait(); // Wait for the transaction to be mined
                console.log("Message sent:", content);
                loadMessages(); // Reload messages after sending
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }

        // Load all messages and display them on the web page
        async function loadMessages() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            try {
                const messages = await contract.getAllMessages();
                const chatWindow = document.getElementById("chatWindow");
                chatWindow.innerHTML = ''; // Clear old messages

                messages.forEach(message => {
                    const sender = message.sender; // User's address that sent the message
                    const content = message.content; // Message content
                    const timestamp = new Date(message.timestamp * 1000).toLocaleString(); // Convert timestamp to date

                    // Display the message along with the sender's address
                    const messageElement = document.createElement('p');
                    messageElement.innerText = `[${timestamp}] ${sender}: ${content}`;
                    chatWindow.appendChild(messageElement);
                });
            } catch (error) {
                console.error("Failed to load messages:", error);
            }
        }

        // Execute loadMessages when the web page is loaded
        window.onload = function() {
            loadMessages();
            connectAndShowAddress(); // Optionally, connect and show the address on page load
        };