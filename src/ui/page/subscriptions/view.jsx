// @flow
import * as SETTINGS from 'constants/settings';
import React, { PureComponent } from 'react';
import Page from 'component/page';
// import FirstRun from './internal/first-run';
// import UserSubscriptions from './internal/user-subscriptions';
import FileList from 'component/fileList';

type Props = {
  subscribedChannels: Array<string>, // The channels a user is subscribed to
  unreadSubscriptions: Array<{
    channel: string,
    uris: Array<string>,
  }>,
  allSubscriptions: Array<{ uri: string, ...StreamClaim }>,
  loading: boolean,
  autoDownload: boolean,
  viewMode: ViewMode,
  doSetViewMode: ViewMode => void,
  doFetchMySubscriptions: () => void,
  doSetClientSetting: (string, boolean) => void,
  doFetchRecommendedSubscriptions: () => void,
  loadingSuggested: boolean,
  firstRunCompleted: boolean,
  doCompleteFirstRun: () => void,
  doShowSuggestedSubs: () => void,
  showSuggestedSubs: boolean,
};

export default class SubscriptionsPage extends PureComponent<Props> {
  constructor() {
    super();

    (this: any).onAutoDownloadChange = this.onAutoDownloadChange.bind(this);
  }

  componentDidMount() {
    const {
      doFetchMySubscriptions,
      doFetchRecommendedSubscriptions,
      allSubscriptions,
      firstRunCompleted,
      doShowSuggestedSubs,
    } = this.props;

    doFetchMySubscriptions();
    doFetchRecommendedSubscriptions();

    // For channels that already have subscriptions, show the suggested subs right away
    // This can probably be removed at a future date, it is just to make it so the "view your x subscriptions" button shows up right away
    // Existing users will still go through the "first run"
    if (!firstRunCompleted && allSubscriptions.length) {
      doShowSuggestedSubs();
    }
  }

  onAutoDownloadChange(event: SyntheticInputEvent<*>) {
    this.props.doSetClientSetting(SETTINGS.AUTO_DOWNLOAD, event.target.checked);
  }

  render() {
    const {
      subscribedChannels,
      allSubscriptions,
      loading,
      autoDownload,
      viewMode,
      doSetViewMode,
      loadingSuggested,
      firstRunCompleted,
      doCompleteFirstRun,
      doShowSuggestedSubs,
      showSuggestedSubs,
      unreadSubscriptions,
    } = this.props;
    const numberOfSubscriptions = subscribedChannels && subscribedChannels.length;

    // const index = viewMode === VIEW_ALL ? 0 : 1;
    // const onTabChange = index => (index === 0 ? doSetViewMode(VIEW_ALL) : doSetViewMode(VIEW_LATEST_FIRST));
    return (
      <Page>
        <div className="card">
          <FileList header={<h1>Add Sort Here</h1>} uris={allSubscriptions.map(sub => sub.permanent_url)} />
        </div>
      </Page>
    );
  }
}

/* <Fragment>
          {hasSubscriptions && (
            <Tabs onChange={onTabChange} index={index}>
              <TabList className="main__item--extend-outside">
                <Tab>{__('All Subscriptions')}</Tab>
                <Tab>{__('Latest Only')}</Tab>

                <Tooltip onComponent body={__('Automatically download new subscriptions.')}>
                  <FormField
                    type="setting"
                    name="auto_download"
                    onChange={onChangeAutoDownload}
                    checked={autoDownload}
                    label={__('Auto download')}
                    labelOnLeft
                  />
                </Tooltip>
              </TabList>

              <TabPanels
                header={
                  <HiddenNsfwClaims
                    uris={subscriptions.reduce((arr, { name, claim_id: claimId }) => {
                      if (name && claimId) {
                        arr.push(`lbry://${name}#${claimId}`);
                      }
                      return arr;
                    }, [])}
                  />
                }
              >
                <TabPanel>
                  <div className="card__title card__title--flex">
                    <span>{__('Your subscriptions')}</span>
                    {unreadSubscriptions.length > 0 && <MarkAsRead />}
                  </div>
                </TabPanel>

                <TabPanel>
                  {unreadSubscriptions.length ? (
                    unreadSubscriptions.map(({ channel, uris }) => {
                      const { claimName } = parseURI(channel);
                      return (
                        <section key={channel}>
                          <h2 className="card__title card__title--flex">
                            <Button button="link" navigate={channel} label={claimName} />
                            <MarkAsRead channel={channel} />
                          </h2>

                          <section className="media-group--list">
                            <ul className="card__list">
                              {uris.map(uri => (
                                <FileCard key={uri} uri={uri} />
                              ))}
                            </ul>
                          </section>
                        </section>
                      );
                    })
                  ) : (
                    <Fragment>
                      <Yrbl title={__('All caught up!')} subtitle={__('You might like the channels below.')} />
                      <SuggestedSubscriptions />
                    </Fragment>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )} */

/* {!hasSubscriptions && (
            <Fragment>
              <Yrbl
                type="sad"
                title={__('Oh no! What happened to your subscriptions?')}
                subtitle={__('These channels look pretty cool.')}
              />
              <SuggestedSubscriptions />
            </Fragment>
          )} 
{/* /* // Only pass in the loading prop if there are no subscriptions
      // If there are any, let the page update in the background
      // The loading prop removes children and shows a loading spinner
      // <Page notContained loading={loading && !subscribedChannels} className="main--no-padding-top">
      //   {firstRunCompleted ? (
      //     <UserSubscriptions
      //       viewMode={viewMode}
      //       doSetViewMode={doSetViewMode}
      //       hasSubscriptions={numberOfSubscriptions > 0}
      //       subscriptions={allSubscriptions}
      //       autoDownload={autoDownload}
      //       onChangeAutoDownload={this.onAutoDownloadChange}
      //       unreadSubscriptions={unreadSubscriptions}
      //       loadingSuggested={loadingSuggested}
      //     />
      //   ) : (
      //     <FirstRun
      //       showSuggested={showSuggestedSubs}
      //       doShowSuggestedSubs={doShowSuggestedSubs}
      //       loadingSuggested={loadingSuggested}
      //       numberOfSubscriptions={numberOfSubscriptions}
      //       onFinish={doCompleteFirstRun}
      //     />
      //   )}  */
