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
};

function FileProperties(props: Props) {
  const { uri, fileInfo, rewardedContentClaimIds, claimIsMine, isSubscribed, isNew } = props;

  const { claimId } = parseURI(uri);
  const isRewardContent = rewardedContentClaimIds.includes(claimId);

  return (
    <div className="media-properties">
      <div className="media-properties__badges">
        {isNew && <span className="badge badge--alert">{__('NEW')}</span>}
        <FilePrice hideFree uri={uri} />
      </div>
      <div className="media-properties__icons">
        {isSubscribed && <Icon icon={icons.SUBSCRIPTION} />}
        {claimIsMine && <Icon icon={icons.PUBLISHED} />}
        {!claimIsMine && fileInfo && <Icon icon={icons.DOWNLOAD} />}
        {isRewardContent && <Icon iconColor="red" icon={icons.FEATURED} />}
      </div>
    </div>
  );
}

export default FileProperties;
