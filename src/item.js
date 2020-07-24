import React from 'react';

class Item extends React.PureComponent {
    render() {
        return <li>
            {this.props.title}
        </li>
    }
}

export default Item;
