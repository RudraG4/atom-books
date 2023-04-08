import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "routes";
import MainLayout from "components/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
