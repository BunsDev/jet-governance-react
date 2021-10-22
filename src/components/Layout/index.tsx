import React, { useState } from "react";
import "./../../App.less";
import { Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { WalletModalProvider } from "@solana/wallet-adapter-ant-design";

import { NavLink } from "../Icons/navLink";
import { LABELS } from "../../constants";
import { AppBar } from "../AppBar";

const { Header, Content } = Layout;

export const AppLayout = React.memo(({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <WalletModalProvider>
      <div className="App wormhole-bg">
        <Layout title={LABELS.APP_TITLE}>
          <Header className="App-Bar">
            <div>
              <NavLink active={location.pathname === '/'} 
              path="/" icon={location.pathname === '/' ? '✔' : '✈'}
              text={expanded ? "home" : ''} 
              />
              <NavLink active={location.pathname === '/faucet'}
                path='/faucet' icon={location.pathname === '/transactions' ? '➺' : '➸'}
                text={expanded ? "faucet" : ''} 
                />
              <NavLink active={location.pathname === '/vote'} 
                path='/vote' icon={location.pathname === '/settings' ? '✎' : '✀'}
                text={expanded ? "settings" : ''} 
              />
              </div>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </div>
    </WalletModalProvider>
  );
});
