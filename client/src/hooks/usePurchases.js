import { useState, useEffect } from 'react';
import useContract from './useContract';

const usePurchases = () => {
  const { getPurchases, account } = useContract();
  const [activeTab, setActiveTab] = useState('available');
  const [purchases, setPurchases] = useState([]);

  const availablePurchases = purchases.filter(p => !p.consumed);
  const consumedPurchases = purchases.filter(p => p.consumed);

  const fetchPurchases = async () => {
    try {
      const purchases = await getPurchases();
      setPurchases(purchases);
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
    
    return () => fetchPurchases();
  }, [account, purchases]);

  return {
    activeTab,
    setActiveTab,
    purchases,
    availablePurchases,
    consumedPurchases,
    fetchPurchases
  };
};

export default usePurchases;