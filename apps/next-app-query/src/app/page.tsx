import CustomerList from './customerList';
import HeaderMenu from './headerMenu';

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <HeaderMenu />
        </nav>
      </header>
      <main className="p-2">
        <p>This is the main content area</p>
        <CustomerList />
      </main>
    </>
  );
}
