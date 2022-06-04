import { Header } from "./components/Header";

import styles from './App.module.css';
import { Sidebar } from "./components/Sidebar";

export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <div>
            <p><strong>Diego Fernandes</strong></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore maxime ratione pariatur saepe deserunt praesentium.</p>
          </div>
          <div>
            <p><strong>Diego Fernandes</strong></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore maxime ratione pariatur saepe deserunt praesentium.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
