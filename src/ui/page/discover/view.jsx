// @flow
import React, { useEffect, useState } from 'react';
import Page from 'component/page';
import Button from 'component/button';
import { FormField } from 'component/common/form';
import FileList from 'component/fileList';
import TagsSelect from 'component/tagsSelect';
import moment from 'moment';

type Props = {
  trending: Array<string>,
  doFetchTrending: (number, {}) => void,
};

function usePersistedState(key, firstTimeDefault) {
  const defaultValue = localStorage.getItem(key) || firstTimeDefault;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

function DiscoverPage(props) {
  const { doFetchTrending, trending, myTags } = props;
  const [personalSort, setPersonalSort] = usePersistedState('xyz', 'me');
  const [typeSort, setTypeSort] = usePersistedState('xxx', 'best');
  const [timeSort, setTimeSort] = usePersistedState('zzz', 'week');

  useEffect(() => {
    const options = {};
    if (personalSort === 'me') {
      options.any_tags = myTags.map(tag => tag.name);
    }
    if (typeSort === 'best') {
      options.order_by = ['trending_global', 'trending_mixed'];
    } else if (typeSort === 'new') {
      options.order_by = ['publish_time'];
    } else if (typeSort === 'top') {
      options.order_by = ['effective_amount'];
      if (timeSort !== 'all') {
        const time = Math.floor(
          moment()
            .subtract(1, timeSort)
            .unix()
        );
        options.publish_time = `>${time}`;
      }
    }

    doFetchTrending(10, options);
  }, [personalSort, typeSort, timeSort, doFetchTrending]);

  return (
    <Page>
      <div className="card">
        <FileList
          uris={trending}
          title={'Trending For'}
          injectedItem={personalSort === 'me' && <TagsSelect />}
          sort={
            <React.Fragment>
              <FormField
                type="select"
                name="trending_sort"
                value={typeSort}
                onChange={e => setTypeSort(e.target.value)}
              >
                <option value="best">Best</option>
                <option value="top">Top</option>
                <option value="new">New</option>
              </FormField>
              {typeSort === 'top' && (
                <FormField
                  type="select"
                  name="trending_time"
                  value={timeSort}
                  onChange={e => setTimeSort(e.target.value)}
                >
                  <option value="day">Today</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                  <option value="all">All Time</option>
                </FormField>
              )}
            </React.Fragment>
          }
          header={
            <React.Fragment>
              <h1 className={`card__title--flex`}>{__('Trending For')}</h1>
              <FormField
                type="select"
                name="trending_mefsdfaslkfa"
                value={personalSort}
                onChange={e => setPersonalSort(e.target.value)}
              >
                <option value="me">You</option>
                <option value="all">Everyone</option>
              </FormField>
            </React.Fragment>
          }
        />
      </div>
    </Page>
  );
}

export default DiscoverPage;
