import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client, chain } from '../services/thirdwebclient';

export default function ConnectWallet() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ConnectButton
        accountAbstraction={{
          chain, 
          sponsorGas: true,
        }}
        client={client}
        connectModal={{ showThirdwebBranding: false, size: "compact" }}
        wallets={[
          inAppWallet({
            auth: { options: ["google", "x", "passkey", "phone", "email"] },
          }),
        ]}
      />
    </div>
  );
}