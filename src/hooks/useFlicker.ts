import { useEffect, useRef, useState } from 'react';

type Props = {
  positiveColourClassName?: string;
  negativeColourClassName?: string;
  duration?: number;
  price: string | number;
};

const useFlicker = ({ duration = 300, positiveColourClassName = 'bg-emerald-400/50', negativeColourClassName = 'bg-red-400/50', price }: Props) => {
  const priceRef = useRef(price);
  const [bgColourClassName, setBgColourClassName] = useState('');

  useEffect(() => {
    setBgColourClassName(Number(priceRef.current) > Number(price) ? negativeColourClassName : positiveColourClassName);
    const id = setTimeout(() => setBgColourClassName(''), duration);
    priceRef.current = price;
    return () => clearTimeout(id);
  }, [negativeColourClassName, positiveColourClassName, price, duration]);

  return bgColourClassName;
};

export default useFlicker;
