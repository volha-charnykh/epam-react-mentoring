import React, { useState, useContext } from 'react';

export const RequestContext = React.createContext({});

export const useServerEffect = (initial, key, effect) => {
  const context = useContext(RequestContext);
  const [data] = useState(context[key] || initial);
  if (context.requests) {
    context.requests.push(
      effect().then((res) => {
        context[key] = res;
      }),
    );
  }
  return [data];
};
