import React from 'react';
import Item from "./item";

class List extends React.Component {
    render() {
        return (
            <div>
                <h2>
                    {this.props.title}
                </h2>
                <ul>
                    {this.props.items.map(el =>
                        <Item title={el} key={el}/>
                    )}

                </ul>
            </div>)
    }
}

export default List;
