import { useCallback, useState } from 'react';

export default (initValue = []) => {
  const [selected, setSelected] = useState(initValue);

  const select = useCallback((item) => {
    const index = selected.indexOf(item);
    if (index > -1) {
      setSelected([...selected.slice(0, index), ...selected.slice(index + 1, selected.length)]);
    } else {
      setSelected([...selected, item]);
    }
  }, [selected]);

  return [selected, select];
};
