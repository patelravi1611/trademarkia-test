import React, {Component} from 'react';
import Grid from '../components/Grid';
import Image from '../components/Image';
import CardStyle from '../styles/components/Card.module.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <>
        <Grid row classNames={CardStyle.card}>
          <Image src={this.props.image} width={300} height={300} alt="image" />
          <Grid row mods="start" gap="sm" classNames={CardStyle.card__detail}>
            <h2>{this.props.name}</h2>
            <Grid gap="xs" mods="center" className={CardStyle.card__detail__status}>
              <span
                className={`${
                  this.props.status.toLowerCase() === 'alive' ? 'bg-green' : 'bg-red'
                } grid ${CardStyle.card__detail__status__indi}`}></span>
              <h3 className="n-200">{this.props.species}</h3>
            </Grid>
            <Grid row gap="xxs">
              <small className="n-200">Last known location:</small>
              <h5>{this.props.location.name}</h5>
            </Grid>
            <Grid row gap="xxs">
              <small className="n-200">First seen in:</small>
              <h5>{this.props.origin.name}</h5>
            </Grid>
            <a className={`grid grid---center white ${CardStyle.card__detail__btn}`}>View Detail</a>
          </Grid>
        </Grid>
      </>
    );
  }
}
