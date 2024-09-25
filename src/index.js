// frontend.js

import { ethers } from 'ethers';
import ChatDapp from './artifacts/contracts/ChatDapp.sol/ChatDapp.json';

// ตั้งค่า MetaMask provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Contract Address ที่คุณ deploy ไว้
const contractAddress = '0xYourDeployedContractAddress';
const contract = new ethers.Contract(contractAddress, ChatDapp.abi, signer);

async function sendMessage(content) {
    const tx = await contract.sendMessage(content);
    await tx.wait(); // รอให้ transaction เสร็จสิ้น
}

async function loadMessages() {
    const messages = await contract.getAllMessages();
    // Render ข้อความในหน้าเว็บ
}
