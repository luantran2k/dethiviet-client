import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pluginRewriteAll()],
});
function pluginRewriteAll(): import("vite").PluginOption {
    throw new Error("Function not implemented.");
}
