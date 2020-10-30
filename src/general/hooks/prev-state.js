import { useRef, useState } from 'react';

export default (initValue) => {
  const [state, setState] = useState(initValue);

  const ref = useRef(null);

  const setStateAndPrev = (newState) => {
    ref.current = state;
    setState(newState);
  };
  const prevState = ref.current;

  return [state, setStateAndPrev, prevState];
};
