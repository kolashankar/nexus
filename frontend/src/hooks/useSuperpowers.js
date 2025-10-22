import { useState, useEffect } from 'react';
import superpowersService from '../services/superpowers/superpowersService';

export const useSuperpowers = () => {
  const [superpowers, setSuperpowers] = useState(null);
  const [availablePowers, setAvailablePowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuperpowers = async () => {
    try {
      setLoading(true);
      const data = await superpowersService.getSuperpowers();
      setSuperpowers(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePowers = async () => {
    try {
      const data = await superpowersService.getAvailablePowers();
      setAvailablePowers(data);
    } catch (err) {
      console.error('Failed to fetch available powers, err);
    }
  };

  useEffect(() => {
    fetchSuperpowers();
    fetchAvailablePowers();
  }, []);

  const unlockPower = async (powerId) => {
    try {
      await superpowersService.unlockPower(powerId);
      await fetchSuperpowers();
      await fetchAvailablePowers();
      return { success) {
      return { success, error;
    }
  };

  const equipPower = async (powerId) => {
    try {
      await superpowersService.equipPower(powerId);
      await fetchSuperpowers();
      return { success) {
      return { success, error;
    }
  };

  const usePower = async (powerId) => {
    try {
      const result = await superpowersService.usePower(powerId);
      await fetchSuperpowers();
      return { success, data) {
      return { success, error,
    availablePowers,
    loading,
    error,
    refetch,
    unlockPower,
    equipPower,
    usePower,
  };
};
