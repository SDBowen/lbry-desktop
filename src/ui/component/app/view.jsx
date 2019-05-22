// @flow
import React, { useEffect, useRef } from 'react';
import Router from 'component/router/index';
import ModalRouter from 'modal/modalRouter';
import ReactModal from 'react-modal';
import SideBar from 'component/sideBar';
import Header from 'component/header';
import { openContextMenu } from 'util/context-menu';
import useKonamiListener from 'util/enhanced-layout';
import Yrbl from 'component/yrbl';

type Props = {
  alertError: (string | {}) => void,
  pageTitle: ?string,
  theme: string,
  updateBlockHeight: () => void,
  toggleEnhancedLayout: () => void,
  enhancedLayout: boolean,
};

function App(props: Props) {
  const { theme, fetchRewards, fetchRewardedContent } = props;
  const appRef = useRef();
  const isEnhancedLayout = useKonamiListener();

  useEffect(() => {
    ReactModal.setAppElement(appRef.current);
    fetchRewards();
    fetchRewardedContent();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return (
    <div ref={appRef} onContextMenu={e => openContextMenu(e)}>
      <Header />

      <div className="main-wrapper">
        <Router />
      </div>

      <SideBar />
      <ModalRouter />
      {isEnhancedLayout && <Yrbl className="yrbl--enhanced" />}
    </div>
  );
}

export default App;
