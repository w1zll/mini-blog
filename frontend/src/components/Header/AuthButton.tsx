'use client';

import React, { useState } from 'react';
import Button from '../UI/Button';
import AuthModal from '../AuthModal/AuthModal';

const AuthButton = () => {
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
   return (
      <>
         <Button onClick={() => setIsAuthModalOpen(true)}>Войти</Button>
         {isAuthModalOpen && (
            <AuthModal onClose={() => setIsAuthModalOpen(false)} />
         )}
      </>
   );
};

export default AuthButton;
