import type { Lightning, PlatformSettings, AppData } from "@lightningjs/sdk";
import { Launch } from "@lightningjs/sdk";
import { App } from "./App";

export default function (
  appSettings: Lightning.Application.Options,
  platformSettings: PlatformSettings,
  appData: AppData
) {
  return Launch(
    App,
    {
      ...appSettings,
      stage: {
        ...appSettings.stage,
        w: window.innerWidth,
        h: window.innerHeight,
      },
    },
    platformSettings,
    appData
  );
}
