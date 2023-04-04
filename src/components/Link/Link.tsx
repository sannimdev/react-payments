import React, { useCallback } from 'react';

type TLinkProps = {
  to: string;
  children: React.ReactNode;
};

function Link({ to, children }: TLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      //TODO:
    },
    [to]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default React.memo(Link);
