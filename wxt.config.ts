import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-vue", "@wxt-dev/auto-icons"],
  manifest: {
    name: "Mitaka",
    permissions: ["contextMenus", "storage", "notifications"],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self';",
      sandbox:
        "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';",
    },
    browser_specific_settings: {
      gecko: {
        id: "{9efc0280-b125-400e-b53d-2d09d7effab4}",
      },
    },
  },
});
