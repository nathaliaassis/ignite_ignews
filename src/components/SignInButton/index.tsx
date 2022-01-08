import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return isUserLoggedIn ? (
    <button
      className={styles.signInButton}
      type='button'>
      <FaGithub color='#04d361' />
      Nathália Assis
      <FiX
        className={styles.closeIcon}
        color='#737380'
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      type='button'>
      <FaGithub color='#eba417' />
      Sign in with Github
    </button>
  );
}