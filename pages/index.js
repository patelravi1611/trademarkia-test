import React, {Component} from 'react';
import AppHead from '../components/AppHead';
import Card from '../components/card';
import Grid from '../components/Grid';
import HomeStyle from '../styles/home.module.scss';
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://rickandmortyapi.com/api/character`);
  const data = await res.json();

  // Pass data to the page via props
  return {props: {data}};
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      showNoResult: false,
      page: 1,
      showClear: false,
    };
    this.searchRef = React.createRef();
    this.loadRef = React.createRef();
  }
  async loadCards() {
    let nextPage = this.state.page + 1;
    if (this.state.data.info.next !== null) {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
      const searchData = await res.json();
      let dataArray = this.state.data.results;
      searchData.results.map(card => dataArray.push(card));
      this.setState({'data.results': dataArray, page: nextPage});
    }
  }
  autoLoadMoreNow(entries) {
    entries.map(entry => {
      if (entry.isIntersecting) {
        this.loadCards();
      }
    });
  }
  buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;

    for (let i = 1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }
  componentDidMount() {
    this.autoLoadMore = new IntersectionObserver(this.autoLoadMoreNow.bind(this), {
      root: null,
      rootMargin: '1000px',
    });
    this.autoLoadMore.observe(this.loadRef.current);
  }
  async clear() {
    this.searchRef.current.value = '';
    const res = await fetch(`https://rickandmortyapi.com/api/character`);
    const data = await res.json();
    this.setState({data: data, showNoResult: false});
  }
  async search() {
    let searchQuery = this.searchRef.current.value;
    let searchUrl = '';
    try {
      if (searchQuery != '') {
        searchUrl = `https://rickandmortyapi.com/api/character/?name=${searchQuery}`;
        this.setState({showClear: true});
      } else {
        searchUrl = `https://rickandmortyapi.com/api/character`;
        this.setState({showClear: false});
      }
      let result = await fetch(searchUrl);
      let data = await result.json();
      if (data.error !== undefined) {
        this.setState({showNoResult: true});
      } else {
        this.setState({data: data});
        this.setState({showNoResult: false});
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <>
        <AppHead />
        <Grid gap="lg" mods="item-start" row classNames={HomeStyle.home}>
          <Grid classNames={HomeStyle.home__search}>
            <input
              type="text"
              placeholder="search"
              className={HomeStyle.home__search__input}
              onKeyUp={this.search.bind(this)}
              ref={this.searchRef}
            />
            {this.state.showClear == true ? (
              <a className={HomeStyle.home__search__clear} onClick={this.clear.bind(this)}></a>
            ) : (
              ''
            )}
          </Grid>
          <Grid mods="flow-initial" gap="lg" classNames={`${HomeStyle.home__cardContainer}`}>
            {this.state.showNoResult === false ? (
              this.state.data.results.map((cardDetail, i) => <Card {...cardDetail} key={i} />)
            ) : (
              <h2 className="white">No result found</h2>
            )}
          </Grid>
          <p ref={this.loadRef} className={HomeStyle.home__load}>
            Load more
          </p>
        </Grid>
      </>
    );
  }
}
