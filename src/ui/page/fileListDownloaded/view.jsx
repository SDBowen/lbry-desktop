// @flow
import React from 'react';
import Button from 'component/button';
import FileList from 'component/fileList';
import Page from 'component/page';
import { PAGES } from 'lbry-redux';

type Props = {
  fetching: boolean,
  fileInfos: {},
  sortBy: string,
};

class FileListDownloaded extends React.PureComponent<Props> {
  render() {
    const { fetching, fileInfos, sortBy } = this.props;
    const hasDownloads = fileInfos && Object.values(fileInfos).length > 0;

    return (
      // Removed the <Page> wapper to try combining this page with UserHistory
      // This should eventually move into /components if we want to keep it this way
      <React.Fragment>
        {hasDownloads ? (
          <div className="card">
            <FileList
              uris={fileInfos.map(info => `lbry://${info.claim_name}#${info.claim_id}`)}
              header={<h1>Add Sort Here</h1>}
            />
          </div>
        ) : (
          <div className="main--empty">
            <section className="card card--section">
              <header className="card__header">
                <h2 className="card__title">{__("You haven't downloaded anything from LBRY yet.")}</h2>
              </header>

              <div className="card__content">
                <div className="card__actions card__actions--center">
                  <Button button="primary" navigate="/" label={__('Explore new content')} />
                </div>
              </div>
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default FileListDownloaded;
