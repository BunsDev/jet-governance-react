import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row, Table } from "antd";
import { Typography } from 'antd';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './homeSlice';

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  const { Title } = Typography;

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  const dataSource = [
    {
      key: '1',
      proposal: 'Mike',
      status: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      proposal: 'John',
      status: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Proposal',
      dataIndex: 'proposal',
      key: 'proposal',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Row gutter={[16, 16]} align="stretch">
      <Col span={8}>
        <WalletMultiButton type="ghost" />
      </Col>
      <Col span={8}>
        <Link to="/faucet">
          <Button>Faucet</Button>
        </Link>
      </Col>
      
      <Col span={24}>
        <Title>h1. Ant Design</Title>
        <Title level={2} type="secondary">h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <Title level={5}>h5. Ant Design</Title>
      </Col>

      <Col span={24}>
        <Table dataSource={dataSource} columns={columns} />;
      </Col>

      <Col span={24}>
      <h2>Your Deposited Tokens ({formatUSD.format(totalBalanceInUSD)}):</h2>
        <h2>
          JET: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} (
          {formatUSD.format(SRM?.balanceInUSD)})
        </h2>
      </Col>


    </Row>
  );
};
