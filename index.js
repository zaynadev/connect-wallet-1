isConnected();

async function isConnected() {
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts[0])
    document.getElementById("connectWallet").innerHTML = `${accounts[0].slice(
      0,
      6
    )}...${accounts[0].slice(-4)}`;
  return accounts;
}

async function connect() {
  let accounts;
  if (window.ethereum !== undefined) {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("You need to install metamask");
  }
  isConnected();
}

async function getBalance() {
  const accounts = await isConnected();

  let balance = undefined;
  if (accounts[0]) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    balance = ethers.utils.formatEther(await provider.getBalance(accounts[0]));
    document.getElementById(
      "myBalance"
    ).innerHTML = `You balance is ${balance} eth`;
  } else {
    alert("You need to connect your wallet");
  }

  return balance;
}
