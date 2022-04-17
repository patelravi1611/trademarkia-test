import React from 'react';
import {NextSeo} from 'next-seo';
import {withRouter} from 'next/router';

class AppHead extends React.Component {
  constructor(props) {
    super(props);
    let canonical = this.props.canonical ?? this.props.router.asPath;
    if (canonical.substr(0, 4) != 'http') {
      canonical = 'https://testapp.com/' + canonical;
    }
    if (this.props.canonical_override !== undefined && this.props.canonical_override != '') {
      canonical = this.props.canonical_override;
    }
    let noindex = true;
    if (process.env.NEXT_PUBLIC_INSTANCE_ENV == 'PRODUCTION') {
      if ((this.props.indexed ?? 0) == 1) {
        noindex = false;
      }
    }
    this.state = {
      title: this.props.page_title ?? process.env.NEXT_PUBLIC_APP_NAME,
      description: this.props.page_description ?? '',
      noindex: noindex,
      socialMediaImage: this.props.shareimage_json ? this.props.shareimage_json.src ?? '' : '',
      icon: '/images/logo.png',
      canonical: canonical,
    };
  }

  render() {
    return (
      <>
        <NextSeo
          title={this.state.title}
          description={this.state.description}
          noindex={this.state.noindex}
          canonical={this.state.canonical}
          openGraph={{
            url: this.state.canonical,
            title: this.state.title,
            description: this.state.description,
            images: [{url: this.state.socialMediaImage}],
            site_name: process.env.NEXT_PUBLIC_APP_NAME,
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: this.state.icon,
            },
          ]}
        />
      </>
    );
  }
}
export default withRouter(AppHead);
