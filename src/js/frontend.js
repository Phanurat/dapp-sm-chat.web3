const contractAddress = '0xYourDeployedContractAddress'; // Contract address ที่ deploy บน BSC Testnet
const contractABI = [
    // ใส่ ABI ที่คอมไพล์จาก ChatDapp.sol หลัง deploy เรียบร้อยแล้ว
];

// เชื่อมต่อกับ MetaMask
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0]; // ที่อยู่ของบัญชีผู้ใช้
            console.log("Connected account:", account);
            return account;
        } catch (error) {
            console.error("User rejected the request:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// แสดงที่อยู่ผู้ใช้ (Address ของ MetaMask)
async function connectAndShowAddress() {
    const account = await connectWallet();
    if (account) {
        document.getElementById("userAddress").innerText = `Connected as: ${account}`;
    }
}

// ส่งข้อความผ่าน MetaMask
async function sendMessage(content) {
    if (!content) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.sendMessage(content);
        await tx.wait(); // รอให้ transaction เสร็จสิ้น
        console.log("Message sent:", content);
        loadMessages(); // โหลดข้อความทั้งหมดใหม่หลังส่ง
    } catch (error) {
        console.error("Failed to send message:", error);
    }
}

// โหลดข้อความทั้งหมดและแสดงในหน้าเว็บ
async function loadMessages() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
        const messages = await contract.getAllMessages();
        const chatWindow = document.getElementById("chatWindow");
        chatWindow.innerHTML = ''; // เคลียร์ข้อความเก่า

        messages.forEach(message => {
            const sender = message.sender; // Address ของผู้ใช้ที่ส่งข้อความ
            const content = message.content; // เนื้อหาข้อความ
            const timestamp = new Date(message.timestamp * 1000).toLocaleString(); // แปลง timestamp เป็นวันที่

            // แสดงผลข้อความพร้อมกับ Address ของผู้ใช้
            const messageElement = document.createElement('p');
            messageElement.innerText = `[${timestamp}] ${sender}: ${content}`;
            chatWindow.appendChild(messageElement);
        });
    } catch (error) {
        console.error("Failed to load messages:", error);
    }
}

// เมื่อโหลดหน้าเว็บเสร็จ ให้ดึงข้อความทั้งหมดมาแสดง
loadMessages();
