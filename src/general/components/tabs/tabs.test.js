import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Tabs from './tabs';

describe('Tabs', () => {
  const tabs = ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6', 'Tab7', 'Tab8', 'Tab9', 'Tab10', 'Tab11', 'Tab12'];

  it('should correctly set init state', () => {
    const { container } = render(
      <Tabs
        tabs={tabs}
        activeTab={tabs[2]}
        right={(
          <div className="TestRight" />
              )}
        onTabClicked={() => {
        }}
      >
        <div className="TestClass" />
      </Tabs>,
    );

    expect(container.querySelector('.TestRight')).toBeInTheDocument();
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
    if (tabs.length > 10) {
      expect(container.querySelector('#rightArr')).toBeInTheDocument();
    }
    tabs.forEach((el, i) => {
      if (i < 10) {
        expect(screen.getByText(el)).toBeInTheDocument();
      }
    });
  });

  it('should correctly scroll tabs', () => {
    const { container } = render(
      <Tabs
        tabs={tabs}
        activeTab={tabs[2]}
        right={(
          <div className="TestRight" />
              )}
        onTabClicked={() => {
        }}
      >
        <div className="TestClass" />
      </Tabs>,
    );

    expect(container.querySelector('.TestRight')).toBeInTheDocument();
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
    const right = container.querySelector('#rightArr');

    userEvent.click(right);
    userEvent.click(right);

    tabs.forEach((el, i) => {
      if (i > 1 && i < 12) {
        expect(screen.getByText(el)).toBeInTheDocument();
      }
    });

    const left = container.querySelector('#leftArr');

    expect(left).toBeInTheDocument();
    userEvent.click(left);

    tabs.forEach((el, i) => {
      if (i > 0 && i < 11) {
        expect(screen.getByText(el)).toBeInTheDocument();
      }
    });
  });

  it('should correctly select tab', (done) => {
    render(
      <Tabs
        tabs={tabs}
        activeTab={tabs[2]}
        right={(
          <div className="TestRight" />
              )}
        onTabClicked={(tab) => {
          expect(tab).toBe(tabs[5]);
          done();
        }}
      >
        <div className="TestClass" />
      </Tabs>,
    );

    const tab = screen.getByText(tabs[5]);
    userEvent.click(tab);
  });
});
