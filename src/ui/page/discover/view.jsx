// @flow
import React, { useEffect, useState } from 'react';
import Page from 'component/page';
import Button from 'component/button';
import { Form, FormField } from 'component/common/form';
import FileListItem from 'component/fileListItem';
import TagsSelect from 'component/tagsSelect';

type Props = {
  // fetchFeaturedUris: () => void,
  // fetchRewardedContent: () => void,
  // fetchRewards: () => void,
  // fetchingFeaturedUris: boolean,
  // featuredUris: {},
};

function DiscoverPage(props) {
  const { doFetchTrending, trending } = props;
  const [layout, setLayout] = useState('card');
  // TODO: put this somewhere outside of discoverPage component
  // it doesn't need to live here, it's unrelated
  // const { fetchRewardedContent, fetchRewards } = props;

  useEffect(() => {
    doFetchTrending(40);
  }, []);

  return (
    <Page>
      <div className={layout === 'list' && 'card'}>
        <h1 className={`card__title--flex  trending-title  ${layout === 'card' ? 'tags-select-card' : ''}`}>
          {__('Trending For You')}
          <Form>
            <FormField type="select" className={'tags-select'} name="trending_sort" defaultValue={'best'}>
              <option value="best">Best</option>
              <option value="top">Top</option>
              <option value="new">New</option>
            </FormField>
          </Form>
          <Button icon="Layout" iconOnly onClick={() => setLayout(layout === 'card' ? 'list' : 'card')} />
        </h1>
        <ul className={layout === 'card' ? 'card__list' : ''}>
          {!!trending.length && trending.map(uri => <FileListItem key={uri} uri={uri} layout={layout} />)}
        </ul>
      </div>
      {/* <TagsSelect /> */}
    </Page>
  );
}

export default DiscoverPage;
