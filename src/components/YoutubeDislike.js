import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';

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
      isFetchingApi: false,
      videoData: [],
      videoApiData: []
    };
  }

  fetchVideoData () {
    this.setState({...this.state, isFetching: true, isFetchingApi: true});

    fetch('https://returnyoutubedislikeapi.com/votes?videoId=' + this.props.routerParams.videoId)
      .then(response => response.json())
      .then(data => this.setState({videoData: data, isFetching: false}))
      .catch(e => {
        this.setState({...this.state, isFetching: false});
      });

    fetch('https://www.googleapis.com/youtube/v3/videos?id=' + this.props.routerParams.videoId + '&key=AIzaSyBYu0C9QOLi1svC9TdxSROOvdqzRfZZQNM&part=snippet,contentDetails,statistics,status')
      .then(response => response.json())
      .then(data => this.setState({videoApiData: data, isFetchingApi: false}))
      .catch(e => {
        this.setState({...this.state, isFetchingApi: false});
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

    let videoTitle = '';
    let videoDate = '';
    let videoComments = 0;
    let videoChannel = '';
    let videoChannelId = '';

    if (typeof this.state.videoApiData['items'] !== 'undefined') {
      videoTitle = this.state.videoApiData['items'][0]['snippet']['title'];
      videoDate = this.state.videoApiData['items'][0]['snippet']['publishedAt'];
      videoChannel = this.state.videoApiData['items'][0]['snippet']['channelTitle'];
      videoChannelId = this.state.videoApiData['items'][0]['snippet']['channelId'];

      if (this.state.videoApiData['items'][0]['statistics']['commentCount'] > 0) {
        videoComments = this.state.videoApiData['items'][0]['statistics']['commentCount'];
      }
    }

    return (
      <Container className={'d-flex align-items-center justify-content-center flex-column h-100'} style={{maxWidth: '1020px'}}>
        <div className={'ratio ratio-16x9 shadow-lg'}>
          <iframe src={'https://www.youtube.com/embed/' + videoId} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope" allowFullScreen />
        </div>

        <div className={'mt-3 d-flex align-self-start'}>
          <h3><b>{videoTitle}</b></h3>
        </div>

        <div className={'mt-1 d-flex align-self-start'}>
          <a className="text-decoration-none text-body" href={'https://www.youtube.com/channel/' + videoChannelId}>{videoChannel}</a>
        </div>

        <div className={'mt-1 d-flex align-self-start'}>
          <Moment format="YYYY-MM-DD HH:mm:ss">{videoDate}</Moment>
        </div>

        <div className={'w-100 mt-3'}>
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

        <div className={'mt-3 text-center w-100'}>
          <Row xs={1} md={4} lg={4} className={'d-flex justify-content-evenly'}>
            <Col className={'p-2'}><span className={'fs-5'}><i className="fa fa-thumbs-up text-success" aria-hidden="true" /> Likes</span><br /><span className={'fs-4'}><b>{likes}</b></span></Col>
            <Col className={'p-2'}><span className={'fs-5'}><i className="fa fa fa-thumbs-down text-danger" aria-hidden="true" /> Dislikes</span><br /><span className={'fs-4'}><b>{dislikes}</b></span></Col>
            <Col className={'p-2'}><span className={'fs-5'}><i className="fa fa-line-chart" aria-hidden="true" /> Views</span><br /><span className={'fs-4'}><b>{views}</b></span></Col>
            <Col className={'p-2'}><span className={'fs-5'}><i className="fa fa-comments" aria-hidden="true" /> Comments</span><br /><span className={'fs-4'}><b>{videoComments}</b></span></Col>
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