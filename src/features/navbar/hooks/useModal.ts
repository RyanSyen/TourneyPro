import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const isOpenModalAtom = atom(false);

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);

  const open = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const close = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return useMemo(
    () => ({
      isOpenModal,
      open,
      close,
    }),
    [isOpenModal, open, close]
  );
};

export default useModal;
