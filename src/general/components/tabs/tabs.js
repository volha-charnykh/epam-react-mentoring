import React, {useState} from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

export const tabItemType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    active: PropTypes.bool
});

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(tabItemType).isRequired,
    right: PropTypes.node,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onTabClicked: PropTypes.func.isRequired
}

export default function Tabs(props) {
    if (props.tabs.every(el => !el.active)) {
        props.tabs[0].active = true;
    }

    const [tabs, setTabs] = useState(props.tabs);

    const onTabClick = (el) => {
        console.log('Tab', el.title);
        const cur = tabs.find(e => e.active);
        cur.active = false;
        el.active = true;
        setTabs([...tabs]);
        props.onTabClicked(el);
    }
    return (
        <>
            <div className='Tabs-Header'>
                <div className='Tabs'>
                    {
                        props.tabs.map(el =>
                            <div
                                key={el.id}
                                className={`Tab ${el.active ? 'Active' : ''}`}
                                onClick={() => onTabClick(el)}>
                                {el.title}
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
