// @flow
import * as ICONS from 'constants/icons';
import React, { useEffect, Fragment } from 'react';
import { isURIValid, normalizeURI, parseURI } from 'lbry-redux';
import FileListItem from 'component/fileListItem';
import FileList from 'component/fileList';
import Page from 'component/page';
import SearchOptions from 'component/searchOptions';
import Button from 'component/button';

type Props = { doSearch: string => void, location: UrlLocation };

export default function SearchPage(props: Props) {
  const {
    doSearch,
    uris,
    location: { search },
  } = props;
  const urlParams = new URLSearchParams(search);
  const urlQuery = urlParams.get('q');
  const isValid = isURIValid(urlQuery);

  let uri;
  let isChannel;
  if (isValid) {
    uri = normalizeURI(urlQuery);
    ({ isChannel } = parseURI(uri));
  }

  useEffect(() => {
    if (urlQuery) {
      doSearch(urlQuery);
    }
  }, [doSearch, urlQuery]);

  return (
    <Page>
      <section className="search">
        {urlQuery && (
          <Fragment>
            {isValid && (
              <header className="search__header">
                <Button button="alt" navigate={uri} className="media__uri">
                  {uri}
                </Button>
                <FileListItem uri={uri} large />
              </header>
            )}

            <div className="card">
              <FileList
                uris={uris}
                header={<SearchOptions />}
                sort={
                  <Fragment>
                    <span>{__('Find what you were looking for?')}</span>
                    <Button
                      button="alt"
                      description={__('Yes')}
                      onClick={() => onFeedbackPositive(query)}
                      icon={ICONS.YES}
                    />
                    <Button
                      button="alt"
                      description={__('No')}
                      onClick={() => onFeedbackNegative(query)}
                      icon={ICONS.NO}
                    />
                  </Fragment>
                }
              />
            </div>
            <div className="card__content help">{__('These search results are provided by LBRY, Inc.')}</div>
          </Fragment>
        )}
      </section>
    </Page>
  );
}
