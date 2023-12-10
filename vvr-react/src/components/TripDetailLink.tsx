import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type TripDetailLinkProps = {
    tripId: number,
    children: ReactNode
}

const TripDetailLink: React.FC<TripDetailLinkProps> = (props) => {

    return (        
        <Link to={`/trip-detail/${props.tripId}`}>{props.children}</Link>        
    );
}

export default TripDetailLink;