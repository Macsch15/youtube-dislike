import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

function routerParamsHook(Component) {
  return function WrappedComponent(props) {
    const routerParams = useParams();
    const navigate = useNavigate();
    return <Component {...props} routerParams={routerParams} navigate={navigate} />;
  }
}

class YoutubeDislike extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFetching: false,
      videoData: []
    };
  }

  fetchVideoData () {
    this.setState({...this.state, isFetching: true});

    fetch('https://returnyoutubedislikeapi.com/votes?videoId=' + this.props.routerParams.videoId)
      .then(response => response.json())
      .then(data => this.setState({videoData: data, isFetching: false}))
      .catch(e => {
        console.log(e);
        this.setState({...this.state, isFetching: false});
      });
  }

  componentDidMount() {
    this.fetchVideoData();
  }

  render () {
    const videoId = this.props.routerParams.videoId;
    const videoData = this.state.videoData;
    const likes = videoData.likes;
    const dislikes = videoData.dislikes;
    const views = videoData.viewCount;
    const likesPercent = (likes / (likes + dislikes) * 100);
    const dislikePercent = 100 - likesPercent;
    const emptyRating = likes + dislikes === 0;

    return (
      <Container className={'d-flex align-items-center justify-content-center flex-column h-100'} style={{maxWidth: '1020px'}}>
        <div className={'ratio ratio-16x9'}>
          <iframe src={'https://www.youtube.com/embed/' + videoId} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope" allowFullScreen />
        </div>

        <div className={'w-100 mt-5'}>
          <div className="progress">
            {emptyRating
              ? <div className="progress-bar" role="progressbar" />
              : (
                <>
                  <div className="progress-bar bg-success" role="progressbar" style={{width: likesPercent + '%'}} />
                  <div className="progress-bar bg-danger" role="progressbar" style={{width: dislikePercent + '%'}} />
                </>
              )}
          </div>
        </div>

        <div className={'mt-5 text-center w-100'}>
          <Row xs={1} md={3} lg={3} className={'d-flex justify-content-evenly'}>
            <Col className={'p-3'}><span className={'fs-5'}><i className="fa fa-thumbs-up" aria-hidden="true" /> Likes</span><br /><span className={'fs-4'}><b>{likes}</b></span></Col>
            <Col className={'p-3'}><span className={'fs-5'}><i className="fa fa fa-thumbs-down" aria-hidden="true" /> Dislikes</span><br /><span className={'fs-4'}><b>{dislikes}</b></span></Col>
            <Col className={'p-3'}><span className={'fs-5'}><i className="fa fa-line-chart" aria-hidden="true" /> Views</span><br /><span className={'fs-4'}><b>{views}</b></span></Col>
          </Row>
        </div>

        <div className={'mt-4'}>
          <Button variant="primary" onClick={() => {this.props.navigate('/')}}>Return to homepage</Button>
        </div>
      </Container>
    );
  }
}

export default routerParamsHook(YoutubeDislike);