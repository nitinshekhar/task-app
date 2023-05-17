import styles from '@/styles/Header.module.css';
import { useAuth0 } from "@auth0/auth0-react";
const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading....</div>
  }
  const headerStyle = {
    padding: '20px 0',
    lineHeight: '1.5em',
    color: '#aeadad',
    textAlign: 'center',
  };
  return (
    <header style={headerStyle} className={styles.header}>
      {isAuthenticated && (
        <h1>{user.name} Task List</h1>
      )}
      {!isAuthenticated && (
        <h1>Task List</h1>
      )}
      
      <p>Items will persist in the browser local storage</p>
    </header>
  );
};
export default Header;
