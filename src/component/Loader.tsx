import * as React from 'react';
import Lottie from 'react-lottie';

var animationData = require('./loading/loading_hamster.json');

interface ILoaderProps {
    isLoading: boolean;
}

interface ILoaderState {
    isStopped: boolean;
    isPaused: boolean;
}

class Loader extends React.Component < ILoaderProps, ILoaderState > {
    constructor(props: ILoaderProps) {
        super(props);
        this.state = {
            isStopped: false,
            isPaused: false
        };
    }

//     render() {
//       return (this.props.isLoading) ? (
//           <ContentLoader
//               height={160}
//               width={400}
//               speed={2}
//               primaryColor="#f3f3f3"
//               secondaryColor="#ecebeb"
//           >
//               <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4"/>
//               <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4"/>
//               <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4"/>
//               <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4"/>
//               <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4"/>
//               <circle cx="30" cy="30" r="30"/>
//           </ContentLoader>) : this.props.children;
//   }

defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

    render() {
        return (this.props.isLoading) ? (
            <div className="loader">
                <Lottie 
                    options={this.defaultOptions}
                    height={150}
                    width={150}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                />
            </div>) : this.props.children;
    }   
}

export default Loader;