import styles from "./UserMenu.module.css";
import { IconChevron } from "../../icons/IconChevron";

type UserMenuProps = {
  avatarUrl?: string | null;
  name?: string | null;
  loginUrl: string;
  logoutUrl: string;
};

export const UserMenu = ({ avatarUrl, name }: UserMenuProps) => {
  console.log(name, "name");

  const loggedIn = !!name;

  return (
    <details className={styles.usermenu}>
      <summary className={styles.profileWrapper}>
        <div className={styles.name}>{loggedIn ? name : "Anonymous"}</div>
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
          {!loggedIn && (
            <li>
              <a href="/api/auth/login">Login</a>
            </li>
          )}
          {loggedIn && (
            <li>
              <a href="/api/auth/logout">Logout</a>
            </li>
          )}
        </ul>
      </div>
    </details>
  );
};
