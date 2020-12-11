/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import CommunityOnboardingForm from './CommunityOnboardingForm';
import EditCommunityForm from './EditCommunityForm';

class OnboardCommunity extends React.Component {

  render() {
    const title = brand.name + ' - Onboard New Community';
    const description = brand.desc;
    const isEditForm = this.props.location.pathname.includes('edit');

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Onboard New Community" desc="">
          {isEditForm
            && <EditCommunityForm {...this.props} />
          }
          {!isEditForm
            && <CommunityOnboardingForm />
          }
        </PapperBlock>
      </div>
    );
  }
}

OnboardCommunity.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default OnboardCommunity;
