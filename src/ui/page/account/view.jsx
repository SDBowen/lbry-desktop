import React from 'react';
import classnames from 'classnames';
import WalletBalance from 'component/walletBalance';
import RewardSummary from 'component/rewardSummary';
import TransactionListRecent from 'component/transactionListRecent';
import WalletAddress from 'component/walletAddress';
import Page from 'component/page';
import UnsupportedOnWeb from 'component/common/unsupported-on-web';
import WalletSend from 'component/walletSend';
import FirstRun from 'component/firstRun';

const WalletPage = () => (
  <Page>
    {IS_WEB && <UnsupportedOnWeb />}
    <div className={classnames({ 'card--disabled': IS_WEB })}>
      <FirstRun />
      <div className="columns">
        <WalletBalance />
        <RewardSummary />
      </div>
      <WalletAddress />
      <WalletSend />
      <TransactionListRecent />
    </div>
  </Page>
);

export default WalletPage;
