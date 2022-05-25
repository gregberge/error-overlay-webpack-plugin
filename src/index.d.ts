export = ErrorOverlayPlugin;

type Compiler = import("webpack").Compiler;

declare class ErrorOverlayPlugin {
  apply(compiler: Compiler): void;
}

declare const pluginName = 'error-overlay-webpack-plugin';

declare namespace ErrorOverlayPlugin {
  export { pluginName };
}
