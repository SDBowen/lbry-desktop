// @flow
import * as icons from 'constants/icons';
import * as React from 'react';
import { parseURI, normalizeURI, convertToShareLink } from 'lbry-redux';
import CardMedia from 'component/cardMedia';
import TruncatedText from 'component/common/truncated-text';
import Icon from 'component/common/icon';
import UriIndicator from 'component/uriIndicator';
import classnames from 'classnames';
import FilePrice from 'component/filePrice';
import { openCopyLinkMenu } from 'util/context-menu';
import DateTime from 'component/dateTime';
import { formatLbryUriForWeb } from 'util/uri';

type Props = {
  uri: string,
  downloaded: boolean,
  claimIsMine: boolean,
  isSubscribed: boolean,
  isNew: boolean,
  rewardedContentClaimIds: Array<string>,
};

function FileProperties(props: Props) {
  const { claim, uri, downloaded, claimIsMine, rewardedContentClaimIds, isSubscribed, isNew } = props;

  const { claimId } = parseURI(uri);
  const isRewardContent = rewardedContentClaimIds.includes(claimId);
  const tags = claim.value.tags;

  return (
    <React.Fragment>
      <div className="file-properties">
        {isSubscribed && <Icon icon={icons.SUBSCRIPTION} />}
        {!claimIsMine && downloaded && <Icon icon={icons.DOWNLOAD} />}
        {isRewardContent && <Icon iconColor="red" icon={icons.FEATURED} />}
        {isNew && <span className="badge badge--alert">{__('NEW')}</span>}
        <FilePrice hideFree uri={uri} />
      </div>
      {/* <div className="file-properties">
        {tags.map(tag => (
          <span key={tag} className="badge badge--tag">
            {tag}
          </span>
        ))}
      </div> */}
    </React.Fragment>
  );
}

export default FileProperties;
