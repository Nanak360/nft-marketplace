import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton";
function NavBar() {
    return (
        <nav className="fixed flex justify-between w-screen bg-gradient-to-l from-cyan-900 to-indigo-800 shadow-lg px-10 py-6">
            <div className="flex w-1/6 items-center">
                <Link href="/">
                    <a className="text-white text-2xl transition ease-in-out hover:text-blue-200 font-bold">
                        NFT Bazar
                    </a>
                </Link>
            </div>
            <div className="flex w-1/3 justify-between items-center">
                <Link href="/my-dashboard">
                    <a className="text-blue-300 transition ease-in-out hover:text-white font-semibold text-lg">
                        My Dashboard
                    </a>
                </Link>
                <Link href="/my-nfts">
                    <a className="text-blue-300 transition ease-in-out hover:text-white font-semibold text-lg">
                        My NFTs
                    </a>
                </Link>
                <Link href="/sell-nfts">
                    <a className="text-blue-300 transition ease-in-out hover:text-white font-semibold text-lg">
                        Sell NFTs
                    </a>
                </Link>
                <WalletConnectButton></WalletConnectButton>
            </div>
        </nav>
    );
}

export default NavBar;