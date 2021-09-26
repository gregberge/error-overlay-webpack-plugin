import { DynamicEntryPlugin } from 'webpack'

export default class WatchExternalFilesPlugin extends DynamicEntryPlugin {
  constructor(options: { files?: string[]; verbose?: boolean })
}
