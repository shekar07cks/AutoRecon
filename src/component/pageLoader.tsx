import * as React from 'react';
import ContentLoader from 'react-content-loader';

interface IPageLoaderProps {
}

export class Loader extends React.Component<IPageLoaderProps> {
    constructor(props: IPageLoaderProps) {
        super(props);
    }

    render() {
        const PageLoader = props => (
            <ContentLoader
                height="160"
                width="400"
                speed={2}
                primaryColor="#f5f5f5"
                secondaryColor="#ererer"
                {...props}
            >
                <rect x="0" y="0" rx="3" ry="3" width="70" height="10" /> 
                <rect x="80" y="0" rx="3" ry="3" width="100" height="10" /> 
                <rect x="190" y="0" rx="3" ry="3" width="10" height="10" /> 
                <rect x="15" y="20" rx="3" ry="3" width="130" height="10" /> 
                <rect x="155" y="20" rx="3" ry="3" width="130" height="10" /> 
                <rect x="15" y="40" rx="3" ry="3" width="90" height="10" /> 
                <rect x="115" y="40" rx="3" ry="3" width="60" height="10" /> 
                <rect x="185" y="40" rx="3" ry="3" width="60" height="10" /> 
                <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
            </ContentLoader>
        );
        return (
            <PageLoader>
                {this.props.children}
            </PageLoader>
        );
    }
}