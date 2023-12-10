import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type TripLinkProps = {
    tripId: number,
    children: ReactNode
}

const TripLink: React.FC<TripLinkProps> = (props) => {

    return (        
        <Link to={`/trip/${props.tripId}`}>{props.children}</Link>        
    );
}

export default TripLink;