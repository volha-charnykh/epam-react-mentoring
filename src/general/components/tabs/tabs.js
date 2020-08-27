import React from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string,
    right: PropTypes.node,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onTabClicked: PropTypes.func.isRequired
}

export default function Tabs(props) {
    return (
        <>
            <div className='Tabs-Header'>
                <div className='Tabs'>
                    {
                        props.tabs.map(el =>
                            <div
                                key={el}
                                className={`Tab ${el === props.activeTab ? 'Active' : ''}`}
                                onClick={() => props.onTabClicked(el)}>
                                {el}
                            </div>
                        )
                    }
                </div>
                {
                    props.right &&
                    <div className='RightSide'>
                        {props.right}
                    </div>
                }
            </div>
            <div className='TabsContent'>
                {props.children}
            </div>
        </>
    );
}
