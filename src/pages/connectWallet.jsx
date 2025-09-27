import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client, chain } from '../services/thirdwebclient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ConnectWallet() {
  const account = useActiveAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/creator');
    }
  }, [account, navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ConnectButton
        client={client}
        accountAbstraction={{
          chain,
          sponsorGas: true,
        }}
        connectModal={{ showThirdwebBranding: false, size: "compact" }}
        wallets={[
          inAppWallet({
            auth: { options: ["google", "x", "passkey", "phone", "email"], autoLogin: false },
          }),
        ]}
      />
    </div>
  );
}
