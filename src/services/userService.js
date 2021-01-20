import {useMutation} from 'react-query';
import {axiosConfig} from '../config/axios';
import {useState, useCallback, useEffect} from 'react';
import {retrieveAuthenticationToken} from './securityService';

export const useUserConnected = () => {
  const [userIsConnected, setUserIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserInformations = useCallback(async () => {
    setIsLoading(true);
    const userToken = await retrieveAuthenticationToken();

    setUserIsConnected(!!userToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserInformations();
  }, [loadUserInformations]);

  return {
    isLoading,
    userIsConnected,
    reloadUserInformations: loadUserInformations,
  };
};

export const useLogin = (config) =>
  useMutation(
    async ({email, password}) =>
      axiosConfig.post('/authenticate', {
        username: email,
        password,
      }),
    config,
  );

export const useRegister = (config) =>
  useMutation(
    async ({email, password}) =>
      axiosConfig.post('/extended/register', {
        login: email,
        email,
        password,
      }),
    config,
  );
