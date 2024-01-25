import {create} from 'zustand';

type LoadingProps = {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
};

const useLoading = create<LoadingProps>(set => ({
  loading: false,
  setLoading: (isLoading: boolean) => set(() => ({loading: isLoading})),
}));

export default useLoading;
