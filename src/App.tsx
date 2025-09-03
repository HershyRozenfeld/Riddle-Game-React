import { useState } from 'react'
import './App.css'
import HomePage from './views/HomePage'
import type { PlayerProfile } from './types';

export default function App() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <HomePage />
  )
}
