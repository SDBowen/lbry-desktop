// @flow
import React from 'react';
import Page from 'component/page';
import CategoryList from 'component/categoryList';
import FirstRun from 'component/firstRun';
import Discovery from 'component/tagsSelect';
import FileCard from 'component/fileCard';
import Button from 'component/button';

type Props = {
  fetchFeaturedUris: () => void,
  fetchRewardedContent: () => void,
  fetchRewards: () => void,
  fetchingFeaturedUris: boolean,
  featuredUris: {},
};

class DiscoverPage extends React.PureComponent<Props> {
  constructor() {
    super();
    this.continousFetch = undefined;
  }

  componentDidMount() {
    const { fetchFeaturedUris, fetchRewardedContent, fetchRewards } = this.props;

    fetchFeaturedUris();
    fetchRewardedContent();

    this.continousFetch = setInterval(() => {
      fetchFeaturedUris();
      fetchRewardedContent();
      fetchRewards();
    }, 1000 * 60 * 60);
  }

  componentWillUnmount() {
    this.clearContinuousFetch();
  }

  getCategoryLinkPartByCategory(category: string) {
    const channelName = category.substr(category.indexOf('@'));

    if (!channelName.includes('#')) {
      return null;
    }

    return channelName;
  }

  trimClaimIdFromCategory(category: string) {
    return category.split('#')[0];
  }

  continousFetch: ?IntervalID;

  clearContinuousFetch() {
    if (this.continousFetch) {
      clearInterval(this.continousFetch);
      this.continousFetch = null;
    }
  }

  render() {
    const { featuredUris, fetchingFeaturedUris } = this.props;
    const hasContent = typeof featuredUris === 'object' && Object.keys(featuredUris).length;
    const failedToLoad = !fetchingFeaturedUris && !hasContent;

    return (
      <Page isLoading={!hasContent && fetchingFeaturedUris}>
        {/* <FirstRun /> */}
        <h1 className="media__title media__title--large">{__('Trending')}</h1>
        <ul className="card__list">
          {new Array(10).fill(1).map((x, i) => (
            <FileCard placeholder key={i} />
          ))}
        </ul>

        <div className="card card--section">
          <h2 className="card__title card__title--flex-between">
            {__('Make This Your Own')}
            <Button button="inverse" label={__('Close')} />
          </h2>
          <p className="card__subtitle">
            {__('You are already following a couple tags, try searching for a new one.')}
          </p>

          <div className="card__content">
            <Discovery />
          </div>
        </div>
        <h1 className="media__title media__title--large">{__('Movies')}</h1>

        <ul className="card__list">
          {new Array(10).fill(1).map((x, i) => (
            <FileCard placeholder key={i} />
          ))}
        </ul>

        {/* {hasContent &&
          Object.keys(featuredUris).map(category => (
            <CategoryList
              lazyLoad
              key={category}
              category={this.trimClaimIdFromCategory(category)}
              uris={featuredUris[category]}
              categoryLink={this.getCategoryLinkPartByCategory(category)}
            />
          ))}
        {failedToLoad && <div className="empty">{__('Failed to load landing content.')}</div>} */}
      </Page>
    );
  }
}

export default DiscoverPage;
