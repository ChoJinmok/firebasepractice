import { useState, useCallback } from 'react';

export default function useNweetForm() {
  const [state, setState] = useState({
    nweet: '',
  });

  const handleChange = useCallback((value) => {
    setState((prevState) => ({
      ...prevState,
      nweet: value,
    }));
  });

  const handleSubmit = useCallback(() => {

  });

  return {
    state,
    handleChange,
    handleSubmit,
  };
}
