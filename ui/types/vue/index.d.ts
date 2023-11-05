import 'vue';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $msal: number;
  }
}
