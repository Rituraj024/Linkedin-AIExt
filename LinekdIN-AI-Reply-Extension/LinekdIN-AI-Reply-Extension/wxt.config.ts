import { defineConfig } from 'wxt';
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest:{
    web_accessible_resources:[
      {
        resources: ["icon/*.svg"],
        matches: ["<all_urls>"]
      }
    ]
  }
});
