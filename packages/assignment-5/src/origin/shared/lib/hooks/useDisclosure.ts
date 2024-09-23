import { useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = () => {
    setIsOpen(() => true);
  };

  const onCloseHandler = () => {
    setIsOpen(() => false);
  };

  return { isOpen, onCloseHandler, onOpenHandler };
};
