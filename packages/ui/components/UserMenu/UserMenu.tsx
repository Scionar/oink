import styles from './UserMenu.module.css';
import { IconChevron } from '../../icons/IconChevron';

type UserMenuProps = {
  avatarUrl?: string | null;
  name?: string | null;
  loginOnClick: () => Promise<void>;
  logoutOnClick: () => void;
};

export const UserMenu = ({
  avatarUrl,
  name,
  loginOnClick,
  logoutOnClick,
}: UserMenuProps) => {
  const loggedIn = !!name;

  return (
    <details className={styles.usermenu}>
      <summary className={styles.profileWrapper}>
        <div className={styles.name}>{loggedIn ? name : 'Anonymous'}</div>
        <div className={styles.avatarCircle}>
          {!!avatarUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.avatarImage}
                src={avatarUrl}
                alt="User avatar"
              />
            </>
          )}
        </div>
        <IconChevron size={12} className={styles.chevron} />
      </summary>
      <div className={styles.dropdown}>
        <ul>
          {!!loginOnClick && !loggedIn && (
            <li>
              <button className={styles.menuButton} onClick={loginOnClick}>
                Login
              </button>
            </li>
          )}
          {!!logoutOnClick && loggedIn && (
            <li>
              <button className={styles.menuButton} onClick={logoutOnClick}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </details>
  );
};
