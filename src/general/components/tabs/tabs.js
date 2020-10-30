import React, { useCallback, useMemo, useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

export default function Tabs(props) {
  const tabsNode = React.createRef();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const {
    activeTab, right, children, tabs, onTabClicked,
  } = props;
  const total = tabs.length;

  const createOnClickItem = useCallback((el) => onTabClicked(el), [onTabClicked]);
  const onGoLeft = useCallback((off) => setOffset(off - 1), []);
  const onGoRight = useCallback((off) => setOffset(off + 1), []);

  const visibleTabs = useMemo(() => tabs.slice(offset, offset + limit), [tabs, offset]);
  const isLastPart = useMemo(() => offset + limit === total, [tabs, offset]);

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
                                    className={`Tab ${el === activeTab ? 'Active' : ''}`}
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
                    right
                    && (
                    <div className="RightSide">
                      {right}
                    </div>
                    )
                }
      </div>
      <div className="TabsContent">
        {children}
      </div>
    </>
  );
}

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

Tabs.defaultProps = {
  activeTab: '',
  right: null,
};
