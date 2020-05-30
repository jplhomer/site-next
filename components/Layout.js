import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="border-t-8 border-blue-800 dark:border-blue-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
