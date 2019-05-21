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

      {/* <TransactionListRecent /> */}
    </div>
  </Page>
);

export default WalletPage;
/*
{
  "jsonrpc": "2.0",
  "result": {
    "lbry://2048#44064cadfc22dc13419843999ec80e30cf13262b": {
      "address": "bZayoBDVLmBbisyqLLp15eMKHzFBaeRLbg",
      "amount": "1.0",
      "claim_id": "44064cadfc22dc13419843999ec80e30cf13262b",
      "claim_op": "update",
      "confirmations": 13487,
      "height": 557371,
      "is_channel_signature_valid": true,
      "meta": {
        "activation_height": 506550,
        "claims_in_channel": 0,
        "effective_amount": "1.0",
        "is_controlling": true,
        "support_amount": "0.0",
        "trending_global": "0.0",
        "trending_group": "0.0",
        "trending_local": "0.0",
        "trending_mixed": "0.0"
      },
      "name": "2048",
      "normalized": "2048",
      "nout": 0,
      "permanent_url": "lbry://2048#44064cadfc22dc13419843999ec80e30cf13262b",
      "signing_channel": {
        "address": "bZayoBDVLmBbisyqLLp15eMKHzFBaeRLbg",
        "amount": "1.0",
        "claim_id": "e8fed337dc4ee260f4bcfa6d24ae1e4dd75c2fb3",
        "claim_op": "update",
        "confirmations": 11993,
        "height": 558865,
        "name": "@OpenSourceGames",
        "normalized": "@opensourcegames",
        "nout": 0,
        "permanent_url": "lbry://@OpenSourceGames#e8fed337dc4ee260f4bcfa6d24ae1e4dd75c2fb3",
        "timestamp": 1556473155,
        "txid": "ea9200a2fb92cc3150043f238be0800d449737da6c6090f25136d60988c75665",
        "type": "claim",
        "value": {
          "public_key": "3056301006072a8648ce3d020106052b8104000a034200046fe82ba9074da9b1f48adc81883c77267e559e43b7142477792e0392ae644eedb8efba1dc795ea595eae27ca14492d2fa6f6d7181e21f7a104dc95e8d3b09f96"
        },
        "value_type": "channel"
      },
      "timestamp": 1556232474,
      "txid": "ba4d41aecb6eaaff8136a5363f2f231613aad7aafce95558464630055d179198",
      "type": "claim",
      "value": {
        "description": "See https://github.com/gabrielecirulli/2048\n\nThe MIT License (MIT)\n\nCopyright (c) 2014 Gabriele Cirulli\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.",
        "languages": [
          "en"
        ],
        "license": "All rights reserved",
        "license_url": "https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt",
        "source": {
          "media_type": "application/x-lbry",
          "sd_hash": "48df1d0268525952d4d6727688348a7cab5cdb27a23144207fbbd21310dd28396533010399e1d279e0fe4323efd36408"
        },
        "thumbnail": {
          "url": "https://spee.ch/0/gpQmui2NJX4cm90BGRRT3U2Q.png"
        },
        "title": "2048"
      },
      "value_type": "stream"
    }
  }
}
*/
