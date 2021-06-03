import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollRestore() {
  const { pathname } = useLocation()
  useEffect(() => { requestAnimationFrame(() => { requestAnimationFrame(() => { document.body.scrollTo({ behavior: "smooth", top: 0 }) }) }) }, [pathname])
  return null
}