import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";                           
=======
import { BrowserRouter } from "react-router-dom";
import App from "./App";
>>>>>>> anand
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <ThirdwebProvider>
        <BrowserRouter>  
          <App />         
        </BrowserRouter>
      </ThirdwebProvider>
=======
      <BrowserRouter>
        <App />
      </BrowserRouter>
>>>>>>> anand
    </QueryClientProvider>
  </StrictMode>
);
