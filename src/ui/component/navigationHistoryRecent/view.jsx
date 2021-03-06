// @flow
import React from 'react';
import Button from 'component/button';
import NavigationHistoryItem from 'component/navigationHistoryItem';

type HistoryItem = {
  uri: string,
  lastViewed: number,
};

type Props = {
  history: Array<HistoryItem>,
};

export default function NavigationHistoryRecent(props: Props) {
  const { history = [] } = props;

  return history.length ? (
    <div className="card item-list">
      <section className="card__content">
        {history.map(({ lastViewed, uri }) => (
          <NavigationHistoryItem slim key={uri} uri={uri} lastViewed={lastViewed} />
        ))}
      </section>
      <div className="card__actions">
        <Button navigate="/$/history/all" button="link" label={__('See All Visited Links')} />
      </div>
    </div>
  ) : null;
}
