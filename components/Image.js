/* eslint-disable @next/next/no-img-element */
import React from 'react';
import NextImage from 'next/image';

/*
props
{
  "alt":"",
  "src":"",
  "title":"",
  "width":300,
  "height":400
}
*/
class JetbroImage extends React.Component {
  static defaultProps = {
    mobileOnly: false,
    classNames: '',
    src: '',
    desktopDeviceSizes: [1080, 1440, 1920],
    mobileDeviceSizes: [360, 375, 420, 767],
    priority: false,
    usePictureTag: true,
  };

  render() {
    if (this.props.src === undefined || this.props.src == '') {
      return '';
    }
    if (this.props.usePictureTag) {
      if (this.props.src.substr(this.props.src.length - 3, 3) == 'svg') {
        return (
          <picture>
            <img
              alt={this.props.alt ?? ''}
              title={this.props.title ?? ''}
              width={this.props.width}
              height={this.props.height}
              src={this.props.src}
              loading={this.props.priority ? 'eager' : 'lazy'}
            />
          </picture>
        );
      }
      return (
        <picture>
          {this.props.mobileDeviceSizes.length > 0
            ? this.props.mobileDeviceSizes.map(
                function (size) {
                  let width =
                    this.props.mobile_width !== undefined
                      ? this.props.mobile_width
                      : this.props.width;
                  let src = '';
                  let src2x = '';

                  if (width > size) {
                    src = this.resizedUrl(
                      this.props.mobile_src !== undefined && this.props.mobile_src != ''
                        ? this.props.mobile_src
                        : this.props.src,
                      size,
                    );
                    src2x = this.resizedUrl(
                      this.props.mobile_src !== undefined && this.props.mobile_src != ''
                        ? this.props.mobile_src
                        : this.props.src,
                      size * 2,
                    );
                  } else {
                    src = this.resizedUrl(
                      this.props.mobile_src !== undefined && this.props.mobile_src != ''
                        ? this.props.mobile_src
                        : this.props.src,
                      width,
                    );
                    src2x = this.resizedUrl(
                      this.props.mobile_src !== undefined && this.props.mobile_src != ''
                        ? this.props.mobile_src
                        : this.props.src,
                      width * 2,
                    );
                  }
                  return (
                    <source
                      key={size}
                      srcSet={`${src}, ${src2x} 2x`}
                      width={
                        this.props.mobile_width !== undefined
                          ? this.props.mobile_width
                          : this.props.width
                      }
                      height={
                        this.props.mobile_height != undefined
                          ? this.props.mobile_height
                          : this.props.height
                      }
                      media={'(max-width: ' + size + 'px)'}
                    />
                  );
                }.bind(this),
              )
            : ''}
          {this.props.desktopDeviceSizes.length > 0
            ? this.props.desktopDeviceSizes.map(
                function (size) {
                  let width = this.props.width;
                  let src = '';
                  let src2x = '';
                  if (width > size) {
                    src = this.resizedUrl(this.props.src, size);
                    src2x = this.resizedUrl(this.props.src, size * 2);
                  } else {
                    src = this.resizedUrl(this.props.src, width);
                    src2x = this.resizedUrl(this.props.src, width * 2);
                  }
                  return (
                    <source
                      key={size}
                      srcSet={`${src}, ${src2x} 2x`}
                      width={this.props.width}
                      height={this.props.height}
                      media={'(max-width: ' + size + 'px)'}
                    />
                  );
                }.bind(this),
              )
            : ''}
          <img
            alt={this.props.alt ?? ''}
            title={this.props.title ?? ''}
            width={this.props.width}
            height={this.props.height}
            src={this.resizedUrl(this.props.src, this.props.width)}
            loading={this.props.priority ? 'eager' : 'lazy'}
          />
        </picture>
      );
    }
    if (this.props.src.substr(0, 1) == '/') {
      return (
        <NextImage
          alt={this.props.alt ?? ''}
          title={this.props.title ?? ''}
          width={this.props.width}
          height={this.props.height}
          src={this.props.src}
          priority={this.props.priority}
          className={this.props.classNames}
        />
      );
    }

    return (
      <NextImage
        loader={this.loader.bind(this)}
        alt={this.props.alt ?? ''}
        title={this.props.title ?? ''}
        width={this.props.width}
        height={this.props.height}
        layout="responsive"
        priority={this.props.priority}
        src={this.props.src}
        className={this.props.classNames}
      />
    );
  }

  loader(options) {
    return this.generateSizesAndSrcSets(options.width);
  }

  generateSizesAndSrcSets(srcSet) {
    let width = this.props.width ?? srcSet;
    let imageSrc = this.props.src;
    if (srcSet <= 767 && this.props.mobile_src !== undefined && this.props.mobile_src != '') {
      imageSrc = this.props.mobile_src;
    }
    if (srcSet <= 767 && this.props.mobile_width !== undefined && this.props.mobile_width != '') {
      width = this.props.mobile_width;
    }
    width = (width + '').replace('px', '');
    if (width > srcSet) {
      return this.resizedUrl(imageSrc, srcSet);
    } else {
      return this.resizedUrl(imageSrc, width);
    }
  }

  resizedUrl(src, width) {
    try {
      return src.replace(
        process.env.NEXT_PUBLIC_AWS_S3_DOMAIN,
        process.env.NEXT_PUBLIC_AWS_IMAGE_DOMAIN + '/' + width + 'x0',
      );
    } catch (e) {
      return src;
    }
  }
}

export default JetbroImage;
