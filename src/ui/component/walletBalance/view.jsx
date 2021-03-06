// @flow
import React from 'react';
import CreditAmount from 'component/common/credit-amount';
import BalanceBackground from './balance-background.png';

type Props = {
  balance: number,
};

const WalletBalance = (props: Props) => {
  const { balance } = props;
  return (
    <section
      className="card card--section card--wallet-balance"
      style={{ backgroundImage: `url(${BalanceBackground})` }}
    >
      <header className="card__header">
        <h2 className="card__title">{__('Balance')}</h2>
      </header>
      <div className="card__content">
        <h3>{__('You currently have')}</h3>
        {(balance || balance === 0) && <CreditAmount large badge={false} amount={balance} precision={8} />}
      </div>
    </section>
  );
};

export default WalletBalance;
