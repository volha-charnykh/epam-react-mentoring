import React, { useCallback, useMemo, useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string,
  right: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onTabClicked: PropTypes.func.isRequired,
};

export default function Tabs(props) {
  const tabsNode = React.createRef();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const total = props.tabs.length;

  const createOnClickItem = useCallback((el) => props.onTabClicked(el), [props.onTabClicked]);
  const onGoLeft = useCallback((offset) => setOffset(offset - 1), []);
  const onGoRight = useCallback((offset) => setOffset(offset + 1), []);

  const visibleTabs = useMemo(() => props.tabs.slice(offset, offset + limit), [props.tabs, offset]);
  const isLastPart = useMemo(() => offset + limit === total, [props.tabs, offset]);

  // if(tabsNode.current.scrollWidth > tabs)

  return (
    <>
      <div className="Tabs-Header">
        <div
          className="Tabs"
          ref={tabsNode}
        >
          <>
            {offset > 0 && (
            <span
              id="leftArr"
              className="arrow"
              onClick={onGoLeft.bind(this, offset)}
            />
            )}

            {
                                visibleTabs.map((el) => (
                                  <div
                                    key={el}
                                    className={`Tab ${el === props.activeTab ? 'Active' : ''}`}
                                    onClick={createOnClickItem.bind(this, el)}
                                  >
                                    {el}
                                  </div>
                                ))
}
            {!isLastPart && (
            <span
              id="rightArr"
              className="arrow"
              onClick={onGoRight.bind(this, offset)}
            />
            )}
          </>
        </div>
        {
                    props.right
                    && (
                    <div className="RightSide">
                      {props.right}
                    </div>
                    )
                }
      </div>
      <div className="TabsContent">
        {props.children}
      </div>
    </>
  );
}
