import { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";

const Layout = () => {
  const loadFromStorage = useAppStore((store) => store.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className=" container mx-auto py-16">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
};

export default Layout;
