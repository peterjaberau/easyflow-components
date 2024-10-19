/** @jsxImportSource @emotion/react */
import { ComponentState, PropsWithoutRef, useEffect, useRef } from 'react';
import React from 'react';

export default function usePrevious<T>(value: PropsWithoutRef<T> | ComponentState) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
